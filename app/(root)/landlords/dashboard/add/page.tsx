import ListingForm from "@/app/ui/landlord/apartment-form";

export default function AddListingPage() {
  return (
     <main className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] p-4">
    <div className="max-w-2xl mx-auto">
      <ListingForm />
    </div>
    </main>
  );
}
