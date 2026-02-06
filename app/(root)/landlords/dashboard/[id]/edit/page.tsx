import EditListingForm from '@/app/ui/landlord/edit-apartment-form';
import { EditListingFormSkeleton } from '@/app/ui/skeletons/edit-form-skeleton';
import { getApartmentById } from '@/lib/data';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<EditListingFormSkeleton />}>
      <EditApartmentDataFetcher params={params} />
    </Suspense>
  );
}

async function EditApartmentDataFetcher({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Fetch apartment data by ID
  const apartment = await getApartmentById(id);

  // Safety check: If no apartment is found, trigger the 404 page
  if (!apartment) {
    notFound();
  }

  return <EditListingForm apartment={apartment} />;
}