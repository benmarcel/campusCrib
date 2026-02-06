import { getBookingsByLandlordId } from "@/lib/data";

import BookingCard from "./booking-card";

export default async function MyBookings() {
  const bookings = await getBookingsByLandlordId();

  return (
    <section className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-primary font-semibold text-sm tracking-wide uppercase mb-1">
              <span>My Bookings</span>
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              View and Manage Bookings
            </h1>
            <p className="mt-2 text-slate-500">
              Review student bookings for your properties.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      </div>
    </section>
  );
}