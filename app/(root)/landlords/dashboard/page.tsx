import DashboardSkeleton from "@/app/ui/skeletons/dashboard-skeleton";
import { Suspense } from "react";
import DashboardPage from "@/app/ui/landlord/dashboard";

export default function Page({searchParams}: {searchParams: Promise<{ tab?: string }>}) {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">

      {/* Content */}
      <section>
        <Suspense fallback={<DashboardSkeleton />}>
          <DashboardPage searchParams={searchParams}/>
        </Suspense>
      </section>
    </main>
  );
}
