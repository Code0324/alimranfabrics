"use client";

import { useState } from "react";
import { ShoppingBag, Zap, Heart } from "lucide-react";
import { Product, ProductColor } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { useWishlist } from "@/store/wishlistContext";
import SizeSelector from "./SizeSelector";

interface AddToCartProps {
  product: Product;
}

export default function AddToCart({ product }: AddToCartProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
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

  return (
    <div className="space-y-6">
      {/* Color selector */}
      <div>
        <span className="font-inter text-sm font-medium text-charcoal uppercase tracking-wide block mb-3">
          Color: <span className="text-emerald font-semibold">{selectedColor.name}</span>
        </span>
        <div className="flex gap-2.5">
          {product.colors.map((color) => (
            <button
              key={color.name}
              title={color.name}
              onClick={() => setSelectedColor(color)}
              className={`w-8 h-8 rounded-full transition-all duration-200 ${
                selectedColor.name === color.name
                  ? "ring-2 ring-offset-2 ring-emerald scale-110"
                  : "hover:scale-105 ring-1 ring-charcoal/20"
              }`}
              style={{ backgroundColor: color.hex }}
            />
          ))}
        </div>
      </div>

      {/* Size selector */}
      <SizeSelector
        sizes={product.sizes}
        selectedSize={selectedSize}
        onSelect={setSelectedSize}
      />

      {/* Action buttons */}
      <div className="space-y-3">
        <button
          onClick={handleAddToCart}
          className={`w-full flex items-center justify-center gap-2.5 py-4 font-inter font-semibold text-sm uppercase tracking-wide transition-all duration-300
            ${addedFeedback
              ? "bg-gold text-charcoal"
              : "bg-emerald text-ivory hover:bg-emerald-light"
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
