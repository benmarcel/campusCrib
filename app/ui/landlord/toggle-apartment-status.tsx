"use client";

import { useTransition } from "react";
import { toggleApartmentStatus } from "@/lib/actions"; 
import { Loader2 } from "lucide-react";

export function StatusToggle({ id, isActive }: { id: string; isActive: boolean }) {
  const [isPending, startTransition] = useTransition();

 const handleToggle = () => {
  console.log("Button clicked"); // Check browser console
  startTransition(async () => {
    const result = await toggleApartmentStatus(id);
    if (result?.error) {
      console.error(result.error);
    } else {
      console.log("Success!");
    }
  });
};

  return (
    <div className="flex items-center gap-2">
      <button
        disabled={isPending}
        onClick={handleToggle}
        type="button"
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
          isActive ? "bg-green-500" : "bg-slate-300"
        } ${isPending ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <span
          className={`${
            isActive ? "translate-x-6" : "translate-x-1"
          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
        />
      </button>
      {isPending && <Loader2 className="h-3 w-3 animate-spin text-slate-400" />}
    </div>
  );
}