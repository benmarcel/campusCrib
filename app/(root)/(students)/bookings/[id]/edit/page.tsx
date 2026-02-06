import { getBookingById } from "@/lib/data";
import EditBookingForm from "@/app/ui/student/edit-booking-form";
import { EditBookingFormSkeleton } from "@/app/ui/skeletons/edit-booking-form-skeleton";

import { Suspense } from "react";

export default async function Page({params}: { params: Promise<{ id: string }> }) {

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] p-4">
      {/* Container for Form */}
      <div className="w-full max-w-md flex flex-col items-center">
    <Suspense fallback={<EditBookingFormSkeleton />}>
      <EditBookingDataFetcher params={params} />
    </Suspense>
    </div>
    </main>
  );
}

async function EditBookingDataFetcher({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Fetch booking data by ID
  const booking = await getBookingById(id);

  return <EditBookingForm booking={booking} bookingId={id} />;
}