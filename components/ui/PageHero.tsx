import Image from "next/image";
import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";
import { ReactNode } from "react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  /** Path from /public, e.g. "/image/women-banner-silk.png" */
  backgroundImage?: string;
  breadcrumbItems?: BreadcrumbItem[];
  /** Brand logo path — when provided, switches to clean brand header (no bg image, no glass) */
  brandLogo?: string;
  brandName?: string;
}

export default function PageHero({
  eyebrow,
  title,
  description,
  backgroundImage = "/image/women-banner-silk.png",
  breadcrumbItems,
  brandLogo,
  brandName,
}: PageHeroProps) {

  /* ── Brand logo variant — clean cream header, no image, no glass ── */
  if (brandLogo) {
    return (
      <section className="pt-28 md:pt-32 bg-[#f5f3ef] border-b border-[#e8e4da]">
        <div className="py-10 md:py-14 px-4 flex flex-col items-center text-center">

          {/* Brand logo */}
          <div className="relative mb-5" style={{ width: "220px", height: "90px" }}>
            <Image
              src={brandLogo}
              alt={brandName ?? String(title)}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Gold divider */}
          <div className="w-12 h-px bg-gold mb-4" />

          {/* Eyebrow */}
          {eyebrow && (
            <span className="font-inter text-[10px] uppercase tracking-[0.35em] font-semibold text-gold mb-2">
              {eyebrow}
            </span>
          )}

          {/* Description */}
          {description && (
            <p className="font-inter text-xs text-charcoal/50 max-w-sm leading-relaxed mt-1">
              {description}
            </p>
          )}

          {/* Breadcrumb */}
          {breadcrumbItems && breadcrumbItems.length > 0 && (
            <nav
              aria-label="Breadcrumb"
              className="mt-4 flex items-center justify-center flex-wrap gap-y-1 font-inter text-xs text-charcoal/40"
            >
              <Link href="/" className="flex items-center gap-1 hover:text-charcoal transition-colors">
                <Home size={11} />
                <span className="hidden sm:inline">Home</span>
              </Link>
              {breadcrumbItems.map((item, i) => (
                <span key={i} className="flex items-center gap-1">
                  <ChevronRight size={11} className="text-charcoal/20" />
                  {item.href && i < breadcrumbItems.length - 1 ? (
                    <Link href={item.href} className="hover:text-charcoal transition-colors">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="font-semibold text-charcoal/70">{item.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}
        </div>
      </section>
    );
  }

  /* ── Default variant — background image + glass ── */
  return (
    <section className="relative overflow-hidden pt-28 md:pt-32">
      {/* Background image */}
      <Image
        src={backgroundImage}
        alt=""
        fill
        className="object-cover object-center"
        priority
        aria-hidden
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: "rgba(5, 0, 0, 0.55)" }}
        aria-hidden
      />

      {/* Red-tinted gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(204,0,0,0.42) 0%, transparent 52%), " +
            "linear-gradient(to top, rgba(0,0,0,0.28) 0%, transparent 40%)",
        }}
        aria-hidden
      />

      {/* Content */}
      <div className="relative py-14 md:py-20 px-4 flex items-center justify-center">
        <div
          className="text-center w-full max-w-2xl mx-auto px-8 py-10 md:px-12"
          style={{
            background: "rgba(204, 0, 0, 0.12)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: "1px solid rgba(204, 0, 0, 0.40)",
            boxShadow:
              "0 8px 32px rgba(0, 0, 0, 0.35), " +
              "inset 0 1px 0 rgba(255, 255, 255, 0.10), " +
              "0 0 40px rgba(204, 0, 0, 0.10)",
          }}
        >
          {eyebrow && (
            <div className="flex items-center justify-center gap-4 mb-3">
              <span className="w-10 h-px" style={{ backgroundColor: "rgba(255,253,130,0.65)" }} />
              <span className="font-inter text-[10px] uppercase tracking-[0.35em] font-bold" style={{ color: "#FFE500" }}>
                {eyebrow}
              </span>
              <span className="w-10 h-px" style={{ backgroundColor: "rgba(255,253,130,0.65)" }} />
            </div>
          )}

          <h1
            className="font-playfair text-4xl md:text-5xl font-bold leading-tight"
            style={{ color: "#FFFFFF", textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}
          >
            {title}
          </h1>

          <div
            className="mx-auto mt-4 w-16"
            style={{ height: "2px", background: "linear-gradient(to right, transparent, #CC0000, transparent)" }}
          />

          {description && (
            <p className="font-inter text-sm max-w-md mx-auto leading-relaxed mt-4" style={{ color: "rgba(255,255,255,0.82)" }}>
              {description}
            </p>
          )}

          {breadcrumbItems && breadcrumbItems.length > 0 && (
            <nav
              aria-label="Breadcrumb"
              className="mt-5 flex items-center justify-center flex-wrap gap-y-1 font-inter text-xs"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              <Link href="/" className="flex items-center gap-1 transition-colors hover:text-white">
                <Home size={11} />
                <span className="hidden sm:inline">Home</span>
              </Link>
              {breadcrumbItems.map((item, i) => (
                <span key={i} className="flex items-center gap-1">
                  <ChevronRight size={11} style={{ color: "rgba(255,255,255,0.30)" }} />
                  {item.href && i < breadcrumbItems.length - 1 ? (
                    <Link href={item.href} className="transition-colors hover:text-white">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="font-medium" style={{ color: "rgba(255,253,130,0.90)" }}>
                      {item.label}
                    </span>
                  )}
                </span>
              ))}
            </nav>
          )}
        </div>
      </div>
    </section>
  );
}
