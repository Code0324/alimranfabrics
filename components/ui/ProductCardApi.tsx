"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Eye, ShoppingBag } from "lucide-react";
import { BackendProduct } from "@/lib/api";
import { useCartStore } from "@/store/cartStore";
import { useWishlist } from "@/store/wishlistContext";
import { formatPrice } from "@/lib/utils";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=80";

interface Props {
  product: BackendProduct;
}

export default function ProductCardApi({ product }: Props) {
  const [hovered, setHovered] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  const cartProduct = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: product.price,
    originalPrice: product.originalPrice ?? undefined,
    images: product.images.length > 0 ? product.images : [FALLBACK_IMAGE],
    fabric: product.fabric,
    category: product.category,
    categorySlug: product.categorySlug,
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Default", hex: "#888888" }],
    description: product.description,
    isNew: product.isNew,
    isBestSeller: product.isBestSeller,
    collection: product.brand,
    rating: 4.5,
    reviewCount: 0,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;

  const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1')
    .replace(/\/api\/v1\/?$/, '').replace(/\/$/, '');

  function resolveImg(src: string | undefined): string | null {
    if (!src) return null;
    if (src.startsWith("http")) return src;
    // Next.js public assets (e.g. /image/embroidered/...) — no backend prefix
    if (src.startsWith("/image/")) return src;
    // Backend-served relative paths
    if (src.startsWith("/")) return `${baseUrl}${src}`;
    return null;
  }

  const imageUrl = resolveImg(product.images[0]) ?? FALLBACK_IMAGE;
  const hoverImageUrl = resolveImg(product.images[1]) ?? null;

  const discount = product.discountPercentage ||
    (product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0);

  return (
    <div
      className="product-card group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-ivory-dark">
        <Link href={`/products/${product.slug}`}>
          <Image
            src={hovered && hoverImageUrl ? hoverImageUrl : imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-all duration-700 ease-in-out group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
            unoptimized={!(hovered && hoverImageUrl ? hoverImageUrl : imageUrl).includes("unsplash.com")}
          />
        </Link>

        {/* Badges — top left */}
        <div className="absolute top-0 left-0 flex flex-col gap-1">
          {discount > 0 && (
            <span
              className="font-inter font-black uppercase leading-none px-3 py-1.5"
              style={{ backgroundColor: "#FFE500", color: "#CC0000", fontSize: "13px", borderRadius: "6px" }}
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

        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
          className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center transition-all duration-200
            ${wishlisted ? "bg-[#CC0000] text-white" : "bg-white/80 text-charcoal hover:bg-[#CC0000] hover:text-white"}`}
        >
          <Heart size={14} fill={wishlisted ? "currentColor" : "none"} />
        </button>

        {/* Mobile-only: persistent Add to Cart button */}
        <button
          onClick={(e) => { e.stopPropagation(); addItem(cartProduct, "M", { name: "Default", hex: "#888888" }); }}
          className="md:hidden absolute bottom-2 right-2 w-9 h-9 flex items-center justify-center shadow-md transition-colors"
          style={{ backgroundColor: "#FFE500", color: "#CC0000", borderRadius: "6px" }}
          aria-label="Add to cart"
        >
          <ShoppingBag size={15} />
        </button>

        {/* Desktop hover actions */}
        <div className={`hidden md:flex absolute bottom-0 left-0 right-0 transition-all duration-300 ${hovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}>
          <Link
            href={`/products/${product.slug}`}
            className="flex-1 bg-white/90 hover:bg-ivory text-charcoal py-3 text-xs font-inter font-medium
                       uppercase tracking-wide flex items-center justify-center gap-1.5 transition-colors border-r border-ivory"
          >
            <Eye size={13} />
            Quick View
          </Link>
          <button
            onClick={() => addItem(cartProduct, "M", { name: "Default", hex: "#888888" })}
            className="flex-1 py-3 text-xs font-inter font-medium uppercase tracking-wide
                       flex items-center justify-center gap-1.5 transition-colors hover:opacity-90"
            style={{ backgroundColor: "#FFE500", color: "#CC0000" }}
          >
            <ShoppingBag size={13} />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs font-inter text-charcoal/40 uppercase tracking-wider mb-1">
          {product.fabric || product.brand}
        </p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-playfair text-base font-semibold text-charcoal hover:text-[#CC0000] transition-colors leading-snug mb-2 line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2">
          <span className="font-inter font-semibold text-base" style={{ color: "#CC0000" }}>
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="font-inter text-sm text-charcoal/40 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
