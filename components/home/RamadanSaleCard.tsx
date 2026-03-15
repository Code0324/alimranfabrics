import Link from "next/link";
import Image from "next/image";

export default function RamadanSaleCard() {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: "85vh" }}>

      {/* ── Background image ── */}
      <Image
        src="/image/categories/cat-embroidered.jpg"
        alt="Ramadan Festive Sale"
        fill
        className="object-cover object-center"
        priority
      />

      {/* ── Deep layered overlay: navy bottom, transparent top ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(7,13,56,0.45) 0%, rgba(7,13,56,0.82) 60%, rgba(7,13,56,0.96) 100%)",
        }}
      />

      {/* ── Subtle repeating diamond pattern ── */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #FFE500 0, #FFE500 1px, transparent 0, transparent 50%)",
          backgroundSize: "18px 18px",
        }}
        aria-hidden
      />

      {/* ── Corner art-deco brackets ── */}
      {[
        "top-6 left-6",
        "top-6 right-6",
        "bottom-6 left-6",
        "bottom-6 right-6",
      ].map((pos, i) => (
        <span
          key={i}
          className={`pointer-events-none absolute ${pos} w-12 h-12 md:w-16 md:h-16`}
          style={{
            borderTop:    i < 2  ? "2px solid rgba(255,230,0,0.6)" : undefined,
            borderBottom: i >= 2 ? "2px solid rgba(255,230,0,0.6)" : undefined,
            borderLeft:   i % 2 === 0 ? "2px solid rgba(255,230,0,0.6)" : undefined,
            borderRight:  i % 2 === 1 ? "2px solid rgba(255,230,0,0.6)" : undefined,
          }}
          aria-hidden
        />
      ))}

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-24 md:py-32 min-h-[85vh]">

        {/* Eyebrow */}
        <div className="flex items-center gap-5 mb-6">
          <span className="block h-px w-12 md:w-20" style={{ backgroundColor: "rgba(255,230,0,0.5)" }} />
          <span
            className="font-inter text-[10px] md:text-xs uppercase tracking-[0.4em]"
            style={{ color: "rgba(255,230,0,0.8)" }}
          >
            Ramadan 2026 — Limited Time
          </span>
          <span className="block h-px w-12 md:w-20" style={{ backgroundColor: "rgba(255,230,0,0.5)" }} />
        </div>

        {/* Main heading — Cormorant Garamond italic */}
        <h2
          className="font-cormorant italic font-light leading-none mb-2"
          style={{
            fontSize: "clamp(3.5rem, 10vw, 8rem)",
            color: "#FFE500",
            background: "transparent",
            textShadow: "0 4px 24px rgba(0,0,0,0.4)",
          }}
        >
          Ramadan Festive
        </h2>

        {/* SALE — Tenor Sans wide-tracked */}
        <p
          className="font-tenor uppercase mt-1 mb-6"
          style={{
            fontSize: "clamp(1rem, 3vw, 1.75rem)",
            letterSpacing: "0.55em",
            color: "rgba(255,255,255,0.88)",
          }}
        >
          SALE
        </p>

        {/* Gold horizontal rule */}
        <div
          className="w-24 md:w-36 mb-6"
          style={{ height: "1px", backgroundColor: "rgba(255,230,0,0.4)" }}
        />

        {/* Discount badge */}
        <div className="mb-3">
          <span
            className="font-cormorant font-semibold leading-none"
            style={{
              fontSize: "clamp(4rem, 14vw, 11rem)",
              color: "#FFE500",
              lineHeight: 1,
              textShadow: "0 8px 40px rgba(0,0,0,0.5)",
            }}
          >
            50%
          </span>
        </div>
        <p
          className="font-playfair font-medium mb-10"
          style={{
            fontSize: "clamp(1.1rem, 3vw, 1.75rem)",
            color: "rgba(255,255,255,0.7)",
            background: "transparent",
          }}
        >
          Off on Selected Pieces
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/collections/sale"
            className="inline-flex items-center gap-2 font-inter font-bold text-sm uppercase tracking-widest
                       px-10 py-4 transition-all duration-300 hover:scale-105 active:scale-95"
            style={{ backgroundColor: "#FFE500", color: "#070D38" }}
          >
            Shop the Sale
          </Link>
          <Link
            href="/collections/women"
            className="inline-flex items-center font-inter text-sm font-medium uppercase tracking-widest
                       px-10 py-4 border transition-all duration-300 hover:bg-white/10"
            style={{ borderColor: "rgba(255,230,0,0.5)", color: "rgba(255,255,255,0.85)" }}
          >
            Browse Collections
          </Link>
        </div>

        {/* Trust line */}
        <p
          className="mt-10 font-inter text-xs uppercase tracking-[0.25em]"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          Worldwide Shipping &nbsp;·&nbsp; Authentic Pakistani fashion
        </p>
      </div>
    </section>
  );
}
