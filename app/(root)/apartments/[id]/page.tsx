import { getApartmentDetailsById } from "@/lib/data";
import Image from "next/image";
import { Star } from "lucide-react";
import { notFound } from "next/navigation";
import { BookApartment } from "@/app/ui/components/links";
import ImageGallery from "@/app/ui/components/ImageGallery";
import Breadcrumb from "@/app/ui/components/Breadcrumb";
import { SaveApartment } from "@/app/ui/student/saved-apartments/save-apartment-btn";
export default async function ApartmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const apartment = await getApartmentDetailsById(id);

  // Handle potential errors or missing data
  if (!apartment || 'error' in apartment) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-white pb-20">
      {/* Breadcrumb */}
      <Breadcrumb />

      {/*  Image Gallery Section */}
      <section className="max-w-7xl mx-auto px-4 pt-6 sm:px-6 lg:px-8">
        <ImageGallery images={apartment.apartment_images} title={apartment.title} />
      </section>

      {/*  Title and Action Buttons */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{apartment.title}</h1>
            <div className="flex items-center gap-2 mt-2 text-slate-600">
              <span className="text-base">{apartment.address}</span>
            </div>
            <div className="mt-4">
              <p className="text-2xl md:text-3xl font-bold text-slate-900">
                ₦{apartment.price_per_year.toLocaleString()} <span className="text-lg font-normal text-slate-600">Per year</span>
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <BookApartment id={id}/>
            <SaveApartment id={id} />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">About this place</h2>
        <p className="text-slate-700 leading-relaxed text-base max-w-4xl">
          {apartment.description}
        </p>
      </section>

      {/*  Reviews Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Reviews</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {apartment.reviews?.length > 0 ? apartment.reviews.map((review, idx: number) => (
            <div key={idx} className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="h-14 w-14 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700 overflow-hidden flex-shrink-0">
                  {review.student?.avatar_url ? (
                    <Image src={review.student.avatar_url} alt="avatar" width={56} height={56} className="object-cover" />
                  ) : (
                    <span className="text-xl">{review.student.full_name?.charAt(0) || "S"}</span>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-900 text-lg">{review.student.full_name || "Verified Student"}</p>
                  <p className="text-slate-600 text-sm">Student Status</p>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="text-slate-900" fill={i < review.rating ? "currentColor" : "none"} />
                ))}
                <span className="ml-2 text-sm text-slate-600">{review.rating} out of 5</span>
              </div>
              
              <p className="text-slate-700 leading-relaxed">{review.comment}</p>
            </div>
          )) : (
            <p className="text-slate-400 italic col-span-2">No reviews yet for this apartment.</p>
          )}
        </div>
        
        {apartment.reviews && apartment.reviews.length > 4 && (
          <div className="mt-8 text-right">
            <button className="text-slate-900 font-semibold hover:underline">
              See All Reviews
            </button>
          </div>
        )}
      </section>
    </main>
  );
}