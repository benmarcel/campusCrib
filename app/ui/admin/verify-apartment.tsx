"use client"
import { verifyApartments, rejectApartments } from "@/lib/actions";
import { useTransition, useState } from "react";
import { Loader2 } from "lucide-react";

export default function VerifyApartmentButton ({apartmentId}: {apartmentId: string}) {
    const [isPending, startTransition] = useTransition();
    const [option, setOption] = useState<"approve" | "reject" | null>(null);
      const handleVerify = () => {
        startTransition(async () => {
           await verifyApartments(apartmentId);
           setOption("approve");
        });
      };
      const handleReject = () => {
        startTransition(async () => {
           await rejectApartments(apartmentId);
           setOption("reject");
        });
      };
    
      return (
        <div className="flex space-x-2">
          <button
          disabled={isPending}
          onClick={handleVerify}
          type="button"
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending && option === "approve" ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Approving...
            </>
          ) : (
            "Approve"
          )}
        </button>
        <button
          disabled={isPending}
          onClick={handleReject}
          type="button"
          className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending && option === "reject" ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Rejecting...
            </>
          ) : (
            "Reject"
          )}
        </button>
        </div>
      );
}
