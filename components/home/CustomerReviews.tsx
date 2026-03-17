"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Fatima A.",
    title: "Absolutely stunning fabric!",
    text: "The quality is unmatched, soft and elegant. Will definitely reorder.",
    rating: 5,
    image: "/image/alkaram/03offwhite.png",
  },
  {
    id: 2,
    name: "Sara Khan",
    title: "Beautiful 😍",
    text: "Perfect for formal wear, love the colours. Delivery was fast too.",
    rating: 5,
    image: "/image/embroiderd/white.jpg",
  },
  {
    id: 3,
    name: "Anonymous",
    title: "Great purchase",
    text: "Love the texture and stitching quality. Highly recommend!",
    rating: 5,
    image: "/image/MTJ/bluelight.jpg",
  },
  {
    id: 4,
    name: "Aisha M.",
    title: "Exceeded expectations!",
    text: "The colour is even richer in person. Already placed my second order.",
    rating: 5,
    image: "/image/alkaram/54pink.png",
  },
  {
    id: 5,
    name: "Zara H.",
    title: "Premium quality",
    text: "Consistent quality, fast shipping, and embroidery work is flawless.",
    rating: 5,
    image: "/image/embroiderd/rust.jpg",
  },
  {
    id: 6,
    name: "Nadia R.",
    title: "My go-to store",
    text: "Authentic brands, genuine products — this is the only place I shop.",
    rating: 5,
    image: "/image/MTJ/greenblk.jpg",
  },
];

// Half-star aware row: supports .5 ratings
function StarRow({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < Math.floor(rating);
        const half   = !filled && i < rating;
        return (
          <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
            {/* background star (empty) */}
            <Star
              size={size}
              className="absolute inset-0 text-charcoal/20 fill-charcoal/20"
            />
            {/* foreground star: full or half */}
            {(filled || half) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: half ? "50%" : "100%" }}
              >
                <Star size={size} className="text-[#C9A84C] fill-[#C9A84C]" />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

export default function CustomerReviews() {
  const [page, setPage] = useState(0);
  const perPage  = 3;
  const total    = Math.ceil(reviews.length / perPage);
  const visible  = reviews.slice(page * perPage, page * perPage + perPage);

  const prev = () => setPage((p) => (p - 1 + total) % total);
  const next = () => setPage((p) => (p + 1) % total);

  return (
    <section className="py-14 md:py-20 px-4 bg-white">
      {/* Constrained narrow column */}
      <div className="max-w-[700px] mx-auto">

        {/* Heading */}
        <div className="text-center mb-5">
          <h2 className="font-playfair text-2xl md:text-3xl font-bold text-charcoal bg-transparent mb-3">
            You Said It, Not Us&nbsp;👀
          </h2>
          {/* Overall rating row */}
          <div className="flex items-center justify-center gap-2">
            <StarRow rating={4.5} size={16} />
            <span className="font-inter text-sm font-semibold text-charcoal">4.5</span>
            <span className="font-inter text-xs text-charcoal/40">from 150 reviews</span>
          </div>
        </div>

        {/* Cards row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {visible.map((r) => (
            <div
              key={r.id}
              className="bg-white border border-[#ece9e0] p-3 flex flex-col gap-2"
            >
              {/* Image + stars in a row */}
              <div className="flex items-start gap-3">
                <div className="relative w-[72px] h-[72px] flex-shrink-0 bg-[#f8f7f3] overflow-hidden">
                  <Image
                    src={r.image}
                    alt={r.title}
                    fill
                    className="object-contain p-1"
                    sizes="72px"
                  />
                </div>
                <div className="flex flex-col gap-1 pt-0.5">
                  <StarRow rating={r.rating} size={11} />
                  <p className="font-inter font-semibold text-[11px] text-charcoal leading-tight">
                    {r.title}
                  </p>
                </div>
              </div>

              {/* Review text */}
              <p className="font-inter text-[11px] text-charcoal/55 leading-relaxed line-clamp-3">
                &ldquo;{r.text}&rdquo;
              </p>

              {/* Reviewer name */}
              <p className="font-inter text-[10px] font-semibold text-charcoal/40 uppercase tracking-widest">
                — {r.name}
              </p>
            </div>
          ))}
        </div>

        {/* Navigation arrows + dots */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={prev}
            aria-label="Previous"
            className="w-8 h-8 flex items-center justify-center text-charcoal/40 hover:text-charcoal border border-[#ddd] hover:border-charcoal/40 transition-colors duration-200"
          >
            <ChevronLeft size={15} />
          </button>

          <div className="flex gap-1.5">
            {Array.from({ length: total }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                aria-label={`Page ${i + 1}`}
                className={`transition-all duration-300 ${
                  i === page
                    ? "w-5 h-1 bg-charcoal"
                    : "w-1 h-1 rounded-full bg-charcoal/20"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next"
            className="w-8 h-8 flex items-center justify-center text-charcoal/40 hover:text-charcoal border border-[#ddd] hover:border-charcoal/40 transition-colors duration-200"
          >
            <ChevronRight size={15} />
          </button>
        </div>

      </div>
    </section>
  );
}
