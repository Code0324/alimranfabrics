"use client";

import { useRef, MouseEvent as RMouseEvent } from "react";
import Image from "next/image";
import { Star } from "lucide-react";

const reviews = [
  { id: 1, name: "Fatima A.",  title: "Absolutely stunning fabric!", text: "The quality is unmatched, soft and elegant. Will definitely reorder.", rating: 5, image: "/image/alkaram/03offwhite.png" },
  { id: 2, name: "Sara Khan",  title: "Beautiful 😍",                  text: "Perfect for formal wear, love the colours. Delivery was fast too.",  rating: 5, image: "/image/embroiderd/white.jpg"   },
  { id: 3, name: "Anonymous",  title: "Great purchase",                text: "Love the texture and stitching quality. Highly recommend!",          rating: 5, image: "/image/MTJ/bluelight.jpg"      },
  { id: 4, name: "Aisha M.",   title: "Exceeded expectations!",        text: "The colour is even richer in person. Already placed my second order.",rating: 5, image: "/image/alkaram/54pink.png"    },
  { id: 5, name: "Zara H.",    title: "Premium quality",               text: "Consistent quality, fast shipping, embroidery work is flawless.",    rating: 5, image: "/image/embroiderd/rust.jpg"   },
  { id: 6, name: "Nadia R.",   title: "My go-to store",                text: "Authentic brands, genuine products — this is the only place I shop.",rating: 5, image: "/image/MTJ/greenblk.jpg"     },
  { id: 7, name: "Hina K.",    title: "Eid perfect!",                  text: "Ordered for Eid and received so many compliments. Packaging was lovely too.", rating: 5, image: "/image/alkaram/43beige.png" },
  { id: 8, name: "Mariam S.",  title: "Flawless stitching",            text: "The embroidery is delicate and exactly as shown. Very happy customer.", rating: 5, image: "/image/embroiderd/offwhite.jpg" },
];

const loopReviews = [...reviews, ...reviews];

function StarRow({ rating, size = 11 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-px">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < Math.floor(rating);
        const half   = !filled && i < rating;
        return (
          <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
            <Star size={size} className="absolute inset-0 text-charcoal/15 fill-charcoal/15" />
            {(filled || half) && (
              <span className="absolute inset-0 overflow-hidden" style={{ width: half ? "50%" : "100%" }}>
                <Star size={size} className="text-[#C9A84C] fill-[#C9A84C]" />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

const restShadow  = "0 2px 8px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)";
const hoverShadow = "0 12px 30px rgba(0,0,0,0.12), 0 4px 10px rgba(0,0,0,0.08)";

function ReviewCard({ review }: { review: typeof reviews[0] }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: RMouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r  = el.getBoundingClientRect();
    const rx = (((e.clientY - r.top)  / r.height) - 0.5) * -14;
    const ry = (((e.clientX - r.left) / r.width)  - 0.5) *  14;
    el.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.04)`;
    el.style.boxShadow = hoverShadow;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)";
    el.style.boxShadow = restShadow;
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="brand-card flex-shrink-0 w-[252px] bg-white border border-[#ece9e0] p-4 flex flex-col gap-3 cursor-default"
      style={{ boxShadow: restShadow }}
    >
      {/* Top row: image + meta */}
      <div className="flex items-start gap-3">
        <div className="relative w-[58px] h-[58px] flex-shrink-0 overflow-hidden bg-[#f8f7f3] rounded-sm">
          <Image
            src={review.image}
            alt={review.title}
            fill
            className="object-contain p-1"
            sizes="58px"
            draggable={false}
          />
        </div>
        <div className="flex flex-col gap-1 pt-0.5 min-w-0">
          <StarRow rating={review.rating} size={12} />
          <p className="font-inter font-semibold text-[11.5px] text-charcoal leading-tight line-clamp-2">
            {review.title}
          </p>
        </div>
      </div>

      {/* Review text */}
      <p className="font-inter text-[11px] text-charcoal/55 leading-relaxed line-clamp-3 flex-1">
        &ldquo;{review.text}&rdquo;
      </p>

      {/* Reviewer */}
      <div className="flex items-center gap-2 pt-1 border-t border-[#f0ede6]">
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #C9A84C, #A07830)" }}
        >
          <span className="font-inter text-[9px] font-bold text-white">
            {review.name.charAt(0)}
          </span>
        </div>
        <span className="font-inter text-[10px] font-semibold text-charcoal/50 uppercase tracking-widest">
          {review.name}
        </span>
        <span className="ml-auto font-inter text-[9px] text-charcoal/25 uppercase tracking-wider">
          Verified
        </span>
      </div>
    </div>
  );
}

export default function CustomerReviews() {
  return (
    <section className="py-14 md:py-20 bg-white">

      {/* Header — constrained */}
      <div className="max-w-[700px] mx-auto px-4 text-center mb-8">
        <h2 className="font-playfair text-2xl md:text-3xl font-bold text-charcoal bg-transparent mb-3">
          You Said It, Not Us&nbsp;👀
        </h2>
        <div className="flex items-center justify-center gap-2">
          <StarRow rating={4.5} size={16} />
          <span className="font-inter text-sm font-semibold text-charcoal">4.5</span>
          <span className="font-inter text-xs text-charcoal/40">from 150 reviews</span>
        </div>
      </div>

      {/* Infinite marquee strip */}
      <div
        className="overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
        }}
      >
        <div className="review-marquee items-stretch gap-4 px-8 pb-1">
          {loopReviews.map((r, i) => (
            <ReviewCard key={`${r.id}-${i}`} review={r} />
          ))}
        </div>
      </div>

    </section>
  );
}
