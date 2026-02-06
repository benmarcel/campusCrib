import { EditBooking, CancelBooking, ReviewApartment } from "../components/links";
import type { BookingsDisplayType } from "lib/definitions";
import Image from "next/image";
import Link from "next/link";
import { CancelModal } from "./CancelModal";

export function BookingCard({ booking, showModal }: { booking: BookingsDisplayType, showModal: boolean  }) {
  // Safety check: if apartment was somehow deleted
    // console.log('Booking ID:', booking.id, 'Show Modal:', showModal);
  if (!booking.apartments) return null;

  const apartment = booking.apartments;
  const mainImage = apartment.apartment_images?.[0]?.image_url || "/placeholder-home.jpg";
  const isConfirmed = booking.status === 'confirmed';

  return (
    <div className="group bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Image Section */}
        <div className="relative w-full sm:w-32 h-32 flex-shrink-0">
          <Image
            src={mainImage}
            alt={apartment.title}
            priority={true}
            sizes="128px"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <Link href={`/apartments/${booking.apartment_id}`}>
              <h3 className="text-lg font-bold text-blue-950 hover:text-blue-700 transition-colors">
                {apartment.title}
              </h3>
            </Link>
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
            }`}>
              {booking.status}
            </span>
          </div>

          <p className="text-sm text-gray-500 flex items-center mt-1">
            <span className="mr-1">📍</span> {apartment.address}
          </p>

          <div className="mt-3 p-3 bg-gray-50 rounded-xl border border-gray-100 w-fit">
            <p className="text-sm text-gray-700">
              <span className="font-semibold text-blue-900">Visit: </span>
              {new Date(booking.visit_date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
              <span className="mx-2 text-gray-300">|</span>
              <span className="font-medium">{booking.visit_time.substring(0, 5)}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Footer / Actions */}
      <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
        <p className="text-sm">
          <span className="text-gray-500">Rent:</span> 
          <span className="font-bold text-lg text-primary ml-1">₦{apartment.price_per_year.toLocaleString()}</span>
          <span className="text-xs text-gray-400">/year</span>
        </p>
        
        <div className="flex gap-2">
          <EditBooking id={booking.id} />
          {/* You could add a 'Delete' or 'Cancel' button here too */}
          <CancelBooking id={booking.id} />
          {isConfirmed && <ReviewApartment id={booking.apartment_id} />}
        </div>
      </div>
      {/* Logic to show modal */}
      {showModal && <CancelModal bookingId={booking.id} />}
    </div>
  );
}