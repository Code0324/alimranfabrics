"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Eye, ShoppingBag } from "lucide-react";
import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { useWishlist } from "@/store/wishlistContext";
import { formatPrice, calculateDiscount } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className = "" }: ProductCardProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  const discount = product.originalPrice
    ? calculateDiscount(product.originalPrice, product.price)
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, product.sizes[0], product.colors[0]);
  };

  return (
    <div
      className={`product-card group relative ${className}`}
      onMouseEnter={() => {
        setIsHovered(true);
        if (product.images.length > 1) setImageIndex(1);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setImageIndex(0);
      }}
    >
      {/* Image container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-white">
        <Link href={`/products/${product.slug}`} className="absolute inset-0 block">
          <Image
            src={product.images[imageIndex]}
            alt={product.name}
            fill
            className="object-contain transition-all duration-300 ease-in-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-0 left-0 flex flex-col gap-1">
          {discount > 0 && (
            <span
              className="font-inter font-black uppercase leading-none px-3 py-1.5"
              style={{ backgroundColor: "#FFE500", color: "#CC0000", fontSize: "13px", letterSpacing: "0.02em", borderRadius: "6px" }}
            >
              -{discount}%<br />
              <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.08em" }}>SALE</span>
            </span>
          )}
          {product.isNew && !discount && (
            <span
              className="font-inter font-semibold text-[10px] px-2 py-0.5 uppercase tracking-wide"
              style={{ backgroundColor: "#FFE500", color: "#CC0000", borderRadius: "6px" }}
            >
              New
            </span>
          )}
          {product.isBestSeller && !discount && !product.isNew && (
            <span
              className="font-inter font-semibold text-[10px] px-2 py-0.5 uppercase tracking-wide"
              style={{ backgroundColor: "#FFE500", color: "#CC0000", borderRadius: "6px" }}
            >
              Best Seller
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center
                     transition-all duration-200
                     ${wishlisted
                       ? "bg-gold text-charcoal"
                       : "bg-white/80 text-charcoal hover:bg-gold hover:text-charcoal"
                     }`}
        >
          <Heart size={14} fill={wishlisted ? "currentColor" : "none"} />
        </button>

        {/* Mobile: persistent Add to Cart button */}
        <button
          onClick={(e) => { e.stopPropagation(); handleQuickAdd(e); }}
          className="md:hidden absolute bottom-2 right-2 w-9 h-9 flex items-center justify-center shadow-md transition-colors"
          style={{ backgroundColor: "#FFE500", color: "#CC0000", borderRadius: "6px" }}
          aria-label="Add to cart"
        >
          <ShoppingBag size={15} />
        </button>

        {/* Desktop hover actions */}
        <div
          className={`hidden md:flex absolute bottom-0 left-0 right-0 transition-all duration-300 ${
            isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          }`}
        >
          <Link
            href={`/products/${product.slug}`}
            className="flex-1 bg-white/90 hover:bg-ivory text-charcoal py-3 text-xs font-inter font-medium
                       uppercase tracking-wide flex items-center justify-center gap-1.5 transition-colors border-r border-ivory"
          >
            <Eye size={13} />
            Quick View
          </Link>
          <button
            onClick={handleQuickAdd}
            className="flex-1 py-3 text-xs font-inter font-medium
                       uppercase tracking-wide flex items-center justify-center gap-1.5 transition-colors hover:opacity-90"
            style={{ backgroundColor: "#FFE500", color: "#CC0000" }}
          >
            <ShoppingBag size={13} />
            Add to Cart
          </button>
        </div>

        {/* Color swatches on hover */}
        {isHovered && product.colors.length > 1 && (
          <div className="absolute bottom-14 left-3 flex gap-1.5">
            {product.colors.slice(0, 4).map((color) => (
              <button
                key={color.name}
                title={color.name}
                className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="p-4">
        <p className="text-xs font-inter text-charcoal/40 uppercase tracking-wider mb-1">
          {product.fabric}
        </p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-playfair text-base font-semibold text-charcoal hover:text-gold transition-colors leading-snug mb-2 line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2">
          <span className="font-inter font-semibold text-navy text-base">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="font-inter text-sm text-charcoal/40 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
