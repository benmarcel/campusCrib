import ReviewForm from "@/app/ui/student/reviews";
import { Suspense } from "react";

export default async function ReviewPage({ params }: {
  params: Promise<{ id: string }>;
}) {


// if (!id) {
//   return notFound();
// }

  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <Suspense fallback={<div>Loading...</div>}>
        <ReviewForm params={params} />
      </Suspense>
    </main>
  );    
}