"use client";
import { saveApartment } from "@/lib/actions";

import { useTransition } from "react";
export function SaveApartment({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const handleSave = async () => {
    startTransition(() => {
      saveApartment(id);
    });
  };

  return (
    <button
      onClick={handleSave}
      disabled={isPending}
      type="button"
      className="flex h-10 items-center justify-center rounded-lg bg-[#003366] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span className="text-center text-sm">
        {isPending ? "Saving..." : "Save Apartment"}
      </span>
    </button>
  );
}