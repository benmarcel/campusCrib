"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type AlertVariant = "error" | "success" | "info" | "warning";

interface AlertProps {
  variant: AlertVariant;
  message: string | null | undefined;
  duration?: number; // milliseconds
  className?: string;
}

const variantStyles: Record<AlertVariant, string> = {
  error: "bg-red-50 border-red-100 text-red-600",
  success: "bg-green-50 border-green-100 text-green-600",
  info: "bg-blue-50 border-blue-100 text-blue-600",
  warning: "bg-yellow-50 border-yellow-100 text-yellow-700",
};

export default function Alert({
  variant,
  message,
  duration = 4000,
  className,
}: AlertProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!duration) return;

    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible || !message) return null;

  return (
    <div
      className={cn(
        "mb-6 p-4 rounded-xl border text-sm font-medium transition-opacity",
        variantStyles[variant],
        className
      )}
      role="alert"
    >
      {message}
    </div>
  );
}
