import Image from "next/image";
import Link from "next/link";
import { collections } from "@/data/collections";

export default function LovedCollections() {
  return (
    <section
      className="py-16 md:py-24"
      style={{ backgroundColor: "#FFE500" }}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-3">
            <span className="w-12 h-px" style={{ backgroundColor: "#B71C1C" }} />
            <span
              className="font-inter text-xs uppercase tracking-[0.3em] font-semibold"
              style={{ color: "#B71C1C" }}
            >
              Curated for You
            </span>
            <span className="w-12 h-px" style={{ backgroundColor: "#B71C1C" }} />
          </div>
          <h2
            className="font-playfair text-3xl md:text-4xl font-bold mb-3 bg-transparent"
            style={{ color: "#000080" }}
          >
            Loved Collections
          </h2>
          <p
            className="font-inter max-w-md mx-auto text-sm leading-relaxed"
            style={{ color: "#0C1350" }}
          >
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
                  priority={index < 2}
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />

                {/* Gold border on hover */}
                <div className="absolute inset-0 border border-transparent group-hover:border-[#FFD700] transition-all duration-500" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span
                    className="font-inter text-xs uppercase tracking-[0.2em] block mb-1 font-semibold"
                    style={{ color: "#FFD700" }}
                  >
                    {collection.productCount} Pieces
                  </span>
                  <h3
                    className="font-playfair text-xl font-bold mb-2 transition-colors duration-300"
                    style={{ color: "#ffffff" }}
                  >
                    {collection.name}
                  </h3>
                  <p className="font-inter text-xs leading-relaxed line-clamp-2 mb-3" style={{ color: "rgba(255,255,255,0.6)" }}>
                    {collection.description}
                  </p>
                  <span
                    className="inline-flex items-center gap-1 font-inter text-xs uppercase tracking-wide
                                 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-1 group-hover:translate-y-0"
                    style={{ color: "#FFD700" }}
                  >
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
