import { getBookedDates, type BookedDateEntry } from './google-calendar'
import { getBookingComBookedDates } from './booking-com-ical'

/** All booked dates per room: direct bookings (Google Calendar) plus Booking.com reservations (iCal). */
export async function getAllBookedDates(startDate: string, endDate: string): Promise<BookedDateEntry[]> {
  const [direct, bookingCom] = await Promise.all([
    getBookedDates(startDate, endDate),
    getBookingComBookedDates(startDate, endDate),
  ])
  return [...direct, ...bookingCom]
}
