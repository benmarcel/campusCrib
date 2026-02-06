"use client";
import { bookApartment } from "@/lib/actions";
import { useActionState } from "react";
import Alert from "../components/Alert";

export default function Bookingform({ apartmentId }: { apartmentId: string }) {
  const [state, formAction, isPending] = useActionState(
    bookApartment,
    undefined,
  );

  const inputStyle =
    "w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#001F3F] transition-all placeholder:text-gray-400 text-gray-700";
  const labelStyle = "block text-sm font-semibold text-blue-950 mb-1 ml-1";

  return (
    <form
      action={formAction}
      className="w-full max-w-md bg-secondary p-8 rounded-2xl shadow-lg border border-gray-100"
    >
      <h2 className="text-3xl font-bold text-center text-primary mb-8 uppercase tracking-tight">
        Book Visit
      </h2>
      {state?.error && <Alert variant="error" message={state.error} />}
      {/* hidden input to get callback url */}
      <input type="hidden" name="apartment_id" value={apartmentId} />
      <div className="space-y-4">
        {/* date Field */}
        <div className="flex flex-col">
          <label className={labelStyle} htmlFor="visit_date">
            Visit date
          </label>
          <input
            name="visit_date"
            id="visit_date"
            type="date"
            placeholder="23-14-2026"
            className={inputStyle}
            required
          />
        </div>

        {/* visit time Field */}
        <div className="flex flex-col">
          <label className={labelStyle} htmlFor="time">
            Visit Time
          </label>
          <input
            name="visit_time"
            id="time"
            type="time"
            placeholder="2:04"
            className={inputStyle}
            required
          />
        </div>
        {/* visit time Field */}
        <div className="flex flex-col">
          <label className={labelStyle} htmlFor="contact_info">
            Contact Info
          </label>
          <input
            name="contact_info"
            id="contact_info"
            type="tel"
            placeholder="e.g, +2348012345678"
            className={inputStyle}
            required
          />
        </div>
      </div>

      <button
        disabled={isPending}
        className="w-full bg-primary text-white py-4 rounded-xl mt-8 font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all disabled:opacity-50"
      >
        {isPending ? "Booking....." : "Book Visit"}
      </button>
    </form>
  );
}
