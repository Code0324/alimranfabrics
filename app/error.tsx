"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
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
    <div className="min-h-screen bg-ivory flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="font-inter text-xs uppercase tracking-[0.3em] font-bold mb-3" style={{ color: "#CC0000" }}>
          Something went wrong
        </p>
        <h1 className="font-playfair text-4xl font-bold text-charcoal mb-4">
          Unexpected Error
        </h1>
        <p className="font-inter text-charcoal/60 mb-8">
          We ran into an issue loading this page. Please try again.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={reset}
            className="font-inter font-semibold text-sm uppercase tracking-wide px-6 py-3 transition hover:opacity-90"
            style={{ backgroundColor: "#FFE500", color: "#CC0000" }}
          >
            Try Again
          </button>
          <Link
            href="/"
            className="font-inter font-semibold text-sm uppercase tracking-wide px-6 py-3 border text-charcoal hover:border-[#CC0000] hover:text-[#CC0000] transition"
            style={{ borderColor: "#2C2C2C" }}
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
