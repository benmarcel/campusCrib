"use client"

import { confirmBooking } from "@/lib/actions";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";

export function ConfirmBookingButton({ bookingId }: { bookingId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleConfirm = () => {
    startTransition(async () => {
       await confirmBooking(bookingId);
    //   if (result?.error) {
    //     console.error(result.error);
    //   } else {
    //     console.log("Booking confirmed!");
    //   }
    });
  };

  return (
    <button
      disabled={isPending}
      onClick={handleConfirm}
      type="button"
      className="inline-flex items-center px-4 py-2 bg-[#003366] text-white rounded-md hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isPending ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Confirming...
        </>
      ) : (
        "Confirm Booking"
      )}
    </button>
  );
}

