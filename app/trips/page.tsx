// This is a server componenst, So no need to 'use client'

import EmptyState from '../components/core/EmptyState'
import ClientOnly from '../components/core/ClientOnly'
import getCurrentUser from '../actions/getCurrentUser'
import getReservations from '../actions/getReservations'
import TripsClient from './TripsClient'

const TripsPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    )
  }

  const reservations = await getReservations({ userId: currentUser.id })

  if (!reservations.length) {
    return (
      <ClientOnly>
        <EmptyState title="No trips found" subtitle="Looks like you havent reserved any trips" />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <TripsClient reservations={reservations} currentUser={currentUser} />
    </ClientOnly>
  )
}

export default TripsPage
