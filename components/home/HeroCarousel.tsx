"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Timeless Elegance",
    subtitle: "New Embroidered Collection 2025",
    description: "Handcrafted with centuries of artisanship, every stitch tells a story of Pakistani heritage.",
    cta: "Shop Embroidered",
    ctaHref: "/collections/embroidered",
    secondaryCta: "Explore Collection",
    secondaryHref: "/collections/women",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1400&q=90",
    position: "left",
    accent: "Embroidered Collection",
  },
  {
    id: 2,
    title: "Winter Luxe",
    subtitle: "Premium Khaddar & Karandi",
    description: "Stay warm in the finest fabrics — rich textures and warm tones for the discerning woman.",
    cta: "Shop Winter",
    ctaHref: "/collections/khaddar",
    secondaryCta: "View Lookbook",
    secondaryHref: "/collections/khaddar",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1400&q=90",
    position: "right",
    accent: "Winter Collection",
  },
  {
    id: 3,
    title: "Men's Formal",
    subtitle: "Sherwanis & Waistcoat Sets",
    description: "From boardrooms to wedding halls — impeccably tailored men's formal wear for every occasion.",
    cta: "Shop Men's",
    ctaHref: "/collections/men",
    secondaryCta: "View Sherwanis",
    secondaryHref: "/collections/sherwani",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1400&q=90",
    position: "left",
    accent: "Men's Collection",
  },
  {
    id: 4,
    title: "Festive Celebrations",
    subtitle: "Eid & Wedding Collections",
    description: "Light up every celebration with our exclusively crafted festive ensembles.",
    cta: "Shop Festive",
    ctaHref: "/collections/formal",
    secondaryCta: "Explore All",
    secondaryHref: "/collections/women",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400&q=90",
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

  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
      {/* Background images */}
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
          {/* Overlay */}
          <div
            className={`absolute inset-0 ${
              s.position === "right"
                ? "bg-gradient-to-l from-charcoal/70 via-charcoal/40 to-transparent"
                : s.position === "center"
                ? "bg-charcoal/50"
                : "bg-gradient-to-r from-charcoal/70 via-charcoal/40 to-transparent"
            }`}
          />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div
            className={`max-w-xl ${
              slide.position === "right" ? "ml-auto text-right" : ""
            } ${slide.position === "center" ? "mx-auto text-center" : ""}`}
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
              className={`flex gap-4 ${
                slide.position === "right" ? "justify-end" : ""
              } ${slide.position === "center" ? "justify-center" : ""} flex-wrap`}
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
        </div>
      </div>

      {/* Navigation arrows */}
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

      {/* Dots */}
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

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 z-20 hidden md:flex flex-col items-center gap-2 text-ivory/50">
        <span className="font-inter text-[10px] uppercase tracking-widest rotate-90 origin-center">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-ivory/50 to-transparent" />
      </div>
    </section>
  );
}
