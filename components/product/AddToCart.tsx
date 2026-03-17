"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Zap, Heart, Ruler } from "lucide-react";
import { Product, ProductColor } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { useWishlist } from "@/store/wishlistContext";
import SizeSelector from "./SizeSelector";

export type ColorVariant = { slug: string; color: ProductColor };

interface AddToCartProps {
  product: Product;
  colorVariants?: ColorVariant[];
}

const FABRIC_DETAILS = [
  { piece: "Shirt",   fabric: "Lawn",    meters: "1.75 Meter" },
  { piece: "Dupatta", fabric: "Lawn",    meters: "2.5 Meter"  },
  { piece: "Trouser", fabric: "Cambric", meters: "1.5 Meter"  },
];

export default function AddToCart({ product, colorVariants }: AddToCartProps) {
  const isUnstitched = product.sizes[0] === "Unstitched";
  const [selectedSize]   = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const { addItem } = useCartStore();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    addItem(product, selectedSize, selectedColor);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  };

  // Decide what to show in the colour row
  const hasVariants = colorVariants && colorVariants.length > 1;
  // Current colour label — from variants if available, else from product.colors
  const currentColorName = hasVariants
    ? (colorVariants.find((v) => v.slug === product.slug)?.color.name ?? selectedColor.name)
    : selectedColor.name;

  return (
    <div className="space-y-6">

      {/* ── Colour selector ── */}
      <div>
        <span className="font-inter text-sm font-medium text-charcoal uppercase tracking-wide block mb-3">
          Colour: <span className="text-navy font-semibold">{currentColorName}</span>
        </span>

        {hasVariants ? (
          /* Variant circles — each links to its own product page */
          <div className="flex flex-wrap gap-2.5">
            {colorVariants.map((v) => (
              <Link
                key={v.slug}
                href={`/products/${v.slug}`}
                title={v.color.name}
                className={`w-8 h-8 rounded-full block transition-all duration-200 ${
                  v.slug === product.slug
                    ? "ring-2 ring-offset-2 ring-navy scale-110"
                    : "ring-1 ring-charcoal/20 hover:scale-105 hover:ring-navy/50"
                }`}
                style={{ backgroundColor: v.color.hex }}
              />
            ))}
          </div>
        ) : (
          /* Single-product colour circles from product.colors */
          <div className="flex gap-2.5">
            {product.colors.map((color) => (
              <button
                key={color.name}
                title={color.name}
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-full transition-all duration-200 ${
                  selectedColor.name === color.name
                    ? "ring-2 ring-offset-2 ring-navy scale-110"
                    : "hover:scale-105 ring-1 ring-charcoal/20"
                }`}
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Fabric details (unstitched) OR Size selector (stitched) ── */}
      {isUnstitched ? (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Ruler size={14} className="text-charcoal/50" />
            <span className="font-inter text-sm font-medium text-charcoal uppercase tracking-wide">
              Fabric Details
            </span>
          </div>
          <div className="border border-ivory-dark divide-y divide-ivory-dark rounded-sm overflow-hidden">
            {FABRIC_DETAILS.map((row) => (
              <div
                key={row.piece}
                className="flex items-center justify-between px-4 py-2.5 bg-white"
              >
                <span className="font-inter text-sm font-semibold text-charcoal w-20">
                  {row.piece}
                </span>
                <span className="font-inter text-xs text-charcoal/50 uppercase tracking-wide flex-1 text-center">
                  {row.fabric}
                </span>
                <span className="font-inter text-sm font-semibold text-navy">
                  {row.meters}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <SizeSelector
          sizes={product.sizes}
          selectedSize={selectedSize}
          onSelect={() => {}}
        />
      )}

      {/* ── Action buttons ── */}
      <div className="space-y-3">
        <button
          onClick={handleAddToCart}
          className={`w-full flex items-center justify-center gap-2.5 py-4 font-inter font-semibold text-sm uppercase tracking-wide transition-all duration-300
            ${addedFeedback
              ? "bg-gold text-charcoal"
              : "bg-navy text-ivory hover:bg-navy"
            }`}
        >
          <ShoppingBag size={18} />
          {addedFeedback ? "Added to Cart!" : "Add to Cart"}
        </button>

        <button
          className="w-full flex items-center justify-center gap-2.5 py-4 font-inter font-semibold text-sm uppercase tracking-wide
                     border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-ivory transition-all duration-300"
        >
          <Zap size={18} />
          Buy Now
        </button>

        <button
          onClick={() => toggleWishlist(product.id)}
          className={`w-full flex items-center justify-center gap-2 py-3 font-inter text-sm uppercase tracking-wide border transition-all duration-300
            ${wishlisted
              ? "border-gold bg-gold/10 text-gold"
              : "border-charcoal/20 text-charcoal/60 hover:border-gold hover:text-gold"
            }`}
        >
          <Heart size={15} fill={wishlisted ? "currentColor" : "none"} />
          {wishlisted ? "Saved to Wishlist" : "Save to Wishlist"}
        </button>
      </div>
    </div>
  );
}
