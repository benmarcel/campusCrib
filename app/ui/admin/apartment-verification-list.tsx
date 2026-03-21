import { getAllApartmentsForVerification } from "@/lib/data";
import VerifyApartmentButton from "./verify-apartment";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import type { ApartmentForVerification } from "@/lib/definitions";

export default async function ApartmentVerificationList() {
  const apartments = await getAllApartmentsForVerification();

  if (apartments.length === 0) {
    return (
      <div className="py-20 text-center flex flex-col items-center gap-4">
        <CheckCircle2 className="text-slate-200" size={32} />
        <p className="text-slate-400 font-medium">No properties pending review.</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-slate-50">
      {apartments.map((apt: ApartmentForVerification) => (
        <div key={apt.id} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
          <div className="flex flex-col gap-2">
            <p className="font-bold text-slate-900">{apt.title}</p>
            <div className="flex items-center gap-1 text-sm text-slate-500">
              <AlertCircle size={14} className="text-orange-400" />
              <span>{apt.address}</span>
            </div>
            <p className="text-xs text-slate-400">
              Landlord: {apt.profiles?.full_name} · {apt.profiles?.phone_number}
            </p>
            {apt.verification_payments?.[0] && apt.verification_payments[0].amount !== null && (
              <p className="text-xs text-green-600 font-medium">
                ✓ Payment confirmed · ₦{(apt.verification_payments[0].amount / 100).toLocaleString()}
              </p>
            )}
            <p className="text-xs text-slate-400">
              ₦{apt.price_per_year?.toLocaleString()}/yr · {apt.school}
            </p>
          </div>
          <VerifyApartmentButton apartmentId={apt.id} />
        </div>
      ))}
    </div>
  );
}