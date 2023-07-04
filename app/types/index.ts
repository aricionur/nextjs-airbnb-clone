import { Listing, Reservation } from '@prisma/client'

export type SafeReservation = Reservation & {
  listing: Listing
}
