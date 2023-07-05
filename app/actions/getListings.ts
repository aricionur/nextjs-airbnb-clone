import prisma from '@/app/libs/prismadb'

export interface IListingsParams {
  userId?: string
  guestCount?: number
  roomCount?: number
  bathroomCount?: number
  startDate?: string
  endDate?: string
  locationValue?: string
  category?: string
}

export default async function getListings(params: IListingsParams) {
  try {
    const listings = prisma.listing.findMany({ orderBy: { createdAt: 'desc' } })

    return listings
  } catch (error: any) {
    throw new Error(error)
  }
}
