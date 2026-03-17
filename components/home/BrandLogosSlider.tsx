"use client";

import { useRef, MouseEvent as RMouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";

type Brand = {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  initials: string;
  accent: string;
  bg: string;
};

const brands: Brand[] = [
  {
    id: "al-karam",
    name: "Al-Karam",
    slug: "al-karam",
    logo: "/image/alkaram/03offwhite.png",
    initials: "AK",
    accent: "#6B3A2A",
    bg: "#FDF6EF",
  },
  {
    id: "mtj",
    name: "MTJ",
    slug: "mtj",
    logo: "/image/brands/mtj.jpg",
    initials: "MTJ",
    accent: "#1A1A1A",
    bg: "#FFFFFF",
  },
  {
    id: "khaadi",
    name: "Khaadi",
    slug: "khaadi",
    logo: "/image/brands/khaadi.png",
    initials: "KH",
    accent: "#2C2C2C",
    bg: "#FFFFFF",
  },
  {
    id: "j-junaid",
    name: "J.",
    slug: "j-junaid",
    logo: "/image/brands/j..PNG",
    initials: "J.",
    accent: "#1A1A1A",
    bg: "#FFFFFF",
  },
  {
    id: "sana-safinaz",
    name: "Sana Safinaz",
    slug: "sanasafinaz",
    logo: "/image/brands/Sana_Safinaz_logo.png",
    initials: "SS",
    accent: "#4A2C6B",
    bg: "#FFFFFF",
  },
  {
    id: "bin-saeed",
    name: "Bin Saeed",
    slug: "bin-saeed",
    logo: null,
    initials: "BS",
    accent: "#2C5F2E",
    bg: "#F2F8F2",
  },
  {
    id: "nishat",
    name: "Nishat",
    slug: "nishat",
    logo: null,
    initials: "N·",
    accent: "#0C1350",
    bg: "#F0F2FA",
  },
  {
    id: "sapphire",
    name: "Sapphire",
    slug: "sapphire",
    logo: null,
    initials: "S·",
    accent: "#0F3460",
    bg: "#EEF4FA",
  },
  {
    id: "salina",
    name: "Salina",
    slug: "salina",
    logo: null,
    initials: "SL",
    accent: "#5B3A2E",
    bg: "#FAF2ED",
  },
  {
    id: "tawakkal",
    name: "Tawakkal",
    slug: "tawakkal",
    logo: null,
    initials: "TW",
    accent: "#7D0A0A",
    bg: "#FAF0F0",
  },
];

// Duplicate for seamless infinite loop
const loopBrands = [...brands, ...brands];

function BrandCard({ brand }: { brand: Brand }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: RMouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r  = el.getBoundingClientRect();
    const x  = e.clientX - r.left;
    const y  = e.clientY - r.top;
    const cx = r.width  / 2;
    const cy = r.height / 2;
    const rx = ((y - cy) / cy) * -14;
    const ry = ((x - cx) / cx) *  14;
    el.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.08)`;
    el.style.boxShadow = `
      0 20px 40px rgba(0,0,0,0.14),
      0 8px 16px rgba(0,0,0,0.10),
      0 2px 4px rgba(0,0,0,0.06),
      inset 0 1px 0 rgba(255,255,255,0.9)
    `;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)";
    el.style.boxShadow = `
      0 4px 12px rgba(0,0,0,0.07),
      0 2px 4px rgba(0,0,0,0.05),
      inset 0 1px 0 rgba(255,255,255,0.8)
    `;
  };

  return (
    <Link href={`/collections/${brand.slug}`} className="block flex-shrink-0 select-none">
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="brand-card w-[148px] h-[100px] rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer overflow-hidden"
        style={{
          backgroundColor: brand.bg,
          boxShadow: `
            0 4px 12px rgba(0,0,0,0.07),
            0 2px 4px rgba(0,0,0,0.05),
            inset 0 1px 0 rgba(255,255,255,0.8)
          `,
          border: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        {brand.logo ? (
          /* Real logo */
          <div className="relative w-[110px] h-[70px]">
            <Image
              src={brand.logo}
              alt={brand.name}
              fill
              className="object-contain"
              sizes="110px"
              draggable={false}
            />
          </div>
        ) : (
          /* Monogram fallback */
          <div className="flex flex-col items-center gap-1">
            <span
              className="font-playfair font-bold leading-none"
              style={{ fontSize: "26px", color: brand.accent, letterSpacing: "-0.02em" }}
            >
              {brand.initials}
            </span>
            <span
              className="font-inter text-[9px] uppercase tracking-[0.2em]"
              style={{ color: brand.accent, opacity: 0.55 }}
            >
              {brand.name}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}

export default function BrandLogosSlider() {
  return (
    <section className="py-12 md:py-16 bg-ivory">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
        <div className="flex items-center justify-center gap-4 mb-2">
          <span className="w-12 h-px bg-gold" />
          <span className="font-inter text-gold text-xs uppercase tracking-[0.3em]">Shop by Brand</span>
          <span className="w-12 h-px bg-gold" />
        </div>
        <h2 className="section-title bg-transparent">Popular Brands</h2>
      </div>

      {/* Masked scrolling strip */}
      <div
        className="overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <div className="brand-marquee gap-5 px-8">
          {loopBrands.map((brand, i) => (
            <BrandCard key={`${brand.id}-${i}`} brand={brand} />
          ))}
        </div>
      </div>
    </section>
  );
}
