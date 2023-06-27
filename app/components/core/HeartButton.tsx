'use client'

import { User } from '@prisma/client'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

interface HeartButtonProps {
  listingId: string
  currentUser?: User
}

const HeartButton: React.FC<HeartButtonProps> = ({ currentUser, listingId }) => {
  const hasFavorited = true
  const toogleFavorite = () => {}

  return (
    <div onClick={toogleFavorite} className="relative hover:opacity-80 transition cursor-pointer">
      <AiOutlineHeart size={28} className="fill-white absolute -top-[2px] -right-[2px]" />
      <AiFillHeart size={24} className={`${hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'}`} />
    </div>
  )
}

export default HeartButton
