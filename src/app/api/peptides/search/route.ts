import { prisma } from '@/lib/db'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const q = searchParams.get('q')

    if (!q || q.length < 2) {
      return Response.json({ peptides: [] })
    }

    const peptides = await prisma.peptide.findMany({
      where: {
        published: true,
        OR: [
          { name: { contains: q, mode: 'insensitive' } },
          { aliases: { hasSome: [q] } },
          { summary: { contains: q, mode: 'insensitive' } },
        ],
      },
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
      take: 10,
      orderBy: { name: 'asc' },
    })

    return Response.json({ peptides })
  } catch (error) {
    console.error('Search API error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
