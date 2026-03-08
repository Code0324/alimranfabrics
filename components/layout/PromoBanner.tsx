"use client";

import { useState } from "react";
import { X, Truck } from "lucide-react";

export default function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-emerald text-ivory py-2.5 px-4 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-sm">
        <Truck size={16} className="text-gold flex-shrink-0" />
        <span className="font-inter tracking-wide text-center">
          <span className="font-semibold text-gold">Free Shipping.</span> No Duty. No Drama.
          <span className="hidden sm:inline"> For USA Orders Only.</span>
        </span>
        <span className="hidden md:inline text-gold/60 mx-2">|</span>
        <span className="hidden md:inline text-ivory/80">Shop now & save up to 30% on new arrivals</span>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        aria-label="Dismiss banner"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-ivory/70 hover:text-ivory transition-colors"
      >
        <X size={16} />
      </button>
    </div>
  );
}
