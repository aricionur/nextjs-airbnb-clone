import EmptyState from '../components/core/EmptyState'
import ClientOnly from '../components/core/ClientOnly'
import getCurrentUser from '../actions/getCurrentUser'
import getFavoriteListings from '../actions/getFavoriteListings'
import FavoritesClient from './FavoritesClient'

const FavouritesPage = async () => {
  const currentUser = await getCurrentUser()
  const listings = await getFavoriteListings()
  if (!listings.length) {
    return (
      <ClientOnly>
        <EmptyState title="No favorites found" subtitle="Looks like you have no favorite listing" />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <FavoritesClient currentUser={currentUser} listings={listings} />
    </ClientOnly>
  )
}

export default FavouritesPage
