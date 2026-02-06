"use client";
import { useState, useActionState } from "react";
// import { createClient } from "@/lib/supabase/client";
// import { addListing, AddListingState } from "@/lib/actions";
import { uploadImages, addApartment, AddApartmentState } from "@/lib/actions";
export default function ListingForm() {
  const [files, setFiles] = useState<File[]>([]);

  async function wrappedAction(
    prevState: AddApartmentState,
    formData: FormData,
  ): Promise<AddApartmentState> {
    try {
      if (files.length === 0) {
        return { error: "Please select at least one image" };
      }

      // Upload using server action with service role
      const imageFormData = new FormData();
      files.forEach((file) => imageFormData.append("files", file));

      const imageUrls = await uploadImages(imageFormData);

      // Call the listing action
      return await addApartment(prevState, formData, imageUrls);
    } catch (err) {
      console.error("Error in listing action:", err);
      if (err instanceof Error && err.message.includes("NEXT_REDIRECT")) {
        throw err;
      }
      return { error: err instanceof Error ? err.message : String(err) };
    }
  }

  const [state, formAction, isPending] = useActionState<
    AddApartmentState,
    FormData
  >(wrappedAction, {});

  const inputStyle =
    "w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#001F3F] transition-all placeholder:text-gray-400 text-gray-700";
  const labelStyle = "block text-sm font-semibold text-blue-950 mb-1 ml-1";

  return (
    <form
      action={formAction}
      className="w-full max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
    >
      <h2 className="text-3xl font-bold text-center text-primary mb-8 uppercase tracking-tight">
        List Your Crib
      </h2>

      {/* Status Messages */}
      {state?.error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium">
          {state.error}
        </div>
      )}
      {state?.success && (
        <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-100 text-green-600 text-sm font-medium">
          {state.success}
        </div>
      )}

      <div className="space-y-5">
        {/* House Title */}
        <div className="flex flex-col">
          <label className={labelStyle}>House Title</label>
          <select name="title" className={inputStyle} required>
            <option value="" disabled selected>
              Select House Type
            </option>
            <option value="Single room">Single room</option>
            <option value="Self-contained">Self-contained</option>
            <option value="2 bedroom">2 bedroom</option>
            <option value="3 bedroom">3 bedroom</option>
          </select>
        </div>

        {/* Price & School - Two column layout on larger screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className={labelStyle}>Price per Year (₦)</label>
            <input
              name="price_per_year"
              type="number"
              placeholder="e.g, 120000"
              className={inputStyle}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className={labelStyle}>Nearby School</label>
            <select name="school" className={inputStyle} required>
              <option value="" disabled selected>
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

        {/* Address */}
        <div className="flex flex-col">
          <label className={labelStyle}>Full Address</label>
          <input
            name="address"
            placeholder="e.g, 123 Main St, Abraka"
            className={inputStyle}
            required
          />
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className={labelStyle}>Description</label>
          <textarea
            name="description"
            rows={4}
            placeholder="Tell students about the water, light, and security..."
            className={`${inputStyle} resize-none`}
          />
        </div>

        {/* File Upload Area */}
        <div className="flex flex-col">
          <label className={labelStyle}>Upload Crib Photos</label>
          <div className="relative group">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="w-full px-4 py-6 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center group-hover:border-[#001F3F] transition-colors">
              <span className="text-gray-500 text-sm">
                {files.length > 0
                  ? `${files.length} images selected`
                  : "Click to upload or drag images here"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <button
        disabled={isPending}
        className="w-full bg-[#001F3F] text-white py-4 rounded-xl mt-8 font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Uploading to Storage..." : "Post Listing"}
      </button>
    </form>
  );
}
