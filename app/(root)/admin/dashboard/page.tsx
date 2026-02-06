import AdminDashboardPage from "@/app/ui/admin/dashboard";
import { Suspense } from "react";
export default async function Dashboard() {
  return (
    <Suspense fallback={<p className="text-gray-500">Loading dashboard...</p>}>
      <AdminDashboardPage searchParams={Promise.resolve({ tab: "users" })} />
    </Suspense>
  );
}

