// app/ui/skeletons.tsx (or alongside your component)

export function ApartmentCardSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Image Skeleton */}
      <div className="bg-gray-300 rounded-lg w-[300px] h-[300px]" />
      
      {/* Title Skeleton */}
      <div className="h-6 bg-gray-300 rounded mt-2 w-3/4" />
      
      {/* Price Skeleton */}
      <div className="h-5 bg-gray-200 rounded mt-1 w-1/2" />
      
      {/* Address Skeleton */}
      <div className="h-4 bg-gray-200 rounded mt-1 w-2/3" />
      
      {/* Button Skeleton */}
      <div className="mt-4 flex justify-between items-center">
        <div className="h-10 bg-gray-300 rounded w-24" />
      </div>
    </div>
  );
}