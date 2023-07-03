'use client'

import Container from '@/app/components/core/Container'
import ListingHead from '@/app/components/listings/ListingHead'
import ListingInfo from '@/app/components/listings/ListingInfo'
import ListingReservation from '@/app/components/listings/ListingReservation'
import { categories } from '@/app/components/navbar/Categories'
import useLoginModal from '@/app/hooks/useLoginModal'
import { Reservation, User, Listing } from '@prisma/client'
import axios from 'axios'
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns'
import { difference } from 'next/dist/build/utils'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Range } from 'react-date-range'
import { toast } from 'react-hot-toast'
import { isReturnStatement } from 'typescript'

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
}

interface ListingClientProps {
  currentUser?: User | null
  reservations?: Reservation[]
  listing: Listing & {
    user: User
  }
}

const ListingClient: React.FC<ListingClientProps> = ({ listing, currentUser, reservations = [] }) => {
  const loginModal = useLoginModal()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [totalPrice, setTotalPrice] = useState(listing.price)
  const [dateRange, setDateRange] = useState<Range>(initialDateRange)

  const disabledDates = useMemo(() => {
    let dates: Date[] = []

    reservations.forEach(reservation => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      })

      dates = [...dates, ...range]
    })

    return dates
  }, [reservations])

  const onCrateReservation = useCallback(() => {
    if (!currentUser) return loginModal.onOpen()

    setIsLoading(true)

    axios
      .post('/api/reservations', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listing: listing?.id,
      })
      .then(() => {
        toast.success('Listing reserved!')
        setDateRange(initialDateRange)
        router.refresh()
      })
      .catch(() => toast.error('Something went wrong.'))
      .finally(() => setIsLoading(false))
  }, [totalPrice, dateRange, listing?.id, router, currentUser, loginModal])

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate)

      console.log('dayCount:', dayCount)

      if (dayCount && listing.price) setTotalPrice(dayCount * listing.price)
      else setTotalPrice(listing.price)
    }
  }, [dateRange, listing.price])

  const category = useMemo(() => {
    return categories.find(item => item.label === listing.category)
  }, [listing.category])

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />

          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={currentUser}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={value => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCrateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ListingClient
