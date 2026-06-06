"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

// ── Types ──────────────────────────────────────────────────────────────────────

type LineKind = "text" | "premium-drop" | "sale-pill";

interface SlideLine {
  kind:   LineKind;
  text?:  string;
  cls?:   string;
  style?: React.CSSProperties;
}

type TextPosition = "bottom-left" | "bottom-right" | "center-left";

interface Slide {
  id:       number;
  image:    string;
  alt:      string;
  position: TextPosition;
  overlay:  "left" | "right" | "both";
  lines:    SlideLine[];
  link:     string;
}

// ── Slides data ────────────────────────────────────────────────────────────────

const SLIDES: Slide[] = [
  {
    id: 1,
    image: "/hero/cat-printed.jpg",
    alt: "Men's Collection",
    position: "bottom-left",
    overlay: "left",
    link: "/collections/men",
    lines: [
      { kind: "text", text: "The Final",     cls: "font-cormorant italic text-[38px] md:text-[52px] font-normal text-white" },
      { kind: "text", text: "Statement",     cls: "font-cormorant text-[64px] md:text-[88px] font-semibold text-white leading-none" },
      { kind: "text", text: "Collection'26", cls: "font-dm-sans text-[14px] md:text-[18px] tracking-[0.2em] text-white/80 mt-2" },
    ],
  },
  {
    id: 2,
    image: "/hero/chickenkar.jpg",
    alt: "Modest Wear",
    position: "bottom-right",
    overlay: "right",
    link: "/collections/modest-wear",
    lines: [
      { kind: "text", text: "NOIR ESSENCE", cls: "font-dm-sans text-[11px] md:text-[13px] uppercase tracking-[0.3em] text-white/70 mb-2" },
      { kind: "text", text: "Modest",       cls: "font-cormorant text-[65px] md:text-[90px] font-normal text-white leading-none" },
      { kind: "text", text: "WEAR",         cls: "font-dm-sans text-[22px] md:text-[28px] tracking-[0.5em] text-white/90 mt-1" },
      { kind: "text", text: "New Arrival",  cls: "font-cormorant italic text-[18px] md:text-[22px] text-white/80 mt-3" },
    ],
  },
  {
    id: 3,
    image: "/hero/printed.jpg",
    alt: "Kaftaan RTW Collection",
    position: "bottom-left",
    overlay: "left",
    link: "/collections/kaftaan-collection",
    lines: [
      { kind: "text", text: "rtw collection",         cls: "font-cormorant italic text-[18px] md:text-[22px] text-white/80" },
      { kind: "text", text: "Kaftaan",                cls: "font-cormorant text-[65px] md:text-[90px] font-semibold text-white leading-none" },
      { kind: "text", text: "SOFT, STYLISH, TIMELESS", cls: "font-dm-sans text-[11px] md:text-[13px] uppercase tracking-[0.3em] text-white/80 mt-3" },
    ],
  },
  {
    id: 4,
    image: "/hero/3_pices.jpg",
    alt: "Premium Cotton Linen",
    position: "bottom-left",
    overlay: "left",
    link: "/collections/cotton-linen",
    lines: [
      { kind: "text", text: "COTTON LINEN", cls: "font-dm-sans text-[11px] md:text-[13px] uppercase tracking-[0.4em] text-white/80" },
      { kind: "premium-drop" },
      { kind: "text", text: "Ready to Wear", cls: "font-cormorant italic text-[24px] md:text-[32px] text-white/90 mt-2" },
    ],
  },
  {
    id: 5,
    image: "/hero/cat-printed.jpg",
    alt: "Sale — Flat 40% Off",
    position: "center-left",
    overlay: "left",
    link: "/collections/sale",
    lines: [
      { kind: "text", text: "SALE",         cls: "font-dm-sans text-[72px] md:text-[100px] font-black text-white leading-none tracking-tight" },
      { kind: "text", text: "FLAT 40% OFF", cls: "font-dm-sans text-[30px] md:text-[42px] font-black leading-tight", style: { color: "#C9A96E" } },
      { kind: "text", text: "ENTIRE STOCK", cls: "font-dm-sans text-[12px] md:text-[16px] uppercase tracking-[0.4em] text-white/90 mt-2" },
      { kind: "sale-pill", text: "Flat $35 Shipping on $99+ Orders" },
      { kind: "text", text: "No Extra Duty Charges at Delivery", cls: "font-dm-sans text-[12px] md:text-[14px] font-semibold text-white mt-2" },
    ],
  },
  {
    id: 6,
    image: "/hero/khaadi_9.jpg",
    alt: "Kidswear Collection",
    position: "center-left",
    overlay: "left",
    link: "/collections/kids",
    lines: [
      { kind: "text", text: "kidswear",    cls: "font-dm-sans text-[55px] md:text-[80px] font-black text-white leading-none" },
      { kind: "text", text: "COLLECTION",  cls: "font-dm-sans text-[55px] md:text-[80px] font-black text-white leading-tight" },
      { kind: "text", text: "Little Adventures are live now", cls: "text-[22px] md:text-[28px] text-white/90 mt-3", style: { fontFamily: "'Dancing Script', cursive" } },
    ],
  },
];

// ── Framer Motion variants ─────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.08 } },
  exit:    { opacity: 0, transition: { duration: 0.25 } },
};

const lineVariants = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

// ── Individual line renderer ────────────────────────────────────────────────────

function SlideLineEl({ line }: { line: SlideLine }) {
  if (line.kind === "premium-drop") {
    return (
      <div className="flex items-end leading-none">
        <span className="font-cormorant text-[88px] md:text-[130px] font-bold text-white leading-none">P</span>
        <span className="font-cormorant text-[54px] md:text-[78px] font-bold text-white leading-none pb-2 md:pb-4">REMIUM</span>
      </div>
    );
  }
  if (line.kind === "sale-pill") {
    return (
      <div className="mt-4">
        <span className="inline-block bg-white text-[#1A1A1A] font-dm-sans text-[12px] md:text-[14px] font-medium px-5 md:px-6 py-2">
          {line.text}
        </span>
      </div>
    );
  }
  return <div className={line.cls} style={line.style}>{line.text}</div>;
}

// ── Position class map ─────────────────────────────────────────────────────────

const POSITION_CLS: Record<TextPosition, string> = {
  "bottom-left":  "absolute bottom-0 left-0 pb-14 md:pb-20 pl-8 md:pl-16 max-w-[90vw] md:max-w-2xl",
  "bottom-right": "absolute bottom-0 right-0 pb-14 md:pb-20 pr-8 md:pr-16 text-right max-w-[90vw] md:max-w-2xl",
  "center-left":  "absolute inset-y-0 left-0 flex flex-col justify-center pl-8 md:pl-16 max-w-[90vw] md:max-w-2xl",
};

// ── Main component ─────────────────────────────────────────────────────────────

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused,  setPaused]  = useState(false);
  const router  = useRouter();
  const isDrag  = useRef(false);
  const startX  = useRef(0);

  const goTo = useCallback((i: number) => setCurrent(i), []);
  const next = useCallback(() => setCurrent((p) => (p + 1) % SLIDES.length), []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next, paused]);

  // ── Drag / click detection ─────────────────────────────────────────────────
  const onStart = (x: number) => { startX.current = x; isDrag.current = false; };
  const onMove  = (x: number) => { if (Math.abs(x - startX.current) > 10) isDrag.current = true; };
  const onSlideClick = () => {
    if (isDrag.current) { isDrag.current = false; return; }
    router.push(SLIDES[current].link);
  };

  const slide = SLIDES[current];

  return (
    <section
      className="relative h-[50vh] md:h-[70vh] overflow-hidden bg-black cursor-pointer select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onMouseDown={(e)  => onStart(e.clientX)}
      onMouseMove={(e)  => onMove(e.clientX)}
      onClick={onSlideClick}
      onTouchStart={(e) => onStart(e.touches[0].clientX)}
      onTouchMove={(e)  => onMove(e.touches[0].clientX)}
    >
      {/* ── Background images — opacity crossfade ── */}
      {SLIDES.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-[800ms] ease-in-out ${i === current ? "opacity-100" : "opacity-0"}`}
        >
          <Image src={s.image} alt={s.alt} fill priority={i === 0} className="object-cover" style={{ objectPosition: "center top" }} sizes="100vw" />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/5" />
          {s.overlay === "left"  && <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-transparent" />}
          {s.overlay === "right" && <div className="absolute inset-0 bg-gradient-to-l from-black/55 via-black/15 to-transparent" />}
        </div>
      ))}

      {/* ── Text overlay ── */}
      <div className="relative z-10 h-full pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className={POSITION_CLS[slide.position]}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {slide.lines.map((line, i) => (
              <motion.div key={i} variants={lineVariants}>
                <SlideLineEl line={line} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Dot indicators — stopPropagation so dots don't trigger slide navigation ── */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); goTo(i); }}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-3 h-3 bg-white"
                : "w-2.5 h-2.5 bg-white/40 border border-white/60 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
