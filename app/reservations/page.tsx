import ClientOnly from '../components/core/ClientOnly'
import EmptyState from '../components/core/EmptyState'
import getCurrentUser from '../actions/getCurrentUser'
import getReservations from '../actions/getReservations'
import ReservationsClient from './ReservationsClient'

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    )
  }

  const reservations = await getReservations({ authorId: currentUser.id })

  if (!reservations.length) {
    return (
      <ClientOnly>
        <EmptyState title="No reservations found" subtitle="Looks like you have no reservations on your property" />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <ReservationsClient currentUser={currentUser} reservations={reservations} />
    </ClientOnly>
  )
}

export default ReservationsPage
