import { getSavedApartmentsByStudentId } from "@/lib/data";
import Link from "next/link";
import { SavedApartments } from "@/lib/definitions";
import SavedApartmentCard from "./saved-apartment-card";

export default async function SavedApartmentsPage() {
  const savedApartments: SavedApartments[] = await getSavedApartmentsByStudentId();

  return (
    <main className="min-h-screen bg-white py-10">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-10">Saved Apartments</h1>

        {savedApartments.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 mb-4">You haven't saved any apartments yet.</p>
            <Link href="/apartments" className=" border px-4 py-2 rounded-lg bg-[#003366] text-white  hover:bg-[#002244] transition-colors">
              Browse Listings
            </Link>
          </div>
        ) : (
          /* Two-column grid to match the design */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {savedApartments.map((savedApartment) => (
              <SavedApartmentCard key={savedApartment.id} savedApartment={savedApartment} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
