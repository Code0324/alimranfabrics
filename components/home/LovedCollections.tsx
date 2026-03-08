import Image from "next/image";
import Link from "next/link";
import { collections } from "@/data/collections";

export default function LovedCollections() {
  return (
    <section className="py-16 md:py-24 bg-charcoal">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-3">
            <span className="w-12 h-px bg-gold/60" />
            <span className="font-inter text-gold text-xs uppercase tracking-[0.3em]">Curated for You</span>
            <span className="w-12 h-px bg-gold/60" />
          </div>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-ivory mb-3">
            Loved Collections
          </h2>
          <p className="font-inter text-ivory/50 max-w-md mx-auto text-sm">
            Thoughtfully curated categories that celebrate the richness of Pakistani textile heritage.
          </p>
        </div>

        {/* Collections grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {collections.map((collection, index) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.slug}`}
              className="group relative overflow-hidden block"
            >
              <div className={`relative ${index === 0 ? "aspect-[3/4]" : "aspect-[3/4]"} overflow-hidden`}>
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />

                {/* Gold border on hover */}
                <div className="absolute inset-0 border border-transparent group-hover:border-gold/60 transition-all duration-500" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="font-inter text-gold text-xs uppercase tracking-[0.2em] block mb-1">
                    {collection.productCount} Pieces
                  </span>
                  <h3 className="font-playfair text-ivory text-xl font-bold group-hover:text-gold transition-colors duration-300 mb-2">
                    {collection.name}
                  </h3>
                  <p className="font-inter text-ivory/50 text-xs leading-relaxed line-clamp-2 mb-3">
                    {collection.description}
                  </p>
                  <span className="inline-flex items-center gap-1 font-inter text-xs text-gold uppercase tracking-wide
                                   opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-1 group-hover:translate-y-0">
                    Explore →
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
