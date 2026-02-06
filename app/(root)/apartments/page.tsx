// app/page.tsx
import SearchBar from "@/app/ui/components/search";
import ApartmentCard from "@/app/ui/components/ApartmentCard";
import { getAllApartments } from "@/lib/data";
import { Suspense } from "react";
import { ApartmentFilters } from "@/lib/definitions";
import SearchBarSkeleton from "@/app/ui/skeletons/searchbar-skeleton";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  // Await the search parameters from the URL
  const filters = await searchParams;

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
        
        {/* Pass filters directly into your fetch function */}
        <Suspense fallback={<p>Loading houses...</p>} key={JSON.stringify(filters)}>
          <ApartmentList filters={filters} />
        </Suspense>
      </div>
    </main>
  );
}

//  Sub-component to handle the data fetching
async function ApartmentList({ filters }: { filters: ApartmentFilters }) {
  const apartments = await getAllApartments({
    location: filters.location,
    school: filters.school,
    houseType: filters.houseType,
    priceRange: filters.priceRange,
  });

  if (apartments.length === 0) {
    return <p className="text-slate-500">No apartments found matching your criteria.</p>;
  }

  return (
    <div>
     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {apartments.map((apt) => (
        <ApartmentCard key={apt.id} apartment={apt} />
      ))}
    </div>
    </div>
  );
}
