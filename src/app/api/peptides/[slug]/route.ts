import { prisma } from '@/lib/db'
import { auth } from '@/lib/auth'
import { peptideUpdateSchema } from '@/lib/validators/peptide'

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const peptide = await prisma.peptide.findUnique({
      where: { slug },
      include: {
        categories: {
          include: { category: true },
        },
        suppliers: {
          include: {
            supplier: {
              select: {
                id: true,
                name: true,
                slug: true,
                coaAvailable: true,
                thirdPartyTested: true,
              },
            },
          },
        },
      },
    })

    if (!peptide || !peptide.published) {
      return Response.json({ error: 'Peptide not found' }, { status: 404 })
    }

    return Response.json(peptide)
  } catch (error) {
    console.error('Peptide fetch error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== 'ADMIN') {
      return Response.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const { slug } = await params
    const body = await req.json()
    const parsed = peptideUpdateSchema.safeParse(body)
    if (!parsed.success) {
      return Response.json({ error: parsed.error.issues }, { status: 400 })
    }

    const { categoryIds, ...data } = parsed.data

    const peptide = await prisma.peptide.update({
      where: { slug },
      data: {
        ...data,
        ...(categoryIds && {
          categories: {
            deleteMany: {},
            create: categoryIds.map((categoryId) => ({ categoryId })),
          },
        }),
      },
      include: {
        categories: { include: { category: true } },
      },
    })

    return Response.json(peptide)
  } catch (error) {
    console.error('Peptide update error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== 'ADMIN') {
      return Response.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const { slug } = await params

    await prisma.peptide.delete({ where: { slug } })

    return Response.json({ success: true })
  } catch (error) {
    console.error('Peptide delete error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
