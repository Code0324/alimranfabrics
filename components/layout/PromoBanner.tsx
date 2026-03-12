"use client";

import { useState } from "react";
import { X, Truck } from "lucide-react";

export default function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="py-2.5 px-4 relative" style={{ backgroundColor: "#CC0000" }}>
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-sm">
        <Truck size={16} className="flex-shrink-0" style={{ color: "#FFFD82" }} />
        <span className="font-inter tracking-wide text-center" style={{ color: "#FFFD82" }}>
          <span className="font-semibold" style={{ color: "#FFFD82" }}>Free Shipping.</span> No Duty. No Drama.
          <span className="hidden sm:inline"> For USA Orders Only.</span>
        </span>
        <span className="hidden md:inline mx-2" style={{ color: "rgba(255,253,130,0.5)" }}>|</span>
        <span className="hidden md:inline" style={{ color: "rgba(255,253,130,0.85)" }}>Shop now & save up to 30% on new arrivals</span>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        aria-label="Dismiss banner"
        className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors hover:opacity-80"
        style={{ color: "#FFFD82" }}
      >
        <X size={16} />
      </button>
    </div>
  );
}
