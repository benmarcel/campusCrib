import Link from "next/link";
import { PencilIcon, PlusIcon } from "lucide-react";

export function AddApartment() {
 
  return (
    <Link
      href="/landlords/dashboard/add"
      className="flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className=" md:block">Add Rental Apartment</span>{' '}
      <PlusIcon className="h-5" />
    </Link>
  );
}

export function UpdateApartment({ id }: { id: string }) {
  return (
    <Link
      href={`/landlords/dashboard/${id}/edit`}
      className="flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <PencilIcon className="w-5" /><span className="ml-2 hidden md:block">Edit Apartment</span>
    </Link>
  );
}
export function BookApartment({ id }: { id: string }) {
  return (
    <Link
      href={`/bookings/${id}/add`}
      className="flex h-10 items-center justify-center rounded-lg bg-[#003366] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-800"
    >
      <span className="text-center text-sm">Book Apartment</span>
    </Link>
  );
}
export function GetAPlace() {
  return (
    <Link
      href={`/apartments`}
      className="flex h-15 items-center justify-center rounded-lg bg-[#003366] px-5 py-3 text-sm font-medium text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
    >
      <span className="text-center text-xl mx-1">Get A Place</span>
    </Link>
  );
}
export function EditBooking({ id }: { id: string }) {
  return (
    <Link
      href={`/bookings/${id}/edit`}
      className="flex h-10 items-center justify-center rounded-lg bg-[#003366] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-800"
    >
      Edit Booking
    </Link>
  );
}

export function CancelBooking({ id }: { id: string }) {

  return (
    <Link
      href={`?confirmCancel=true&bookingId=${id}`}
      className="flex h-10 items-center justify-center rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-400"
    >
      Cancel Booking
    </Link>
  
  );
}

// export function SaveApartment({ id }: { id: string }) {
//   return (
//     <Link
//       href={`/dashboard/rental-apartment/${id}/edit`}
//       className="flex h-10 items-center justify-center rounded-lg bg-[#003366] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-800"
//     >
//       <span className="text-center text-xl">Save For Later</span>
//     </Link>
//   );
// }

export function ReviewApartment({ id }: { id: string }) {
  return (
    <Link
      href={`/my-bookings/${id}/reviews`}
      className="flex h-10 items-center justify-center rounded-lg bg-[#003366] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-800"
    >
     Review Apartment
    </Link>
  );
}