'use client'

import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'

import { User } from '@prisma/client'
import { Nullable, SafeReservation } from '../types'
import Heading from '../components/core/Heading'
import Container from '../components/core/Container'
import ListingCard from '../components/listings/ListingCard'

interface ReservationsClientProps {
  currentUser: Nullable<User>
  reservations?: SafeReservation[]
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({ currentUser, reservations }) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState('')

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id)

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success('Reservation canceled.')
          router.refresh()
        })
        .catch(error => toast.error(error?.response?.data?.error))
        .finally(() => setDeletingId(''))
    },
    [router],
  )

  return (
    <Container>
      <Heading title="Reservations" subtitle="Bookings on your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations?.map(r => (
          <ListingCard
            key={r.id}
            data={r.listing}
            reservation={r}
            actionId={r.id}
            onAction={onCancel}
            disabled={deletingId === r.id}
            actionLabel="Cancel guest reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default ReservationsClient
