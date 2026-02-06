import Bookingform from "@/app/ui/student/booking-form";
import { Suspense } from "react";
import { EditBookingFormSkeleton } from "@/app/ui/skeletons/edit-booking-form-skeleton";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }> ;
}) {
  
  return( 
   <main className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] p-4">
      {/* Container for Form */}
      <div className="w-full max-w-md flex flex-col items-center">
        <Suspense fallback={<EditBookingFormSkeleton />}>
          <Bookingform params={params} />
        </Suspense>
      </div>
   </main>)
}