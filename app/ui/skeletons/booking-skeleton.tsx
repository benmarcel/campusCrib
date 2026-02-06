export function BookingCardSkeleton() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm animate-pulse">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Image Placeholder */}
        <div className="w-full sm:w-32 h-32 bg-gray-200 rounded-xl flex-shrink-0" />

        {/* Content Placeholder */}
        <div className="flex-grow space-y-3">
          <div className="flex justify-between">
            <div className="h-5 bg-gray-200 rounded w-1/3" />
            <div className="h-6 bg-gray-200 rounded-full w-20" />
          </div>
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          
          <div className="mt-3 p-3 bg-gray-50 rounded-xl border border-gray-100 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>
        </div>
      </div>

      {/* Footer Placeholder */}
      <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
        <div className="h-6 bg-gray-200 rounded w-24" />
        <div className="h-10 bg-gray-200 rounded w-20" />
      </div>
    </div>
  );
}

// A wrapper to show multiple skeletons
export function BookingsListSkeleton() {
  return (
    <div className="space-y-4">
      <BookingCardSkeleton />
      <BookingCardSkeleton />
      <BookingCardSkeleton />
    </div>
  );
}