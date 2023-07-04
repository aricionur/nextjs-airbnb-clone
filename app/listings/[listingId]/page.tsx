import getCurrentUser from '@/app/actions/getCurrentUser'
import getListingById from '@/app/actions/getListingById'
import ClientOnly from '@/app/components/core/ClientOnly'
import EmptyState from '@/app/components/core/EmptyState'
import ListingClient from './ListingClient'
import getReservations from '@/app/actions/getReservations'

interface IParams {
  listingId: string
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params)
  const currentUser = await getCurrentUser()
  const reservations = await getReservations(params)

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState></EmptyState>
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
      <ListingClient listing={listing} currentUser={currentUser} reservations={reservations} />
    </ClientOnly>
  )
}

export default ListingPage
