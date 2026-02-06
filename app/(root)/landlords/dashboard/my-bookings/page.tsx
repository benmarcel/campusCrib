import MyBookings from "@/app/ui/landlord/my-bookings";
import { Suspense } from "react";
import { BookingsGridSkeleton } from "@/app/ui/skeletons/my-bookings-skeleton";
export default function MyBookingsPage() {
  return (
    <Suspense fallback={<BookingsGridSkeleton />}>
      <MyBookings />
    </Suspense>
  );
}