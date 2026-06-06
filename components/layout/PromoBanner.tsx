"use client";

import { useState } from "react";
import { X } from "lucide-react";

const messages = [
  "Worldwide Shipping Available",
  "Authentic Pakistani Craftsmanship",
  "New Arrivals Every Week",
  "30-Day Easy Returns",
  "Free Shipping on Orders Over PKR 5,000",
  "Worldwide Shipping Available",
  "Authentic Pakistani Craftsmanship",
  "New Arrivals Every Week",
  "30-Day Easy Returns",
  "Free Shipping on Orders Over PKR 5,000",
];

export default function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative overflow-hidden py-2" style={{ backgroundColor: "#0A0A0A" }}>
      {/* Scrolling marquee */}
      <div
        className="flex whitespace-nowrap animate-ticker"
        aria-label="Announcements"
      >
        {messages.map((msg, i) => (
          <span
            key={i}
            className="font-dm-sans text-xs font-normal tracking-[0.12em] text-white/90 px-8"
            aria-hidden={i >= messages.length / 2 || undefined}
          >
            {msg}
            <span className="mx-6 text-white/30">•</span>
          </span>
        ))}
      </div>

      <button
        onClick={() => setIsVisible(false)}
        aria-label="Dismiss banner"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
      >
        <X size={14} />
      </button>
    </div>
  );
}
