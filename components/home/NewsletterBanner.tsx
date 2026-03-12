"use client";

import { useState } from "react";

export default function NewsletterBanner() {
  const [email, setEmail] = useState("");

  return (
    <section className="py-14 px-4" style={{ backgroundColor: "#CC0000" }}>
      <div className="max-w-2xl mx-auto text-center">

        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="w-10 h-px" style={{ backgroundColor: "#FFFD82" }} />
          <span
            className="font-inter text-[10px] uppercase tracking-[0.35em] font-bold"
            style={{ color: "#FFFD82" }}
          >
            Exclusive Members
          </span>
          <span className="w-10 h-px" style={{ backgroundColor: "#FFFD82" }} />
        </div>

        {/* Heading */}
        <h2
          className="font-playfair text-3xl md:text-4xl font-bold mb-3 bg-transparent"
          style={{ color: "#ffffff" }}
        >
          Join the <span style={{ color: "#FFFD82" }}>Al Imran</span> Family
        </h2>

        {/* Subtext */}
        <p className="font-inter text-sm md:text-base mb-2 font-medium" style={{ color: "rgba(255,255,255,0.9)" }}>
          Subscribe for exclusive deals, new collection launches, and cultural inspiration.
        </p>
        <p className="font-inter text-xs mb-8" style={{ color: "rgba(255,253,130,0.8)" }}>
          Join 12,000+ subscribers. Unsubscribe anytime.
        </p>

        {/* Form */}
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="flex-1 px-4 py-3 font-inter text-sm focus:outline-none transition-colors"
            style={{
              backgroundColor: "#ffffff",
              border: "2px solid #FFFD82",
              color: "#0C1350",
            }}
          />
          <button
            className="px-7 py-3 whitespace-nowrap font-inter font-bold text-sm uppercase tracking-widest transition-all duration-300 hover:opacity-90 active:scale-95"
            style={{ backgroundColor: "#FFFD82", color: "#0C1350", borderRadius: "8px" }}
          >
            Subscribe
          </button>
        </div>

        {/* Fine print */}
        <p className="font-inter text-xs mt-4" style={{ color: "rgba(255,253,130,0.7)" }}>
          No spam, ever. Unsubscribe anytime.
        </p>

      </div>
    </section>
  );
}
