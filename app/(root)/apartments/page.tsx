// app/page.tsx
import SearchBar from "@/app/ui/components/search";
import ApartmentCard from "@/app/ui/components/ApartmentCard";
import { getAllApartments } from "@/lib/data";
import { Suspense } from "react"; 
import SearchBarSkeleton from "@/app/ui/skeletons/searchbar-skeleton";

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {  
  
  return (
    <main className="py-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <section className="mb-12">
         <h1 className="text-3xl border-accent border-t-4 border-b-4 w-fit p-2 mb-2">Find your own Place</h1>
         <p className="text-center text-lg ">Search for affordable student accommodations near your campus. </p>
         <Suspense fallback={<SearchBarSkeleton />}>
           <SearchBar />
         </Suspense>
      </section>

      <div className="max-w-7xl mx-auto px-4">
        {/*  use a key on Suspense so that when filters change, 
            the fallback (Loading...) shows up again.
        */}
        <Suspense fallback={<ApartmentGridSkeleton />} key="apartment-list">
          <ApartmentList searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}

// Sub-component to handle the data fetching
async function ApartmentList({ 
  searchParams 
}: { 
  searchParams: Promise<{ [key: string]: string | undefined }> 
}) {
  // Await the promise INSIDE the suspended component
  const filters = await searchParams;

  const apartments = await getAllApartments({
    location: filters.location,
    school: filters.school,
    houseType: filters.houseType,
    priceRange: filters.priceRange,
  });

  if (apartments.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-slate-500 text-lg">No apartments found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {apartments.map((apt) => (
        <ApartmentCard key={apt.id} apartment={apt} />
      ))}
    </div>
  );
}

// A simple skeleton for the apartment grid while loading
function ApartmentGridSkeleton() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-80 bg-gray-100 animate-pulse rounded-xl" />
        ))}
      </div>
    );
}