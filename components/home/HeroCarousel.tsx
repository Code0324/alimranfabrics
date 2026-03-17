"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = {
  id: number;
  type?: "sale";
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  ctaHref: string;
  secondaryCta: string;
  secondaryHref: string;
  image: string;
  position: "left" | "right" | "center";
  accent: string;
};

const slides: Slide[] = [
  {
    id: 1,
    title: "Timeless Elegance",
    subtitle: "New Embroidered Collection 2026",
    description: "Handcrafted with centuries of artisanship, every stitch tells a story of Pakistani heritage.",
    cta: "Shop Embroidered",
    ctaHref: "/collections/embroidered",
    secondaryCta: "Explore Collection",
    secondaryHref: "/collections/stitched",
    image: "/image/categories/cat-embroidered.jpg",
    position: "left",
    accent: "Embroidered Collection",
  },
  {
    id: 2,
    type: "sale",
    title: "Ramadan Festive",
    subtitle: "Limited Time — Up to 50% Off",
    description: "Celebrate the holy month in style. Handcrafted Pakistani ensembles at exclusive Ramadan prices.",
    cta: "Shop the Sale",
    ctaHref: "/collections/sale",
    secondaryCta: "Browse All",
    secondaryHref: "/collections/stitched",
    image: "/image/categories/cat-luxury.jpg",
    position: "center",
    accent: "Ramadan 2026 Sale",
  },
  {
    id: 3,
    title: "Summer Luxe",
    subtitle: "Printed Lawn Collection 2026",
    description: "Light, breezy, and beautifully printed — our summer lawn collection is here to define your season.",
    cta: "Shop Now",
    ctaHref: "/collections/printed",
    secondaryCta: "View Collection",
    secondaryHref: "/collections/new-arrivals",
    image: "/image/summer.png",
    position: "right",
    accent: "Summer Collection",
  },
  {
    id: 4,
    title: "Men's Collection",
    subtitle: "Shalwar Kameez & Kurta Pajama",
    description: "From boardrooms to wedding halls — impeccably tailored men's traditional wear for every occasion.",
    cta: "Shop Men's",
    ctaHref: "/collections/men",
    secondaryCta: "View Men's",
    secondaryHref: "/collections/shalwar-kameez",
    image: "/image/categories/cat-men-formal.jpg",
    position: "left",
    accent: "Men's Collection",
  },
  {
    id: 5,
    title: "Festive Celebrations",
    subtitle: "Eid & Wedding Collections",
    description: "Light up every celebration with our exclusively crafted festive ensembles.",
    cta: "Shop Festive",
    ctaHref: "/collections/event-ready",
    secondaryCta: "Explore All",
    secondaryHref: "/collections/stitched",
    image: "/image/categories/cat-bridal.jpg",
    position: "center",
    accent: "Festive Collection",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback((index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent(index);
    setTimeout(() => setIsAnimating(false), 700);
  }, [isAnimating]);

  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);

  useEffect(() => {
    const interval = setInterval(next, 5500);
    return () => clearInterval(interval);
  }, [next]);

  const slide = slides[current];
  const isSale = slide.type === "sale";

  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">

      {/* ── Background images ── */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={s.image}
            alt={s.title}
            fill
            priority={i === 0}
            className="object-cover object-top"
            sizes="100vw"
          />

          {/* Overlay — warm gold-tinted for sale slide, standard dark for others */}
          {s.type === "sale" ? (
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(7,13,56,0.88) 0%, rgba(12,19,80,0.75) 50%, rgba(201,168,76,0.25) 100%)",
              }}
            />
          ) : (
            <div
              className={`absolute inset-0 ${
                s.position === "right"
                  ? "bg-gradient-to-l from-charcoal/70 via-charcoal/40 to-transparent"
                  : s.position === "center"
                  ? "bg-charcoal/50"
                  : "bg-gradient-to-r from-charcoal/70 via-charcoal/40 to-transparent"
              }`}
            />
          )}
        </div>
      ))}

      {/* ── Content ── */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">

          {isSale ? (
            /* ── Sale slide — classical gold layout ── */
            <div className="mx-auto max-w-2xl text-center">

              {/* Ornamental top rule */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="w-16 h-px" style={{ backgroundColor: "rgba(201,168,76,0.5)" }} />
                <span
                  className="font-inter text-[10px] uppercase tracking-[0.45em]"
                  style={{ color: "#C9A84C" }}
                >
                  {slide.accent}
                </span>
                <span className="w-16 h-px" style={{ backgroundColor: "rgba(201,168,76,0.5)" }} />
              </div>

              {/* Sub-label */}
              <p
                key={`sale-sub-${current}`}
                className="font-inter text-xs uppercase tracking-[0.3em] mb-4 animate-slide-up"
                style={{ color: "rgba(201,168,76,0.8)" }}
              >
                {slide.subtitle}
              </p>

              {/* Main title — large Cormorant italic */}
              <h1
                key={`sale-title-${current}`}
                className="font-cormorant italic font-light leading-none animate-slide-up"
                style={{
                  fontSize: "clamp(3.5rem, 8vw, 6.5rem)",
                  color: "#FAF7F2",
                  background: "transparent",
                  textShadow: "0 2px 20px rgba(0,0,0,0.3)",
                }}
              >
                {slide.title}
              </h1>

              {/* Gold ornament */}
              <div className="flex items-center justify-center gap-3 my-5">
                <span className="w-10 h-px" style={{ backgroundColor: "#C9A84C" }} />
                <span style={{ color: "#C9A84C", fontSize: "1rem" }}>✦</span>
                <span className="w-10 h-px" style={{ backgroundColor: "#C9A84C" }} />
              </div>

              {/* Discount — Playfair bold gold */}
              <p
                key={`sale-disc-${current}`}
                className="font-playfair font-bold animate-slide-up"
                style={{
                  fontSize: "clamp(4rem, 12vw, 9rem)",
                  lineHeight: 1,
                  color: "#C9A84C",
                  textShadow: "0 4px 30px rgba(201,168,76,0.35)",
                  background: "transparent",
                }}
              >
                50%
              </p>
              <p
                className="font-tenor uppercase tracking-[0.3em] text-sm mt-2 mb-4"
                style={{ color: "rgba(250,247,242,0.65)" }}
              >
                Off Selected Pieces
              </p>

              {/* Description */}
              <p
                key={`sale-desc-${current}`}
                className="font-inter text-sm leading-relaxed mb-8 max-w-md mx-auto animate-slide-up"
                style={{ color: "rgba(250,247,242,0.65)" }}
              >
                {slide.description}
              </p>

              {/* CTAs */}
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <Link
                  href={slide.ctaHref}
                  className="inline-block font-inter font-bold text-xs uppercase tracking-widest px-10 py-3.5 transition-all duration-300 hover:opacity-90"
                  style={{ backgroundColor: "#FFE500", color: "#CC0000" }}
                >
                  {slide.cta}
                </Link>
                <Link
                  href={slide.secondaryHref}
                  className="inline-flex items-center font-inter text-xs font-medium uppercase tracking-widest px-8 py-3.5 border transition-all duration-300 hover:bg-white/10"
                  style={{ borderColor: "rgba(255,255,255,0.5)", color: "rgba(250,247,242,0.85)" }}
                >
                  {slide.secondaryCta}
                </Link>
              </div>
            </div>

          ) : (
            /* ── Standard slide layout ── */
            <div
              className={`max-w-xl ${slide.position === "right" ? "ml-auto text-right" : ""} ${
                slide.position === "center" ? "mx-auto text-center" : ""
              }`}
            >
              {/* Accent label */}
              <div
                className={`flex items-center gap-3 mb-4 ${
                  slide.position === "right" ? "justify-end" : ""
                } ${slide.position === "center" ? "justify-center" : ""}`}
              >
                <span className="w-8 h-px bg-gold" />
                <span className="font-inter text-gold text-xs uppercase tracking-[0.3em]">
                  {slide.accent}
                </span>
                <span className="w-8 h-px bg-gold" />
              </div>

              <p
                key={`subtitle-${current}`}
                className="font-inter text-ivory/80 text-sm uppercase tracking-widest mb-3 animate-slide-up"
              >
                {slide.subtitle}
              </p>

              <h1
                key={`title-${current}`}
                className="font-playfair text-ivory text-5xl md:text-7xl font-bold leading-tight mb-5 animate-slide-up"
              >
                {slide.title}
              </h1>

              <p
                key={`desc-${current}`}
                className="font-inter text-ivory/70 text-base md:text-lg leading-relaxed mb-8 animate-slide-up"
              >
                {slide.description}
              </p>

              <div
                className={`flex gap-4 ${slide.position === "right" ? "justify-end" : ""} ${
                  slide.position === "center" ? "justify-center" : ""
                } flex-wrap`}
              >
                <Link href={slide.ctaHref} className="btn-gold">
                  {slide.cta}
                </Link>
                <Link
                  href={slide.secondaryHref}
                  className="inline-flex items-center gap-2 font-inter text-sm font-medium uppercase tracking-wide
                             text-ivory border border-ivory/50 px-6 py-3 hover:border-gold hover:text-gold transition-all duration-300"
                >
                  {slide.secondaryCta}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Navigation arrows ── */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20
                   w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm
                   flex items-center justify-center text-ivory transition-all duration-200 border border-white/20"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20
                   w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm
                   flex items-center justify-center text-ivory transition-all duration-200 border border-white/20"
      >
        <ChevronRight size={20} />
      </button>

      {/* ── Dots ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`transition-all duration-300 ${
              i === current
                ? "w-8 h-1.5 bg-gold"
                : "w-1.5 h-1.5 bg-ivory/40 hover:bg-ivory/70 rounded-full"
            }`}
          />
        ))}
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-8 right-8 z-20 hidden md:flex flex-col items-center gap-2 text-ivory/50">
        <span className="font-inter text-[10px] uppercase tracking-widest rotate-90 origin-center">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-ivory/50 to-transparent" />
      </div>
    </section>
  );
}
