"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Heart, Ruler } from "lucide-react";
import { Product, ProductColor } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { useWishlist } from "@/store/wishlistContext";
import SizeSelector from "./SizeSelector";
import SizeGuideModal from "./SizeGuideModal";

export type ColorVariant = { slug: string; color: ProductColor };

interface AddToCartProps {
  product: Product;
  colorVariants?: ColorVariant[];
}

const FABRIC_DETAILS = [
  { piece: "Shirt",   fabric: "Lawn",    meters: "1.75m" },
  { piece: "Dupatta", fabric: "Lawn",    meters: "2.5m"  },
  { piece: "Trouser", fabric: "Cambric", meters: "1.5m"  },
];

export default function AddToCart({ product, colorVariants }: AddToCartProps) {
  const isUnstitched  = product.sizes[0] === "Unstitched";
  const [selectedSize]  = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  const { addItem }  = useCartStore();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted   = isWishlisted(product.id);

  const handleAddToCart = () => {
    addItem(product, selectedSize, selectedColor);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  };

  const hasVariants       = colorVariants && colorVariants.length > 1;
  const currentColorName  = hasVariants
    ? (colorVariants.find((v) => v.slug === product.slug)?.color.name ?? selectedColor.name)
    : selectedColor.name;

  return (
    <div className="space-y-5">

      {/* ── Colour selector ── */}
      <div>
        <p className="font-dm-sans text-[11px] uppercase tracking-[0.18em] text-charcoal/55 mb-3">
          Colour: <span className="text-charcoal">{currentColorName}</span>
        </p>

        {hasVariants ? (
          <div className="flex flex-wrap gap-2">
            {colorVariants.map((v) => (
              <Link
                key={v.slug}
                href={`/products/${v.slug}`}
                title={v.color.name}
                className={`w-7 h-7 rounded-full block transition-all duration-150
                  ${v.slug === product.slug
                    ? "ring-2 ring-offset-2 ring-[#1A1A1A]"
                    : "ring-1 ring-[#E8E4DE] hover:ring-[#aaa]"}`}
                style={{ backgroundColor: v.color.hex }}
              />
            ))}
          </div>
        ) : (
          <div className="flex gap-2">
            {product.colors.map((color) => (
              <button
                key={color.name}
                title={color.name}
                onClick={() => setSelectedColor(color)}
                className={`w-7 h-7 rounded-full transition-all duration-150
                  ${selectedColor.name === color.name
                    ? "ring-2 ring-offset-2 ring-[#1A1A1A]"
                    : "ring-1 ring-[#E8E4DE] hover:ring-[#aaa]"}`}
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        )}
      </div>

      <hr className="border-[#E8E4DE]" />

      {/* ── Fabric table (unstitched) or Size selector (stitched) ── */}
      {isUnstitched ? (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Ruler size={13} className="text-charcoal/40" strokeWidth={1.5} />
            <span className="font-dm-sans text-[11px] uppercase tracking-[0.18em] text-charcoal/55">
              Fabric Details
            </span>
          </div>
          <div className="border border-[#E8E4DE] divide-y divide-[#E8E4DE]">
            {FABRIC_DETAILS.map((row) => (
              <div key={row.piece} className="flex items-center justify-between px-4 py-2.5 bg-white">
                <span className="font-dm-sans text-[12px] font-medium text-charcoal w-20">{row.piece}</span>
                <span className="font-dm-sans text-[11px] text-charcoal/45 uppercase tracking-wide flex-1 text-center">{row.fabric}</span>
                <span className="font-dm-sans text-[12px] font-medium text-charcoal">{row.meters}</span>
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
      <div className="space-y-2.5 pt-1">
        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className={`w-full flex items-center justify-center gap-2.5 py-4
                      font-dm-sans text-[12px] uppercase tracking-[0.2em] font-medium
                      transition-all duration-200
                      ${addedFeedback
                        ? "bg-[#2a2a2a] text-white"
                        : "bg-[#111111] text-white hover:bg-[#2a2a2a]"}`}
        >
          <ShoppingBag size={15} strokeWidth={1.5} />
          {addedFeedback ? "Added to Cart!" : "Add to Cart"}
        </button>

        {/* Wishlist */}
        <button
          onClick={() => toggleWishlist(product.id)}
          className={`w-full flex items-center justify-center gap-2.5 py-4
                      font-dm-sans text-[12px] uppercase tracking-[0.2em] font-medium
                      border transition-all duration-200
                      ${wishlisted
                        ? "border-[#1A1A1A] bg-[#F5F2ED] text-charcoal"
                        : "border-[#E8E4DE] text-charcoal/60 hover:border-[#1A1A1A] hover:text-charcoal"}`}
        >
          <Heart size={15} strokeWidth={1.5} fill={wishlisted ? "currentColor" : "none"} />
          {wishlisted ? "Saved to Wishlist" : "Add to Wishlist"}
        </button>
      </div>

      {/* ── Size guide link ── */}
      {!isUnstitched && (
        <div className="flex justify-end">
          <button
            onClick={() => setSizeGuideOpen(true)}
            className="font-dm-sans text-[11px] text-charcoal/45 underline underline-offset-4 hover:text-charcoal transition-colors"
          >
            Size Guide →
          </button>
        </div>
      )}

      <SizeGuideModal isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
    </div>
  );
}
