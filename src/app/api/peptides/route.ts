import { prisma } from '@/lib/db'
import { auth } from '@/lib/auth'
import { peptideCreateSchema } from '@/lib/validators/peptide'
import { notifyNewPeptide } from '@/lib/email/send-notifications'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const category = searchParams.get('category')
    const evidenceLevel = searchParams.get('evidenceLevel')
    const legalStatus = searchParams.get('legalStatus')

    const where: any = { published: true }

    if (category) {
      where.categories = { some: { category: { slug: category } } }
    }
    if (evidenceLevel) {
      where.evidenceLevel = evidenceLevel
    }
    if (legalStatus) {
      where.legalStatusBadge = legalStatus
    }

    const [peptides, total] = await Promise.all([
      prisma.peptide.findMany({
        where,
        select: {
          id: true,
          name: true,
          slug: true,
          summary: true,
          evidenceLevel: true,
          legalStatusBadge: true,
          categories: {
            select: {
              category: { select: { name: true, slug: true } },
            },
          },
        },
        orderBy: { name: 'asc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.peptide.count({ where }),
    ])

    return Response.json({
      peptides,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Peptides API error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== 'ADMIN') {
      return Response.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const body = await req.json()
    const parsed = peptideCreateSchema.safeParse(body)
    if (!parsed.success) {
      return Response.json({ error: parsed.error.issues }, { status: 400 })
    }

    const { categoryIds, ...data } = parsed.data

    const peptide = await prisma.peptide.create({
      data: {
        ...data,
        categories: {
          create: categoryIds.map((categoryId) => ({ categoryId })),
        },
      },
      include: {
        categories: { include: { category: true } },
      },
    })

    // Fire-and-forget notification to subscribed users
    if (peptide.name && data.slug) {
      notifyNewPeptide(peptide.name, data.slug).catch(() => {})
    }

    return Response.json(peptide, { status: 201 })
  } catch (error) {
    console.error('Peptide create error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
