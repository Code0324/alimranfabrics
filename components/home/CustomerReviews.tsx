"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Fatima A.",
    title: "Absolutely stunning fabric!",
    text: "The quality is unmatched, soft and elegant. I ordered for Eid and every single person complimented the colour. Will definitely reorder.",
    rating: 5,
    image: "/image/alkaram/03offwhite.png",
  },
  {
    id: 2,
    name: "Sara Khan",
    title: "Beautiful 😍",
    text: "Perfect for formal wear, love the colours. The fabric fell beautifully and the stitching was immaculate. Delivery was fast too.",
    rating: 5,
    image: "/image/embroiderd/white.jpg",
  },
  {
    id: 3,
    name: "Anonymous",
    title: "Great purchase",
    text: "Love the texture and stitching quality. Exactly as shown in the photos. Highly recommend Al Imran Fabrics to anyone looking for authentic Pakistani brands.",
    rating: 5,
    image: "/image/MTJ/bluelight.jpg",
  },
  {
    id: 4,
    name: "Aisha M.",
    title: "Exceeded expectations!",
    text: "I was hesitant to order online but the fabric arrived perfectly packed. The colour is even richer in person. Already placed my second order.",
    rating: 5,
    image: "/image/alkaram/54pink.png",
  },
  {
    id: 5,
    name: "Zara H.",
    title: "Premium quality at a fair price",
    text: "Been buying from Al Imran for two years now. Consistent quality, fast shipping, and the embroidery work is always flawless.",
    rating: 5,
    image: "/image/embroiderd/rust.jpg",
  },
  {
    id: 6,
    name: "Nadia R.",
    title: "My go-to for every occasion",
    text: "From casual lawn to formal embroidered suits — this is the only place I shop now. Authentic brands, genuine products, no fakes.",
    rating: 5,
    image: "/image/MTJ/greenblk.jpg",
  },
];

const OVERALL_RATING = 4.8;
const TOTAL_REVIEWS = 247;

function StarRow({ count = 5, size = 14 }: { count?: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < count ? "fill-[#C9A84C] text-[#C9A84C]" : "fill-charcoal/20 text-charcoal/20"}
        />
      ))}
    </div>
  );
}

export default function CustomerReviews() {
  const [page, setPage] = useState(0);
  const perPage = 3;
  const totalPages = Math.ceil(reviews.length / perPage);
  const visible = reviews.slice(page * perPage, page * perPage + perPage);

  const prev = () => setPage((p) => (p - 1 + totalPages) % totalPages);
  const next = () => setPage((p) => (p + 1) % totalPages);

  return (
    <section className="py-16 md:py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-4 mb-3">
            <span className="w-12 h-px bg-gold" />
            <span className="font-inter text-gold text-xs uppercase tracking-[0.3em]">Customer Reviews</span>
            <span className="w-12 h-px bg-gold" />
          </div>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-charcoal mb-6 bg-transparent">
            You Said It, Not Us&nbsp;👀
          </h2>
        </div>

        {/* Overall rating */}
        <div className="flex flex-col items-center mb-12">
          <div className="flex items-end gap-3 mb-2">
            <span className="font-playfair text-6xl font-bold text-charcoal leading-none">
              {OVERALL_RATING}
            </span>
            <span className="font-inter text-charcoal/40 text-base mb-2">/ 5</span>
          </div>
          <StarRow count={5} size={20} />
          <p className="font-inter text-xs text-charcoal/40 uppercase tracking-widest mt-2">
            Based on {TOTAL_REVIEWS} verified reviews
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {visible.map((review) => (
            <div
              key={review.id}
              className="flex flex-col border border-ivory-dark bg-ivory rounded-none overflow-hidden hover:shadow-card-hover transition-shadow duration-300"
            >
              {/* Product photo */}
              <div className="relative aspect-[4/3] overflow-hidden bg-white">
                <Image
                  src={review.image}
                  alt={review.title}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Review content */}
              <div className="p-5 flex flex-col flex-1">
                <StarRow count={review.rating} size={13} />
                <h4 className="font-playfair text-base font-bold text-charcoal mt-3 mb-2 leading-snug">
                  {review.title}
                </h4>
                <p className="font-inter text-sm text-charcoal/60 leading-relaxed flex-1">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="mt-4 pt-4 border-t border-ivory-dark flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                    <span className="font-inter text-xs font-bold text-gold">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <span className="font-inter text-xs font-semibold text-charcoal uppercase tracking-wide">
                    {review.name}
                  </span>
                  <span className="ml-auto">
                    <span className="font-inter text-[10px] text-charcoal/30 uppercase tracking-widest">
                      Verified
                    </span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prev}
            aria-label="Previous reviews"
            className="w-10 h-10 border border-charcoal/20 flex items-center justify-center text-charcoal hover:border-gold hover:text-gold transition-all duration-200"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                aria-label={`Go to page ${i + 1}`}
                className={`transition-all duration-300 ${
                  i === page ? "w-6 h-1.5 bg-gold" : "w-1.5 h-1.5 rounded-full bg-charcoal/20"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next reviews"
            className="w-10 h-10 border border-charcoal/20 flex items-center justify-center text-charcoal hover:border-gold hover:text-gold transition-all duration-200"
          >
            <ChevronRight size={18} />
          </button>
        </div>

      </div>
    </section>
  );
}
