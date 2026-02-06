"use client";

import { useTransition, useRef, useState } from "react";
import { submitReview } from "@/lib/actions";
import Alert from "../components/Alert";
import {use} from "react";
export default function ReviewForm({ params }: { params: Promise<{ id: string }> }) {
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | null>(null);
  const { id: apartmentId } = use(params);
  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const result = await submitReview(formData);
      if (result.success) {
        formRef.current?.reset(); // Clear form on success
        setSuccess("Review submitted!");
      } else {
        setError(result.error);
      }
    });
  };


    return (
    <form
      ref={formRef}
      action={handleSubmit}
      className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm"
    >
        {error && (
        <Alert variant="error" message={error} />
      )}
      {success && (
        <Alert variant="success" message={success} />
      )}
      <h3 className="text-lg font-bold text-slate-900 mb-4">Leave a Review</h3>

      <input type="hidden" name="apartmentId" value={apartmentId} />

      {/* Rating Selection */}
      <div className="mb-4">
        <label className="text-sm font-medium text-slate-700 mb-2 block">
          Rating
        </label>
        <select
          name="rating"
          required
          className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-accent outline-none"
        >
          <option value="5">5 - Excellent</option>
          <option value="4">4 - Very Good</option>
          <option value="3">3 - Good</option>
          <option value="2">2 - Fair</option>
          <option value="1">1 - Poor</option>
        </select>
      </div>

      {/* Comment Area */}
      <div className="mb-6">
        <label className="text-sm font-medium text-slate-700 mb-2 block">
          Comment
        </label>
        <textarea
          name="comment"
          required
          placeholder="Share your experience staying here..."
          className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-50 min-h-[120px] focus:ring-2 focus:ring-accent outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-4 bg-primary text-white font-bold rounded-2xl hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {isPending ? "Submitting..." : "Post Review"}
      </button>
    </form>
  );
}
