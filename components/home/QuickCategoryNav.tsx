import Link from "next/link";
import Image from "next/image";

const quickCategories = [
  {
    label: "Lawn",
    href: "/collections/lawn",
    image: "https://images.unsplash.com/photo-1558171813-0ebd2dc6d440?w=200&q=80",
    emoji: "🌿",
  },
  {
    label: "Festive",
    href: "/collections/formal",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=200&q=80",
    emoji: "✨",
  },
  {
    label: "Jacquard",
    href: "/collections/jacquard",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=200&q=80",
    emoji: "🪡",
  },
  {
    label: "Khaddar",
    href: "/collections/khaddar",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=200&q=80",
    emoji: "🧶",
  },
  {
    label: "Embroidered",
    href: "/collections/embroidered",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=200&q=80",
    emoji: "🌸",
  },
  {
    label: "Men",
    href: "/collections/men",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    emoji: "👔",
  },
  {
    label: "Kids",
    href: "/collections/kids",
    image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=200&q=80",
    emoji: "🎀",
  },
  {
    label: "Casual",
    href: "/collections/casual",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=200&q=80",
    emoji: "👗",
  },
];

export default function QuickCategoryNav() {
  return (
    <section className="bg-white py-5 border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section label */}
        <p
          className="text-center font-inter text-[10px] uppercase tracking-[0.3em] mb-4 font-semibold"
          style={{ color: "#CC0000" }}
        >
          Shop by Category
        </p>

        {/* Scrollable row */}
        <div className="flex gap-5 overflow-x-auto scrollbar-hide justify-start md:justify-center pb-1 -mx-4 px-4">
          {quickCategories.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="flex flex-col items-center gap-2 flex-shrink-0 group"
            >
              {/* Circular image */}
              <div
                className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 transition-all duration-300 group-hover:scale-105"
                style={{ borderColor: "#CC0000", boxShadow: "0 2px 8px rgba(204,0,0,0.2)" }}
              >
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
                {/* Subtle overlay on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: "rgba(204,0,0,0.18)" }}
                />
              </div>

              {/* Label */}
              <span
                className="font-inter text-[11px] font-semibold uppercase tracking-wide text-center transition-colors duration-200 group-hover:text-red-700"
                style={{ color: "#0C1350" }}
              >
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
