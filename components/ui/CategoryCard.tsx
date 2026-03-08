import Link from "next/link";
import Image from "next/image";
import { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
  className?: string;
}

export default function CategoryCard({ category, className = "" }: CategoryCardProps) {
  return (
    <Link
      href={`/collections/${category.slug}`}
      className={`group relative overflow-hidden block flex-shrink-0 ${className}`}
    >
      <div className="relative w-48 md:w-56 aspect-[3/4]">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 768px) 192px, 224px"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />

        {/* Gold border on hover */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold transition-all duration-300" />

        {/* Label */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-playfair text-ivory font-semibold text-lg leading-tight group-hover:text-gold transition-colors">
            {category.name}
          </h3>
          <p className="font-inter text-ivory/60 text-xs mt-0.5">
            {category.productCount} pieces
          </p>
        </div>
      </div>
    </Link>
  );
}
