import type { ApartmentWithReviewCount } from "@/lib/definitions";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

export default function ApartmentCard({
  apartment,
}: {
  apartment: ApartmentWithReviewCount;
}) {
  return (
    <Link
      href={`/apartments/${apartment.id}`}
      className="group bg-secondary rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col h-full"
    >
      {/* --- Image Container --- */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={apartment.apartment_images[0]?.image_url}
          alt={apartment.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* --- Content Section --- */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-lg font-bold text-slate-900 line-clamp-1 mb-1">
          {apartment.title}
        </h3>

        {/* Address */}
        <p className="text-sm text-slate-600 uppercase mb-3">
          {apartment.address}
        </p>

        {/* Price */}
        <div className="mt-auto">
          <p className="text-2xl font-bold text-slate-900">
            ₦{apartment.price_per_year.toLocaleString()}
            <span className="text-base font-normal text-slate-600">/Yr</span>
          </p>

          {/* Reviews */}
          <div className="flex items-center gap-1 mt-2">
            <Star size={16} className="text-slate-900 fill-slate-900" />
            <span className="text-sm font-medium text-slate-900">
              {apartment.reviews_count} Review{apartment.reviews_count !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
