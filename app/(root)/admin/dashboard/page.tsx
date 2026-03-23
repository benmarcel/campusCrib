export const dynamic = 'force-dynamic';
import { Suspense } from "react";
import Link from "next/link";
import { ShieldCheck, Users, Building2, CheckCircle2  } from "lucide-react";
import UserVerificationList from "@/app/ui/admin/user-verification-list";

import ApartmentVerificationList from "@/app/ui/admin/apartment-verification-list";
import { getUserCount, getApartmentCount } from "@/lib/data";
import { StatCard } from "@/app/ui/admin/statcard";
import { connection } from 'next/server'

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {

  await connection(); // Ensure DB connection is established before rendering
  const params = await searchParams
  const activeTab = params.tab ?? "users"
  const [userCount, apartmentCount] = await Promise.all([
    getUserCount(),
    getApartmentCount(),
  ]);
  return (
    <section className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="flex flex-col gap-2 mb-10">
          <div className="flex items-center gap-2 text-accent font-semibold text-sm uppercase tracking-wider">
            <ShieldCheck size={18} />
            <span>Internal Administration</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            System Verification
          </h1>
          <p className="text-slate-500">Review and authorize new users and Apartments.</p>
        </div>

        {/* Renders as soon as counts arrive — very fast */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-10">
          <StatCard
            title="Pending Users"
            value={userCount}
            icon={<Users size={24} />}
            color="indigo"
          />
          <StatCard
            title="Pending Apartments"
            value={apartmentCount}
            icon={<Building2 size={24} />}
            color="orange"
          />
          <StatCard
            title="Security Status"
            value="Secure"
            icon={<CheckCircle2 size={24} />}
            color="green"
          />
        </div>

        <div className="flex items-center gap-8 border-b border-slate-200 mb-8">
          <Link
            href="/admin/dashboard?tab=users"
            className={`pb-4 text-sm font-bold transition-all ${
              activeTab === "users"
                ? "border-b-2 border-accent text-accent"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Users Pending ({userCount})
          </Link>
          <Link
            href="/admin/dashboard?tab=apartments"
            className={`pb-4 text-sm font-bold transition-all ${
              activeTab === "apartments"
                ? "border-b-2 border-accent text-accent"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Apartments Pending ({apartmentCount})
          </Link>
        </div>

        {/* Streams in after — full row data fetched inside each component */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          {activeTab === "users" ? (
            <Suspense fallback={<ListSkeleton />}>
              <UserVerificationList />
            </Suspense>
          ) : (
            <Suspense fallback={<ListSkeleton />}>
              <ApartmentVerificationList />
            </Suspense>
          )}
        </div>

      </div>
    </section>
  );
}

// Defined right here in the same file, no import needed
function ListSkeleton() {
  return (
    <div className="divide-y divide-slate-50">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="p-6 flex items-center justify-between animate-pulse">
          <div className="flex flex-col gap-2">
            <div className="h-4 w-48 bg-slate-100 rounded" />
            <div className="h-3 w-32 bg-slate-50 rounded" />
          </div>
          <div className="h-9 w-24 bg-slate-100 rounded-xl" />
        </div>
      ))}
    </div>
  );
}