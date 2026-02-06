import type { ApartmentWithImages } from "@/lib/definitions";
import Image from "next/image";
import { UpdateApartment } from "../components/links";
import { MapPin, Banknote } from "lucide-react";
import { StatusToggle } from "./toggle-apartment-status";
export default function ApartmentCard({
  apartment,
}: {
  apartment: ApartmentWithImages;
}) {
  return (
    <div className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* --- Image Container --- */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={apartment.apartment_images[0]?.image_url}
          alt={apartment.title}
          fill
          priority={true} 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-100"
        />
        <div className="absolute top-4 right-4">
          <span
            className={`text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1 ${
              apartment.is_active
                ? "bg-green-500/90 text-white"
                : "bg-gray-500/90 text-white"
            }`}
          >
            <div
              className={`h-1.5 w-1.5 rounded-full bg-white ${apartment.is_active ? "animate-pulse" : ""}`}
            />
            {apartment.is_active ? "Active" : "Hidden"}
          </span>
        </div>
      </div>

      {/* --- Content Section --- */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex-grow">
          <h2 className="text-xl font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {apartment.title}
          </h2>

          <div className="mt-4 space-y-3">
            {/* Price Row */}
            <div className="flex items-center gap-3 text-slate-700">
              <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                <Banknote size={16} />
              </div>
              <span className="font-bold text-lg">
                ₦{apartment.price_per_year.toLocaleString()}
                <span className="text-sm font-normal text-slate-400">
                  {" "}
                  / year
                </span>
              </span>
            </div>

            {/* Address Row */}
            <div className="flex items-center gap-3 text-slate-500">
              <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                <MapPin size={16} />
              </div>
              <p className="text-sm line-clamp-1">{apartment.address}</p>
            </div>
          </div>
        </div>

        {/* --- Footer Action --- */}
        <div className="mt-8 pt-5 border-t border-slate-50 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-slate-300 tracking-widest">
              Apartment status
            </span>
           {/* Replace the hardcoded text or ID with the Toggle */}
            <StatusToggle id={apartment.id} isActive={apartment.is_active} />
          </div>

          <div className="flex items-center gap-2">
            <UpdateApartment id={apartment.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
