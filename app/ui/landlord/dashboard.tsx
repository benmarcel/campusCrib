"use server";
import type { BookingsWithApartment } from "@/lib/definitions";
import type { ApartmentWithImages } from "@/lib/definitions";
import { getApartmentsByLandlordId, getBookingsByLandlordId } from "@/lib/data";
import { AddApartment } from "@/app/ui/components/links";
import ApartmentCard from "./apartment-card";
import BookingCard from "./booking-card";
import {
  LayoutDashboard,
  Building2,
  CheckCircle2,
  Home,
  CalendarCheck,
  ClipboardList,
} from "lucide-react";

import Link from "next/link";
export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  // Await the searchParams
  const params = await searchParams;
  const activeTab = params.tab || "apartments";

  const apartments: ApartmentWithImages[] = await getApartmentsByLandlordId();
  const bookings = await getBookingsByLandlordId();

  return (
    <section className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* --- Header --- */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-accent font-semibold text-sm tracking-wide uppercase mb-1">
              <LayoutDashboard size={16} />
              <span>Owner Management</span>
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Dashboard
            </h1>
          </div>
          <AddApartment />
        </div>

        {/* --- Stats Overview --- */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Building2 size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">
                Total Properties
              </p>
              <p className="text-2xl font-bold text-slate-900">
                {apartments.length}
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-xl">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">
                Active Listings
              </p>
              <p className="text-2xl font-bold text-slate-900">
                {apartments.length}
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
              <CalendarCheck size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">
                Total Bookings
              </p>
              <p className="text-2xl font-bold text-slate-900">{bookings.length}</p>
            </div>
          </div>
        </div>

        {/* --- Tab Navigation --- */}
        <div className="flex items-center gap-8 border-b border-slate-200 mb-8">
          <Link
            href="?tab=apartments"
            className={`pb-4 text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === "apartments"
                ? "border-b-2 border-accent text-accent"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Building2 size={18} />
            My Apartments ({apartments.length})
          </Link>
          <Link
            href="?tab=bookings"
            className={`pb-4 text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === "bookings"
                ? "border-b-2 border-accent text-accent"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <CalendarCheck size={18} />
            Bookings ({bookings.length})
          </Link>
        </div>

        {/* --- Dynamic Content Area --- */}
        {activeTab === "apartments" ? (
          <ApartmentGrid apartments={apartments} />
        ) : (
          <BookingGrid bookings={bookings} />
        )}
      </div>
    </section>
  );
}

// --- Sub-components---

function ApartmentGrid({ apartments }: { apartments: ApartmentWithImages[] }) {
  if (apartments.length === 0)
    return <EmptyState title="No apartments yet" icon={<Home />} />;
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {apartments.map((apt) => (
        <ApartmentCard key={apt.id} apartment={apt} />
      ))}
    </div>
  );
}

function BookingGrid({ bookings }: { bookings: BookingsWithApartment[] }) {
  if (bookings.length === 0)
    return <EmptyState title="No bookings yet" icon={<ClipboardList />} />;
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {bookings.map((booking) => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  );
}

// for empty states
function EmptyState({ title, icon }: { title: string; icon: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[2.5rem] border-2 border-dashed border-slate-200 py-24 text-center bg-white">
      <div className="bg-slate-50 p-6 rounded-full mb-6 text-slate-300">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
    </div>
  );
}
