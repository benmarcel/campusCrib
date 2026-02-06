import type { BookingsWithApartment } from "@/lib/definitions";
import { ConfirmBookingButton } from "./confirm-booking";
import { Calendar, Clock, Phone, MapPin, User, CheckCircle, Timer } from "lucide-react";

export default function BookingCard({ booking }: { booking: BookingsWithApartment }) {
  const isPending = booking.status === "pending";

  return (
    <div className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col h-full overflow-hidden">
      {/* --- Header Status --- */}
      <div className="px-6 pt-6 flex justify-between items-start">
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
          isPending ? "bg-amber-50 text-amber-600" : "bg-green-50 text-green-600"
        }`}>
          {isPending ? <Timer size={12} /> : <CheckCircle size={12} />}
          {booking.status}
        </div>
        
        <div className="text-right">
          <span className="text-[10px] uppercase font-bold text-slate-300 tracking-widest block">Request ID</span>
          <span className="text-xs font-mono text-slate-400">#{booking.id.slice(0, 6)}</span>
        </div>
      </div>

      {/* --- Content Section --- */}
      <div className="p-6 flex-grow">
        <h2 className="text-xl font-bold text-slate-900 line-clamp-1 mb-1">
          {booking.apartments.title}
        </h2>
        <div className="flex items-center gap-1 text-slate-500 text-sm mb-6">
          <MapPin size={14} className="text-slate-400" />
          <span className="line-clamp-1">{booking.apartments.address}</span>
        </div>

        <div className="space-y-4">
          {/* Appointment Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100/50">
              <div className="flex items-center gap-2 text-slate-400 mb-1">
                <Calendar size={14} />
                <span className="text-[10px] uppercase font-bold tracking-tight">Date</span>
              </div>
              <p className="text-sm font-semibold text-slate-700">
                {new Date(booking.visit_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
              </p>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100/50">
              <div className="flex items-center gap-2 text-slate-400 mb-1">
                <Clock size={14} />
                <span className="text-[10px] uppercase font-bold tracking-tight">Time</span>
              </div>
              <p className="text-sm font-semibold text-slate-700">{booking.visit_time}</p>
            </div>
          </div>

          {/* Student Contact Info */}
          <div className="p-4 bg-blue-50/30 rounded-2xl border border-blue-100/20">
            <div className="flex items-center gap-2 text-blue-600/60 mb-2">
              <User size={14} />
              <span className="text-[10px] uppercase font-bold tracking-tight">Student Contact</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <Phone size={14} className="text-slate-400" />
              <p className="text-sm font-medium">{booking.contact_info}</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Footer Action --- */}
      {isPending && (
        <div className="p-6 pt-0 mt-auto">
          <ConfirmBookingButton bookingId={booking.id} />
        </div>
      )}
    </div>
  );
}