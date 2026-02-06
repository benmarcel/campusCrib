import ReviewForm from "@/app/ui/student/reviews";
import { notFound } from "next/navigation";

export default async function ReviewPage({ params }: {
  params: Promise<{ id: string }>;
}) {
const { id } = await params;

// if (!id) {
//   return notFound();
// }

  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <ReviewForm apartmentId={id} />
    </main>
  );    
}