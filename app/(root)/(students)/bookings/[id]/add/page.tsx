import Bookingform from "@/app/ui/student/booking-form";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }> ;
}) {
    const {id} = await params;
  
  return( 
   <main className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] p-4">
      {/* Container for Form */}
      <div className="w-full max-w-md flex flex-col items-center">
  <Bookingform apartmentId={id} />
  </div>
   </main>)
}