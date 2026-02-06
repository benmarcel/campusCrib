export function BookingCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 space-y-4 animate-pulse">
      {/* Header logic */}
      <div className="flex justify-between items-start">
        <div className="space-y-2 w-full">
          <div className="h-6 bg-slate-200 rounded-md w-3/4" />
          <div className="h-4 bg-slate-100 rounded-md w-1/2" />
        </div>
        <div className="h-6 w-20 bg-slate-100 rounded-full" />
      </div>

      {/* Details section */}
      <div className="pt-4 border-t border-slate-50 space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-slate-50 rounded-lg" />
          <div className="h-4 bg-slate-100 rounded-md w-1/3" />
        </div>
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-slate-50 rounded-lg" />
          <div className="h-4 bg-slate-100 rounded-md w-2/3" />
        </div>
      </div>

      {/* Footer Actions */}
      <div className="pt-4 flex gap-2">
        <div className="h-10 bg-slate-200 rounded-xl w-1/2" />
        <div className="h-10 bg-slate-100 rounded-xl w-1/2" />
      </div>
    </div>
  );
}

export function BookingsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <BookingCardSkeleton key={i} />
      ))}
    </div>
  );
}