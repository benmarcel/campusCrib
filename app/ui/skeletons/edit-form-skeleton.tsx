// app/ui/skeletons.tsx

export function EditListingFormSkeleton() {
  return (
    <div className="max-w-2xl mx-auto p-4 animate-pulse">
      {/* Form Container */}
      <div className="space-y-6">
        
        {/* House Title Section */}
        <div className="flex flex-col space-y-2">
          <div className="h-4 bg-gray-200 rounded w-24 ml-1" /> {/* Label */}
          <div className="h-12 bg-gray-100 rounded-xl w-full border border-gray-200" /> {/* Input */}
        </div>

        {/* Grid for Price and School */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-2">
            <div className="h-4 bg-gray-200 rounded w-32 ml-1" />
            <div className="h-12 bg-gray-100 rounded-xl w-full border border-gray-200" />
          </div>
          <div className="flex flex-col space-y-2">
            <div className="h-4 bg-gray-200 rounded w-32 ml-1" />
            <div className="h-12 bg-gray-100 rounded-xl w-full border border-gray-200" />
          </div>
        </div>

        {/* Address Section */}
        <div className="flex flex-col space-y-2">
          <div className="h-4 bg-gray-200 rounded w-28 ml-1" />
          <div className="h-12 bg-gray-100 rounded-xl w-full border border-gray-200" />
        </div>

        {/* Description Section */}
        <div className="flex flex-col space-y-2">
          <div className="h-4 bg-gray-200 rounded w-20 ml-1" />
          <div className="h-32 bg-gray-100 rounded-xl w-full border border-gray-200" />
        </div>

        {/* Button Section */}
        <div className="h-12 bg-blue-100 rounded-xl w-full mt-4" />
      </div>
    </div>
  );
}