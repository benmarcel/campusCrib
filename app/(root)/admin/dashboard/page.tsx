import { getAllUsersForVerification, getAllApartmentsForVerification } from "@/lib/data";
import VerifyUserButton from "@/app/ui/admin/verify-user";
import VerifyApartmentButton from "@/app/ui/admin/verify-apartment";
import Link from "next/link";
import { 
  ShieldCheck, 
  Users, 
  Building2, 
  AlertCircle, 
  CheckCircle2, 
} from "lucide-react";

import type { Apartment, User } from "@/lib/definitions";
import { ReactNode } from "react";

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const activeTab = (await searchParams).tab || "users";

  const users = await getAllUsersForVerification();
  const apartments = await getAllApartmentsForVerification();

  return (
    <section className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        
        {/* --- Header --- */}
        <div className="flex flex-col gap-2 mb-10">
          <div className="flex items-center gap-2 text-accent font-semibold text-sm uppercase tracking-wider">
            <ShieldCheck size={18} />
            <span>Internal Administration</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">System Verification</h1>
          <p className="text-slate-500">Review and authorize new users and Apartments.</p>
        </div>

        {/* --- Stats Overview --- */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-10">
          <StatCard 
            title="Pending Users" 
            value={users.length} 
            icon={<Users size={24} />} 
            color="indigo" 
          />
          <StatCard 
            title="Pending Apartments" 
            value={apartments.length} 
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

        {/* --- Tab Navigation --- */}
        <div className="flex items-center gap-8 border-b border-slate-200 mb-8">
          <Link 
            href="?tab=users"
            className={`pb-4 text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === "users" 
              ? "border-b-2 border-accent text-accent" 
              : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Users Pending ({users.length})
          </Link>
          <Link 
            href="?tab=apartments"
            className={`pb-4 text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === "apartments" 
              ? "border-b-2 border-accent text-accent" 
              : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Apartments Pending ({apartments.length})
          </Link>
        </div>

        {/* --- Data View --- */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          {activeTab === "users" ? (
            <UserVerificationList users={users} />
          ) : (
            <ApartmentVerificationList apartments={apartments} />
          )}
        </div>
      </div>
    </section>
  );
}

/* --- Sub-Components --- */

function UserVerificationList({ users }: { users: User[] }) {
  if (users.length === 0) return <EmptyState message="All users are verified!" />;

  return (
    <div className="divide-y divide-slate-50">
      {users.map((user) => (
        <div key={user.id} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 font-bold uppercase">
              {user.full_name?.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-slate-900">{user.full_name}</p>
              <p className="text-sm text-slate-500">{user.phone_number}</p>
            </div>
          </div>
          <VerifyUserButton userId={user.id} />
        </div>
      ))}
    </div>
  );
}

function ApartmentVerificationList({ apartments }: { apartments: Apartment[] }) {
  if (apartments.length === 0) return <EmptyState message="No properties pending review." />;

  return (
    <div className="divide-y divide-slate-50">
      {apartments.map((apt) => (
        <div key={apt.id} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
          <div className="flex flex-col gap-1">
            <p className="font-bold text-slate-900">{apt.title}</p>
            <div className="flex items-center gap-1 text-sm text-slate-500">
              <AlertCircle size={14} className="text-orange-400" />
              <span>{apt.address}</span>
            </div>
          </div>
          <VerifyApartmentButton apartmentId={apt.id} />
        </div>
      ))}
    </div>
  );
}

function StatCard({ title, value, icon, color }: { title: string, value: number | string, icon: ReactNode, color: string }) {
  const colors: Record<string, string> = {
    indigo: "bg-indigo-50 text-indigo-600",
    orange: "bg-orange-50 text-orange-600",
    green: "bg-green-50 text-green-600",
  };
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
      <div className={`p-3 rounded-2xl ${colors[color]}`}>
        {icon ? (icon) : "?"}
      </div>
      <div>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{title}</p>
        <p className="text-2xl font-black text-slate-900">{value}</p>
      </div>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="py-20 text-center flex flex-col items-center gap-4">
      <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center">
        <CheckCircle2 className="text-slate-200" size={32} />
      </div>
      <p className="text-slate-400 font-medium">{message}</p>
    </div>
  );
}