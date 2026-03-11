"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4">
        <AlertTriangle className="w-7 h-7 text-red-500" />
      </div>
      <h2 className="font-semibold text-[#1A1A1A] text-lg mb-2">Something went wrong</h2>
      <p className="text-[#6B6560] text-sm mb-6 max-w-sm">
        {error.message || "An unexpected error occurred loading this page."}
      </p>
      <button
        onClick={reset}
        className="px-5 py-2.5 text-sm font-semibold text-white rounded-lg transition hover:opacity-90"
        style={{ backgroundColor: "#B8963E" }}
      >
        Try Again
      </button>
    </div>
  );
}
