"use client"
import { verifyApartments } from "@/lib/actions";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";

export default function VerifyApartmentButton ({apartmentId}: {apartmentId: string}) {
    const [isPending, startTransition] = useTransition();
    
      const handleVerify = () => {
        startTransition(async () => {
           await verifyApartments(apartmentId);
        });
      };
    
      return (
        <button
          disabled={isPending}
          onClick={handleVerify}
          type="button"
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify Apartment"
          )}
        </button>
      );
}
