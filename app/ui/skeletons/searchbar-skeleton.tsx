export default function SearchBarSkeleton() {
  return (
    <div className="w-full mx-auto bg-slate-100 rounded-lg p-6 animate-pulse">
      <div className="h-12 bg-slate-300 rounded mb-4"></div>
      <div className="grid grid-cols-4 gap-4">
        <div className="h-12 bg-slate-300 rounded"></div>
        <div className="h-12 bg-slate-300 rounded"></div>
        <div className="h-12 bg-slate-300 rounded"></div>
        <div className="h-12 bg-slate-300 rounded"></div>
      </div>
    </div>
  );
}