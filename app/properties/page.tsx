// This is a server componenst, So no need to 'use client'

import EmptyState from '../components/core/EmptyState'
import ClientOnly from '../components/core/ClientOnly'
import getCurrentUser from '../actions/getCurrentUser'
import ListingsClient from './ListingsClient'
import getListings from '../actions/getListings'

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    )
  }

  const listings = await getListings({ userId: currentUser.id })

  if (!listings.length) {
    return (
      <ClientOnly>
        <EmptyState title="No properties found" subtitle="Looks like you have no properties" />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <ListingsClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  )
}

export default PropertiesPage
