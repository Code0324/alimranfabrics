"use client";

import { Star } from "lucide-react";

const reviews = [
  { id: 1, name: "Fatima A.",  initials: "FA", title: "Absolutely stunning fabric!",  text: "The quality is unmatched, soft and elegant. Will definitely reorder.", rating: 5 },
  { id: 2, name: "Sara Khan",  initials: "SK", title: "Beautiful 😍",                  text: "Perfect for formal wear, love the colours. Delivery was fast too.",   rating: 5 },
  { id: 3, name: "Anonymous",  initials: "A",  title: "Great purchase",                text: "Love the texture and stitching quality. Highly recommend!",           rating: 5 },
  { id: 4, name: "Aisha M.",   initials: "AM", title: "Exceeded expectations!",        text: "The colour is even richer in person. Already placed my second order.", rating: 5 },
  { id: 5, name: "Zara H.",    initials: "ZH", title: "Premium quality",               text: "Consistent quality, fast shipping, embroidery work is flawless.",     rating: 5 },
  { id: 6, name: "Nadia R.",   initials: "NR", title: "My go-to store",                text: "Authentic brands, genuine products — this is the only place I shop.", rating: 5 },
  { id: 7, name: "Hina K.",    initials: "HK", title: "Eid perfect!",                  text: "Ordered for Eid and received so many compliments. Packaging was lovely too.", rating: 5 },
  { id: 8, name: "Mariam S.",  initials: "MS", title: "Flawless stitching",            text: "The embroidery is delicate and exactly as shown. Very happy customer.", rating: 5 },
];

const loopReviews = [...reviews, ...reviews];

function StarRow({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < rating ? "fill-[#F5A623] text-[#F5A623]" : "fill-charcoal/10 text-charcoal/10"}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: typeof reviews[0] }) {
  return (
    <div
      className="flex-shrink-0 w-[260px] bg-white border border-[#E8E4DC] p-5 flex flex-col gap-3"
    >
      {/* Stars */}
      <StarRow rating={review.rating} size={13} />

      {/* Title */}
      <p className="font-cormorant text-base font-semibold text-charcoal leading-snug">
        {review.title}
      </p>

      {/* Review text */}
      <p className="font-dm-sans text-[12px] text-charcoal/55 leading-relaxed flex-1 line-clamp-3">
        &ldquo;{review.text}&rdquo;
      </p>

      {/* Reviewer */}
      <div className="flex items-center gap-2.5 pt-3 border-t border-[#E8E4DC]">
        <div
          className="w-7 h-7 rounded-full bg-charcoal flex items-center justify-center flex-shrink-0"
        >
          <span className="font-dm-sans text-[10px] font-semibold text-white">
            {review.initials}
          </span>
        </div>
        <div>
          <p className="font-dm-sans text-[11px] font-medium text-charcoal">{review.name}</p>
          <p className="font-dm-sans text-[10px] text-charcoal/35">Verified Purchase</p>
        </div>
      </div>
    </div>
  );
}

export default function CustomerReviews() {
  return (
    <section className="py-16 md:py-24 bg-cream-dark overflow-hidden" style={{ backgroundColor: "#F5F2ED" }}>

      {/* ── Header ── */}
      <div className="max-w-[640px] mx-auto px-4 text-center mb-10">
        <p className="section-label mb-3">Customer Love</p>
        <h2 className="font-cormorant text-3xl md:text-4xl font-semibold text-charcoal mb-4">
          You Said It, Not Us 🤝
        </h2>
        <div className="flex items-center justify-center gap-2">
          <StarRow rating={5} size={16} />
          <span className="font-dm-sans text-sm font-semibold text-charcoal ml-1">5.0</span>
          <span className="font-dm-sans text-xs text-charcoal/40">from 150+ reviews</span>
        </div>
      </div>

      {/* ── Infinite marquee strip ── */}
      <div
        className="overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
        }}
      >
        <div className="review-marquee items-stretch gap-4 px-8">
          {loopReviews.map((r, i) => (
            <ReviewCard key={`${r.id}-${i}`} review={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
