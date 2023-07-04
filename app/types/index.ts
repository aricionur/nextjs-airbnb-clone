import { Reservation } from '@prisma/client'

export type SafeReservation = Omit<Reservation, 'createdAt' | 'startDate' | 'endDate' | 'listing'> & {
  createdAt: string
  startDate: string
  endDate: string
  listing: string
}
