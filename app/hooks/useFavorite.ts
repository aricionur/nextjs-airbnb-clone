import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useCallback, useMemo } from 'react'
import { toast } from 'react-hot-toast'

import { User } from '@prisma/client'
import useLoginModal from './useLoginModal'

interface IUseFavorite {
  listingId: string
  currentUser: User | null | undefined
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter()
  const loginModal = useLoginModal()

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || []

    return list.includes(listingId)
  }, [listingId, currentUser])

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()

      if (!currentUser) return loginModal.onOpen()

      try {
        let request = undefined

        if (hasFavorited) request = () => axios.delete(`/api/favorites/${listingId}`)
        else request = () => axios.post(`/api/favorites/${listingId}`)

        await request()
        router.refresh()
        toast.success('Success')
      } catch (error) {
        toast.error('Sometihng went wrong')
      }
    },
    [currentUser, hasFavorited, listingId, loginModal, router],
  )

  return { hasFavorited, toggleFavorite }
}

export default useFavorite
