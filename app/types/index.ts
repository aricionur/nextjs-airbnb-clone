import { Listing, Reservation } from '@prisma/client'

export type SafeReservation = Reservation & {
  listing: Listing
}

export type Nullable<T> = T | null
