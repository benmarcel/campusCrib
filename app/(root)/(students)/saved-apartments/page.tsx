import { Suspense } from "react";
import SavedApartmentsPage from "@/app/ui/student/saved-apartments/saved-apartments";

export default function Page () {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SavedApartmentsPage />
    </Suspense>
  );
}
