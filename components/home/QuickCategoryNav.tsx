import Link from "next/link";
import Image from "next/image";

const quickCategories = [
  {
    label: "Printed",
    href: "/collections/printed",
    image: "/image/categories/printed.jpg",
  },
  {
    label: "Embroidered",
    href: "/collections/embroidered",
    image: "/image/categories/embroiderd.jpg",
  },
  {
    label: "Jacquard",
    href: "/collections/jacquard",
    image: "/image/categories/luxury.jpg",
  },
  {
    label: "Solid",
    href: "/collections/solid",
    image: "/image/categories/stitched.jpg",
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
