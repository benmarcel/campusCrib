import { ApartmentCardSkeleton } from "./apartment-skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="p-4">
      {/* Header Title Skeleton */}
      <div className="h-8 bg-gray-300 rounded w-48 mb-6 animate-pulse" />

      {/* Grid of Skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ApartmentCardSkeleton />
        <ApartmentCardSkeleton />
        <ApartmentCardSkeleton />
        <ApartmentCardSkeleton />
        <ApartmentCardSkeleton />
        <ApartmentCardSkeleton />
      </div>
    </div>
  );
}