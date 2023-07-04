import prisma from '@/app/libs/prismadb'

interface IParams {
  listingId?: string
  userId?: string
  authorId?: string
}

export default async function getReservations(params: IParams) {
  const { authorId, listingId, userId } = params
  const query: any = {}

  if (listingId) query.listingId = listingId
  if (authorId) query.authorId = authorId
  if (userId) query.userId = userId

  const reservations = await prisma.reservation.findMany({
    where: query,
    include: { listing: true },
    orderBy: { createdAt: 'desc' },
  })

  return reservations
}
