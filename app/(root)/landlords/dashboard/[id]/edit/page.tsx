import EditListingForm from '@/app/ui/landlord/edit-apartment-form';
import { EditListingFormSkeleton } from '@/app/ui/skeletons/edit-form-skeleton';
import { getApartmentById } from '@/lib/data';
import { Suspense } from 'react';
export default async function Page({params}: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Fetch apartment data by ID
  const apartment = await getApartmentById(id);
  return (
    <Suspense fallback={<EditListingFormSkeleton />}>
      <EditListingForm apartment={apartment} />
    </Suspense>
  );
}