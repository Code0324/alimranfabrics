"use client";

import { useRef, useState, MouseEvent as RMouseEvent } from "react";
import Link from "next/link";

type Brand = {
  id: string;
  name: string;
  slug: string;
  /** External logo URL — null = show monogram */
  logoUrl: string | null;
  initials: string;
  g1: string;
  g2: string;
};

const brands: Brand[] = [
  {
    id: "khaadi",
    name: "Khaadi",
    slug: "khaadi",
    logoUrl: "https://us.khaadi.com/on/demandware.static/-/Library-Sites-KhaadiSharedLibrary/default/dwb33579b0/images/logo/logo.svg",
    initials: "KH",
    g1: "#1B6B3A",
    g2: "#0A3D20",
  },
  {
    id: "j-junaid",
    name: "J.",
    slug: "j-junaid",
    logoUrl: "https://us.junaidjamshed.com/cdn/shop/files/Logo-001_200x.png?v=1643008368",
    initials: "J.",
    g1: "#1E3A8A",
    g2: "#0C1350",
  },
  {
    id: "sana-safinaz",
    name: "Sana Safinaz",
    slug: "sanasafinaz",
    logoUrl: "https://sanasafinaz.com/cdn/shop/files/Logo_300x.webp?v=1748932269",
    initials: "SS",
    g1: "#6B2FA0",
    g2: "#3A0D6B",
  },
  {
    id: "nishat",
    name: "Nishat Linen",
    slug: "nishat",
    logoUrl: "https://nishat.net/images/sampledata/site-logo.png",
    initials: "NL",
    g1: "#1E3A8A",
    g2: "#0A1563",
  },
  {
    id: "gul-ahmed",
    name: "Gul Ahmed",
    slug: "gul-ahmed",
    logoUrl: "https://www.gulahmedshop.com/cdn/shop/files/logo_150x.svg?v=1758024576",
    initials: "GA",
    g1: "#1B6B3A",
    g2: "#0A3D20",
  },
  {
    id: "al-karam",
    name: "Al-Karam",
    slug: "al-karam",
    logoUrl: "/image/brands/alkaram.png",
    initials: "AK",
    g1: "#C8780A",
    g2: "#7A3A00",
  },
  {
    id: "mtj",
    name: "MTJ",
    slug: "mtj",
    logoUrl: "/image/brands/MTJ.png",
    initials: "MTJ",
    g1: "#3A3A3A",
    g2: "#111111",
  },
  {
    id: "sapphire",
    name: "Sapphire",
    slug: "sapphire",
    logoUrl: "/image/brands/sapphire.png",
    initials: "S",
    g1: "#0369A1",
    g2: "#0A2040",
  },
  {
    id: "zellbury",
    name: "Zellbury",
    slug: "zellbury",
    logoUrl: "/image/brands/zellbury.png",
    initials: "ZB",
    g1: "#7C3D8B",
    g2: "#3A0D6B",
  },
  {
    id: "bin-saeed",
    name: "Bin Saeed",
    slug: "bin-saeed",
    logoUrl: "/image/brands/binsaeed.png",
    initials: "BS",
    g1: "#166534",
    g2: "#052E16",
  },
];

const loopBrands = [...brands, ...brands];

const restShadow = `
  0 2px 6px  rgba(0,0,0,0.07),
  0 6px 16px rgba(0,0,0,0.06),
  inset 0 1px 0 rgba(255,255,255,0.85)
`;
const hoverShadow = `
  0 8px 20px  rgba(0,0,0,0.13),
  0 20px 40px rgba(0,0,0,0.10),
  inset 0 1px 0 rgba(255,255,255,0.9)
`;

function BrandIcon({ brand }: { brand: Brand }) {
  const ref = useRef<HTMLDivElement>(null);
  const [imgFailed, setImgFailed] = useState(false);
  const showLogo = brand.logoUrl && !imgFailed;

  const onMove = (e: RMouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r  = el.getBoundingClientRect();
    const rx = (((e.clientY - r.top)  / r.height) - 0.5) * -22;
    const ry = (((e.clientX - r.left) / r.width)  - 0.5) *  22;
    el.style.transform = `perspective(500px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-5px) scale(1.07)`;
    el.style.boxShadow = hoverShadow;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
    el.style.boxShadow = restShadow;
  };

  return (
    <Link
      href={`/collections/${brand.slug}`}
      className="flex flex-col items-center gap-2 flex-shrink-0 select-none"
      draggable={false}
    >
      {/* Icon tile */}
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="brand-card relative w-[120px] h-[80px] overflow-hidden cursor-pointer flex items-center justify-center"
        style={{
          borderRadius: "16px",
          background: showLogo
            ? "#ffffff"
            : `linear-gradient(150deg, ${brand.g1} 0%, ${brand.g2} 100%)`,
          boxShadow: restShadow,
          border: "1px solid rgba(0,0,0,0.05)",
          padding: showLogo ? "12px 14px" : "0",
        }}
      >
        {/* Gloss sheen */}
        <div
          className="absolute inset-x-0 top-0 pointer-events-none z-10"
          style={{
            height: "52%",
            background: "linear-gradient(to bottom, rgba(255,255,255,0.40) 0%, rgba(255,255,255,0) 100%)",
            borderRadius: "16px 16px 60% 60% / 16px 16px 40% 40%",
          }}
        />
        {/* Rim */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            borderRadius: "16px",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.22)",
          }}
        />

        {showLogo ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={brand.logoUrl!}
            alt={brand.name}
            draggable={false}
            onError={() => setImgFailed(true)}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              display: "block",
              position: "relative",
              zIndex: 0,
            }}
          />
        ) : (
          <div className="flex flex-col items-center gap-0.5 relative z-0">
            <span
              className="font-playfair font-bold leading-none"
              style={{
                fontSize: brand.initials.length > 2 ? "20px" : "26px",
                color: "rgba(255,255,255,0.95)",
                textShadow: "0 1px 4px rgba(0,0,0,0.28)",
                letterSpacing: "-0.02em",
              }}
            >
              {brand.initials}
            </span>
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "8px",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.60)",
              }}
            >
              {brand.name}
            </span>
          </div>
        )}
      </div>

      {/* Label below tile */}
      <span
        className="font-inter text-center leading-tight"
        style={{
          fontSize: "10px",
          fontWeight: 600,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(44,44,44,0.48)",
          maxWidth: "120px",
        }}
      >
        {brand.name}
      </span>
    </Link>
  );
}

export default function BrandLogosSlider() {
  return (
    <section className="py-12 md:py-16" style={{ background: "#f5f3ef" }}>
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 mb-10 text-center">
        <div className="flex items-center justify-center gap-4 mb-2">
          <span className="w-12 h-px bg-gold" />
          <span className="font-inter text-gold text-xs uppercase tracking-[0.3em]">Shop by Brand</span>
          <span className="w-12 h-px bg-gold" />
        </div>
        <h2 className="section-title bg-transparent">Popular Brands</h2>
      </div>

      {/* Masked infinite marquee */}
      <div
        className="overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)",
        }}
      >
        <div className="brand-marquee items-end gap-5 px-10 pb-3">
          {loopBrands.map((brand, i) => (
            <BrandIcon key={`${brand.id}-${i}`} brand={brand} />
          ))}
        </div>
      </div>
    </section>
  );
}
