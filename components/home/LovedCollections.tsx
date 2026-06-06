import Image from "next/image";
import Link from "next/link";
import { collections } from "@/data/collections";

export default function LovedCollections() {
  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* ── Section header ── */}
        <div className="text-center mb-12">
          <p className="section-label mb-3">Curated for You</p>
          <h2 className="font-cormorant text-3xl md:text-4xl font-semibold text-charcoal mb-4">
            Loved Collections
          </h2>
          <p className="font-dm-sans text-charcoal/55 text-sm leading-relaxed max-w-[480px] mx-auto">
            Thoughtfully curated categories that celebrate the richness of Pakistani textile heritage.
          </p>
        </div>

        {/* ── 4-card grid ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.slug}`}
              className="group relative overflow-hidden block bg-[#F0EBE1]"
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />

                {/* Permanent dark gradient at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />

                {/* Hover dark overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-500" />

                {/* Category name — always visible at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col items-center text-center">
                  <h3 className="font-cormorant text-white text-xl md:text-2xl font-semibold tracking-wide mb-3">
                    {collection.name}
                  </h3>

                  {/* "SHOP NOW" button — visible on hover */}
                  <span
                    className="inline-block border border-white text-white font-dm-sans text-[11px]
                               uppercase tracking-[0.15em] px-4 py-1.5
                               opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0
                               transition-all duration-400"
                  >
                    Shop Now
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
