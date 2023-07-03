'use client'

import Image from 'next/image'

import useCountries from '@/app/hooks/useCountries'
import { User } from '@prisma/client'
import Heading from '../core/Heading'
import HeartButton from '../core/HeartButton'

interface ListingHeadProps {
  id: string
  title: string
  locationValue: string
  imageSrc: string
  currentUser: User | null | undefined
}

const ListingHead: React.FC<ListingHeadProps> = ({ currentUser, id, imageSrc, locationValue, title }) => {
  const { getByValue } = useCountries()

  const location = getByValue(locationValue)

  return (
    <>
      <Heading title={title} subtitle={`${location?.region}, ${location?.label}`} />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image alt="Image" src={imageSrc} fill className="object-cover w-full" />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  )
}

export default ListingHead
