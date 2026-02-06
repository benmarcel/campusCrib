import { SavedApartments } from "@/lib/definitions";
import Image from "next/image";
import { BookApartment } from "../../components/links";

export default function SavedApartmentCard({ savedApartment }: { savedApartment: SavedApartments }) {
    return (
        <div className="flex flex-row items-center gap-4 bg-white overflow-hidden">
            {/* Image Section - Fixed size like the Figma mockup */}
            <div className="relative w-32 h-24 sm:w-48 sm:h-36 shrink-0">
                <Image
                    src={savedApartment.apartments.apartment_images[0]?.image_url || ""}
                    alt={savedApartment.apartments.title || "Apartment Image"}
                    fill
                    priority={true}
                    className="object-cover rounded-sm"
                />
            </div>

            {/* Content Section */}
            <div className="flex flex-col justify-between py-1">
                <div>
                    <h3 className="text-base sm:text-xl font-medium text-gray-900 leading-tight">
                        {savedApartment.apartments.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-500">
                        {savedApartment.apartments.address}
                    </p>
                    <p className="mt-1 text-sm sm:text-base font-semibold text-gray-900">
                        ₦{savedApartment.apartments.price_per_year?.toLocaleString()} Per year
                    </p>
                </div>
                
                <div className="mt-2">
                    <BookApartment id={savedApartment.apartments.id!} />
                </div>
            </div>
        </div>
    );
}