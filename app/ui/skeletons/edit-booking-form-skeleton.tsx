export function EditBookingFormSkeleton() {
  return (
    // We match the max-width and padding of the original form
    <div className="w-full max-w-md bg-gray-50 p-8 rounded-2xl border border-gray-100 animate-pulse">
      {/* Title Skeleton */}
      <div className="h-9 w-40 bg-gray-200 rounded-lg mx-auto mb-8" />

      <div className="space-y-6">
        {/* Date Field Skeleton */}
        <div className="space-y-2">
          <div className="h-4 w-20 bg-gray-200 rounded ml-1" /> {/* Label */}
          <div className="h-12 w-full bg-gray-200 rounded-xl" /> {/* Input */}
        </div>

        {/* Time Field Skeleton */}
        <div className="space-y-2">
          <div className="h-4 w-20 bg-gray-200 rounded ml-1" />
          <div className="h-12 w-full bg-gray-200 rounded-xl" />
        </div>

        {/* Contact Field Skeleton */}
        <div className="space-y-2">
          <div className="h-4 w-24 bg-gray-200 rounded ml-1" />
          <div className="h-12 w-full bg-gray-200 rounded-xl" />
        </div>
      </div>

      {/* Button Skeleton */}
      <div className="h-14 w-full bg-gray-200 rounded-xl mt-8" />
    </div>
  );
}