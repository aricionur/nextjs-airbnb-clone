'use client'

import { User } from '@prisma/client'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

import useFavorite from '@/app/hooks/useFavorite'

interface HeartButtonProps {
  listingId: string
  currentUser: User | null
}

const HeartButton: React.FC<HeartButtonProps> = ({ currentUser, listingId }) => {
  const { hasFavorited, toggleFavorite } = useFavorite({ currentUser, listingId })

  return (
    <div onClick={toggleFavorite} className="relative hover:opacity-80 transition cursor-pointer">
      <AiOutlineHeart size={28} className="fill-white absolute -top-[2px] -right-[2px]" />
      <AiFillHeart size={24} className={`${hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'}`} />
    </div>
  )
}

export default HeartButton
