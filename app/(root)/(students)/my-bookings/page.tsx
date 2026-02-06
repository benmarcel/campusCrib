import { displayAllStudentbookings } from "@/lib/data";
import { BookingsList } from "@/app/ui/student/booking-listings";
import Link from "next/link"
import { Suspense } from "react";
import {BookingsListSkeleton} from "@/app/ui/skeletons/booking-skeleton"

export default async function MyBookingsPage () {
  const bookings = await displayAllStudentbookings();
  // const showModal = params.confirmCancel === "true";
  // Get the SPECIFIC ID from the URL
  
  return (
    <div className="max-w-7xl mx-auto p-4">
  <h2 className="text-2xl font-bold mb-6 text-primary">My Bookings</h2>
  
  <div className="space-y-4">
    {bookings && bookings.length > 0 ? (
      <Suspense fallback={<BookingsListSkeleton />}>
        <BookingsList bookings={bookings} />
      </Suspense>
    ) : (
      <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
        <p className="text-gray-500 text-xl">You have no bookings yet.</p>
        <Link href="/apartments" className="text-blue-600 font-semibold mt-2 inline-block">
          Browse Apartments
        </Link>
      </div>
    )}
  </div>
</div>
  )
}
