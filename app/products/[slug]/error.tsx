"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ProductError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => { console.error(error); }, [error]);

  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center px-4 pt-28">
      <div className="text-center max-w-md">
        <p className="font-inter text-xs uppercase tracking-[0.3em] font-bold mb-3" style={{ color: "#CC0000" }}>
          Error loading product
        </p>
        <h2 className="font-playfair text-3xl font-bold text-charcoal mb-4">Something went wrong</h2>
        <p className="font-inter text-charcoal/60 mb-8">Unable to load this product. Please try again.</p>
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="font-inter font-semibold text-sm uppercase tracking-wide px-6 py-3" style={{ backgroundColor: "#FFFD82", color: "#CC0000" }}>
            Try Again
          </button>
          <Link href="/collections/new-arrivals" className="font-inter font-semibold text-sm uppercase tracking-wide px-6 py-3 border border-charcoal text-charcoal hover:border-[#CC0000] hover:text-[#CC0000] transition">
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
