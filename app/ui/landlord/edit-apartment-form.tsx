"use client";

import type { Apartment } from "@/lib/definitions";
import { useActionState } from "react";
import { updateApartment, AddApartmentState } from "@/lib/actions";
import Alert from "../components/Alert";
export default function EditListingForm({
  apartment,
}: {
  apartment: Apartment;
}) {
  const updateListingWithId = (state: AddApartmentState, formData: FormData) =>
    updateApartment(state, apartment.id, formData);

  const [state, formAction, isPending] = useActionState(
    updateListingWithId,
    {},
  );

  const inputStyle =
    "w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#001F3F] transition-all placeholder:text-gray-400 text-gray-700";
  const labelStyle = "block text-sm font-semibold text-blue-950 mb-1 ml-1";

  return (
    <form
      action={formAction}
      className="w-full max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100 mt-4"
    >
      {/* Success/Error Messages */}
      <h2 className="text-3xl font-bold text-center text-[#001F3F] mb-8 uppercase tracking-tight">
        Edit Apartment Details
      </h2>
      {state?.error && <Alert variant="error" message={state.error} />}

      {state?.success && (
        <Alert
          variant="success"
          message={state.message}
          className="text-center"
        />
      )}
      <div className="space-y-5">
        <div className="flex flex-col">
          <label className={labelStyle}>House Title</label>
          <select
            name="title"
            defaultValue={apartment.title}
            className={inputStyle}
            required
          >
            <option value="" disabled>
              Select House Type
            </option>
            <option value="Single room">Single room</option>
            <option value="Self-contained">Self-contained</option>
            <option value="2 bedroom">2 bedroom</option>
            <option value="3 bedroom">3 bedroom</option>
          </select>
        </div>

        <div className="grid grid-cols-1  md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className={labelStyle}>Price per Year (₦)</label>
            <input
              name="price_per_year"
              type="number"
              defaultValue={apartment.price_per_year}
              className={inputStyle}
              required
            />
          </div>
          {/* Nearby School */}
          <div className="flex flex-col">
            <label className={labelStyle}>Nearby School</label>
            <select
              name="school"
              defaultValue={apartment.school}
              className={inputStyle}
              required
            >
              <option value="" disabled>
                Select School
              </option>
              <option value="Delta State University">
                Delta State University
              </option>
              <option value="Ambrose Ali University">
                Ambrose Ali University
              </option>
              <option value="University of Benin">University of Benin</option>
              <option value="University of Lagos">University of Lagos</option>
              <option value="Lagos State University">
                Lagos State University
              </option>
              <option value="Yaba College of Technology">
                Yaba College of Technology
              </option>
              <option value="Pan-Atlantic University">
                Pan-Atlantic University
              </option>
            </select>
          </div>
        </div>

        <div className="flex flex-col">
          <label className={labelStyle}>Full Address</label>
          <input
            name="address"
            defaultValue={apartment.address}
            className={inputStyle}
            required
          />
        </div>
        {/* toggle active or inactive */}
        <div className="flex flex-col">
          <label className={labelStyle}>Status</label>
          <select
            name="is_active"
            defaultValue={apartment.is_active ? "true" : "false"}
            className={inputStyle}
            required
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className={labelStyle}>Description</label>
          <textarea
            name="description"
            rows={4}
            defaultValue={apartment.description}
            className={`${inputStyle} resize-none`}
          />
        </div>
      </div>

      <button
        disabled={isPending}
        className="w-full bg-[#001F3F] text-white py-4 rounded-xl mt-8 font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Updating Details..." : "Update Apartment Details"}
      </button>
    </form>
  );
}
