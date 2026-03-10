import Link from "next/link";

interface RamadanSaleCardProps {
  discount?: string;
  ctaHref?: string;
  ctaLabel?: string;
}

export default function RamadanSaleCard({
  discount = "50%",
  ctaHref = "/collections",
  ctaLabel = "Shop the Sale",
}: RamadanSaleCardProps) {
  return (
    <section
      className="py-10 md:py-14 px-4"
      style={{ backgroundColor: "#FDFCF7" }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Card */}
        <div
          className="relative px-10 py-10 md:px-16 md:py-14 text-center overflow-hidden"
          style={{
            backgroundColor: "#0C1350",
            border: "1px solid rgba(255,230,0,0.45)",
          }}
        >
          {/* Art Deco corner brackets — top-left */}
          <span
            className="pointer-events-none absolute top-4 left-4 w-9 h-9 md:w-11 md:h-11"
            style={{
              borderTop: "2px solid #FFE600",
              borderLeft: "2px solid #FFE600",
            }}
            aria-hidden
          />
          {/* top-right */}
          <span
            className="pointer-events-none absolute top-4 right-4 w-9 h-9 md:w-11 md:h-11"
            style={{
              borderTop: "2px solid #FFE600",
              borderRight: "2px solid #FFE600",
            }}
            aria-hidden
          />
          {/* bottom-left */}
          <span
            className="pointer-events-none absolute bottom-4 left-4 w-9 h-9 md:w-11 md:h-11"
            style={{
              borderBottom: "2px solid #FFE600",
              borderLeft: "2px solid #FFE600",
            }}
            aria-hidden
          />
          {/* bottom-right */}
          <span
            className="pointer-events-none absolute bottom-4 right-4 w-9 h-9 md:w-11 md:h-11"
            style={{
              borderBottom: "2px solid #FFE600",
              borderRight: "2px solid #FFE600",
            }}
            aria-hidden
          />

          {/* Subtle diagonal gold dot pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #FFE600 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
            aria-hidden
          />

          {/* Content */}
          <div className="relative z-10">
            {/* Eyebrow */}
            <div className="flex items-center justify-center gap-4 mb-5">
              <span
                className="block h-px w-10 md:w-14"
                style={{ backgroundColor: "rgba(255,230,0,0.45)" }}
              />
              <span
                className="font-inter text-[10px] md:text-xs uppercase tracking-[0.35em]"
                style={{ color: "rgba(255,230,0,0.75)" }}
              >
                Limited Time
              </span>
              <span
                className="block h-px w-10 md:w-14"
                style={{ backgroundColor: "rgba(255,230,0,0.45)" }}
              />
            </div>

            {/* "Ramadan Festive" — Cormorant Garamond Italic */}
            <h2
              className="font-cormorant font-light italic leading-none mb-1 text-5xl md:text-6xl"
              style={{ color: "#FFE600", background: "transparent" }}
            >
              Ramadan Festive
            </h2>

            {/* "SALE" — Tenor Sans caps */}
            <p
              className="font-tenor uppercase tracking-[0.45em] text-base md:text-lg mt-3"
              style={{ color: "rgba(255,255,255,0.9)" }}
            >
              SALE
            </p>

            {/* Thin divider */}
            <div
              className="mx-auto my-4 w-16"
              style={{ height: "1px", backgroundColor: "rgba(255,230,0,0.35)" }}
            />

            {/* Discount callout */}
            <p
              className="font-cormorant font-medium text-4xl md:text-5xl"
              style={{ color: "#FFE600" }}
            >
              Upto {discount} Off
            </p>

            {/* CTA */}
            <div className="mt-8">
              <Link
                href={ctaHref}
                className="inline-block font-inter font-semibold text-xs uppercase tracking-widest
                           px-10 py-3.5 transition-all duration-300 hover:opacity-90 active:scale-95"
                style={{ backgroundColor: "#FFE600", color: "#0C1350" }}
              >
                {ctaLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
