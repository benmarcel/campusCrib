import Image from "next/image";

interface ApartmentImage {
  image_url: string;
}

interface ImageGalleryProps {
  images: ApartmentImage[];
  title: string | undefined;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  // Ensure we have at least one image (fallback to placeholder)
  const displayImages = images.length > 0 ? images : [{ image_url: "/placeholder.jpg" }];
  
  // Get first image for main display
  const mainImage = displayImages[0];
  
  // Get remaining images (max 4 for the grid)
  const sideImages = displayImages.slice(1, 5);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {/* Main Large Image */}
      <div className="relative h-[200px] sm:h-[300px] md:h-[350px] overflow-hidden rounded-lg">
        <Image
          src={mainImage.image_url}
          alt={title ? title : "Apartment Image"}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Side Grid - Only show if there are more images */}
      {sideImages.length > 0 && (
        <div className={`hidden md:grid gap-3 ${
          sideImages.length === 1 ? 'grid-cols-1' :
          sideImages.length === 2 ? 'grid-cols-1 grid-rows-2' :
          sideImages.length === 3 ? 'grid-cols-1 grid-rows-3' :
          'grid-cols-1 grid-rows-2'
        }`}>
          {sideImages.map((image, index) => (
            <div
              key={index}
              className={`relative h-full min-h-[150px] overflow-hidden rounded-lg ${
                // Make the last image span 2 columns if we have exactly 3 images
                sideImages.length === 3 && index === 2 ? 'col-span-2' : ''
              }`}
            >
              <Image
                src={image.image_url}
                alt={`${title} - Image ${index + 2}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Mobile: Show all images in a scrollable row */}
      {displayImages.length > 1 && (
        <div className="md:hidden overflow-x-auto flex gap-3 snap-x snap-mandatory">
          {displayImages.slice(1).map((image, index) => (
            <div
              key={index}
              className="relative h-[200px] min-w-[280px] flex-shrink-0 overflow-hidden rounded-lg snap-center"
            >
              <Image
                src={image.image_url}
                alt={`${title} - Image ${index + 2}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}



// export function ImageGalleryWithViewAll({ images, title }: ImageGalleryProps) {
//   const displayImages = images.length > 0 ? images : [{ image_url: "/placeholder.jpg" }];
//   const mainImage = displayImages[0];
//   const sideImages = displayImages.slice(1, 5);
//   const remainingCount = images.length > 5 ? images.length - 5 : 0;

//   return (
//     <div className="relative">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//         {/* Main Large Image */}
//         <div className="relative h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden rounded-lg">
//           <Image
//             src={mainImage.image_url}
//             alt={title}
//             fill
//             className="object-cover"
//             priority
//           />
//         </div>

//         {/* Side Grid */}
//         {sideImages.length > 0 && (
//           <div className="hidden md:grid grid-cols-2 grid-rows-2 gap-3">
//             {sideImages.map((image, index) => (
//               <div
//                 key={index}
//                 className="relative h-full min-h-[150px] overflow-hidden rounded-lg"
//               >
//                 <Image
//                   src={image.image_url}
//                   alt={`${title} - Image ${index + 2}`}
//                   fill
//                   className="object-cover"
//                 />
                
//                 {/* Show "+X more" overlay on last image if there are more photos */}
//                 {index === sideImages.length - 1 && remainingCount > 0 && (
//                   <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
//                     <span className="text-white text-xl font-bold">
//                       +{remainingCount} more
//                     </span>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Mobile Scrollable */}
//         {displayImages.length > 1 && (
//           <div className="md:hidden overflow-x-auto flex gap-3 snap-x snap-mandatory pb-2">
//             {displayImages.slice(1).map((image, index) => (
//               <div
//                 key={index}
//                 className="relative h-[200px] min-w-[280px] flex-shrink-0 overflow-hidden rounded-lg snap-center"
//               >
//                 <Image
//                   src={image.image_url}
//                   alt={`${title} - Image ${index + 2}`}
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* View All Photos Button (Optional) */}
//       {images.length > 5 && (
//         <button className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow-lg font-medium hover:bg-gray-100 transition-colors hidden md:block">
//           View all {images.length} photos
//         </button>
//       )}
//     </div>
//   );
// }