// components/CancelModal.tsx
import { cancelBooking } from "@/lib/actions";
import Link from "next/link";

export function CancelModal({ bookingId }: { bookingId: string }) {
  // We use .bind to pass the ID to the Server Action
  const deleteAction = cancelBooking.bind(null, bookingId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
        <p className="text-gray-600 mb-6">This action cannot be undone.</p>
        
        <div className="flex justify-end gap-3">
          {/* Closing the modal is just going back or removing the param */}
          <Link href="/my-bookings" className="px-4 py-2 bg-gray-200 rounded">
            No, Keep it
          </Link>

          <form action={deleteAction}>
            <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded">
              Yes, Cancel Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}