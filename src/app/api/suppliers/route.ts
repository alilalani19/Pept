import { prisma } from '@/lib/db'
import { auth } from '@/lib/auth'
import { supplierCreateSchema } from '@/lib/validators/supplier'

export async function GET() {
  try {
    const suppliers = await prisma.supplier.findMany({
      where: { published: true },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        website: true,
        coaAvailable: true,
        thirdPartyTested: true,
      },
      orderBy: { name: 'asc' },
    })

    return Response.json({ suppliers })
  } catch (error) {
    console.error('Suppliers API error:', error)
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
    const parsed = supplierCreateSchema.safeParse(body)
    if (!parsed.success) {
      return Response.json({ error: parsed.error.issues }, { status: 400 })
    }

    const supplier = await prisma.supplier.create({ data: parsed.data })

    return Response.json(supplier, { status: 201 })
  } catch (error) {
    console.error('Supplier create error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
