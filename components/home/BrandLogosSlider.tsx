"use client";

import { useRef, MouseEvent as RMouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";

type Brand = {
  id: string;
  name: string;
  slug: string;
  /** Logo image path — null for text-based icons */
  logo: string | null;
  initials: string;
  /** Top colour of gradient */
  g1: string;
  /** Bottom colour of gradient */
  g2: string;
  /** true = light card (logo visible), false = dark card (white initials) */
  light: boolean;
};

const brands: Brand[] = [
  { id: "al-karam",    name: "Al-Karam",    slug: "al-karam",    logo: "/image/alkaram/03offwhite.png", initials: "AK", g1: "#FDF0E4", g2: "#EDD9C0", light: true  },
  { id: "mtj",         name: "MTJ",         slug: "mtj",         logo: "/image/brands/mtj.jpg",         initials: "MTJ",g1: "#F2F2F2", g2: "#DCDCDC", light: true  },
  { id: "khaadi",      name: "Khaadi",      slug: "khaadi",      logo: "/image/brands/khaadi.png",      initials: "KH", g1: "#FDFCF5", g2: "#EDE8D0", light: true  },
  { id: "j-junaid",    name: "J.",           slug: "j-junaid",    logo: "/image/brands/j..PNG",          initials: "J.", g1: "#F5F5F5", g2: "#E0E0E0", light: true  },
  { id: "sana-safinaz",name: "Sana Safinaz",slug: "sanasafinaz", logo: "/image/brands/Sana_Safinaz_logo.png", initials: "SS", g1: "#FAF5FF", g2: "#EDE0FF", light: true  },
  { id: "bin-saeed",   name: "Bin Saeed",   slug: "bin-saeed",   logo: null,                            initials: "BS", g1: "#1B6B40", g2: "#0A3D20", light: false },
  { id: "nishat",      name: "Nishat",      slug: "nishat",      logo: null,                            initials: "N",  g1: "#1E3A8A", g2: "#0C1350", light: false },
  { id: "sapphire",    name: "Sapphire",    slug: "sapphire",    logo: null,                            initials: "S",  g1: "#0369A1", g2: "#0A2040", light: false },
  { id: "salina",      name: "Salina",      slug: "salina",      logo: null,                            initials: "SL", g1: "#BE185D", g2: "#6B0A3A", light: false },
  { id: "tawakkal",    name: "Tawakkal",    slug: "tawakkal",    logo: null,                            initials: "TW", g1: "#9B1C1C", g2: "#4A0808", light: false },
];

const loopBrands = [...brands, ...brands];

/* ─── Layered drop-shadow that creates the "elevated card" depth ─── */
const restShadow = `
  0 2px 4px  rgba(0,0,0,0.12),
  0 4px 8px  rgba(0,0,0,0.10),
  0 8px 20px rgba(0,0,0,0.10),
  inset 0 1px 0 rgba(255,255,255,0.55),
  inset 0 -1px 0 rgba(0,0,0,0.15)
`;
const hoverShadow = `
  0 8px 16px  rgba(0,0,0,0.20),
  0 18px 36px rgba(0,0,0,0.18),
  0 32px 56px rgba(0,0,0,0.14),
  inset 0 1px 0 rgba(255,255,255,0.65),
  inset 0 -1px 0 rgba(0,0,0,0.20)
`;

function BrandIcon({ brand }: { brand: Brand }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: RMouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r  = el.getBoundingClientRect();
    const rx = (((e.clientY - r.top)  / r.height) - 0.5) * -26;
    const ry = (((e.clientX - r.left) / r.width)  - 0.5) *  26;
    el.style.transform = `perspective(500px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.10)`;
    el.style.boxShadow = hoverShadow;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(500px) rotateX(0deg) rotateY(0deg) scale(1)";
    el.style.boxShadow = restShadow;
  };

  return (
    <Link href={`/collections/${brand.slug}`} className="flex flex-col items-center gap-2 flex-shrink-0 select-none" draggable={false}>
      {/* ── Icon tile ── */}
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="brand-card relative w-[88px] h-[88px] overflow-hidden cursor-pointer"
        style={{
          borderRadius: "20px",
          background: `linear-gradient(150deg, ${brand.g1} 0%, ${brand.g2} 100%)`,
          boxShadow: restShadow,
        }}
      >
        {/* Gloss overlay — top half white sheen */}
        <div
          className="absolute inset-x-0 top-0 pointer-events-none z-10"
          style={{
            height: "52%",
            background: "linear-gradient(to bottom, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0) 100%)",
            borderRadius: "20px 20px 60% 60% / 20px 20px 40% 40%",
          }}
        />
        {/* Rim highlight */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            borderRadius: "20px",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.25)",
          }}
        />

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center z-0 p-2">
          {brand.logo ? (
            <div className="relative w-full h-full">
              <Image
                src={brand.logo}
                alt={brand.name}
                fill
                className="object-contain"
                sizes="88px"
                draggable={false}
              />
            </div>
          ) : (
            <span
              className="font-playfair font-bold leading-none select-none"
              style={{
                fontSize: brand.initials.length > 2 ? "22px" : "28px",
                color: "rgba(255,255,255,0.95)",
                textShadow: "0 1px 4px rgba(0,0,0,0.3)",
                letterSpacing: "-0.02em",
              }}
            >
              {brand.initials}
            </span>
          )}
        </div>
      </div>

      {/* Brand label below icon */}
      <span className="font-inter text-[10px] text-charcoal/55 uppercase tracking-widest text-center max-w-[88px] leading-tight">
        {brand.name}
      </span>
    </Link>
  );
}

export default function BrandLogosSlider() {
  return (
    <section className="py-12 md:py-16 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 mb-10 text-center">
        <div className="flex items-center justify-center gap-4 mb-2">
          <span className="w-12 h-px bg-gold" />
          <span className="font-inter text-gold text-xs uppercase tracking-[0.3em]">Shop by Brand</span>
          <span className="w-12 h-px bg-gold" />
        </div>
        <h2 className="section-title bg-transparent">Popular Brands</h2>
      </div>

      <div
        className="overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)",
        }}
      >
        <div className="brand-marquee items-end gap-6 px-10 pb-3">
          {loopBrands.map((brand, i) => (
            <BrandIcon key={`${brand.id}-${i}`} brand={brand} />
          ))}
        </div>
      </div>
    </section>
  );
}
