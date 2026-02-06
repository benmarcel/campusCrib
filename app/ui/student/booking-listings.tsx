'use client';

import { useSearchParams } from 'next/navigation';
import { BookingCard } from './bookingCard';
import type { BookingsDisplayType } from '@/lib/definitions';

export function BookingsList({ bookings }: { bookings: BookingsDisplayType[] }) {
  const searchParams = useSearchParams();
  const activeBookingId = searchParams.get('bookingId');
  const isConfirming = searchParams.get('confirmCancel') === 'true';

  console.log('Active Booking ID:', activeBookingId);
  console.log('Is Confirming:', isConfirming);

  return (
    <div className="space-y-4">
      {bookings.map((booking) => {
        const shouldShow = isConfirming && activeBookingId === booking.id;
        console.log(`Booking ${booking.id}: shouldShow = ${shouldShow}`);
        
        return (
          <BookingCard 
            key={booking.id} 
            booking={booking} 
            showModal={shouldShow}
          />
        );
      })}
    </div>
  );
}