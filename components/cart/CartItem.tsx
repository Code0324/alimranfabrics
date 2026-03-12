"use client";

import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { CartItem as CartItemType } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";

const FALLBACK_IMG = "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=300&q=80";
const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "") || "";

function resolveImage(src: string | undefined): string {
  if (!src) return FALLBACK_IMG;
  if (src.startsWith("http")) return src;
  if (src.startsWith("/") && API_BASE) return `${API_BASE}${src}`;
  return FALLBACK_IMG;
}

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  const handleQuantityChange = (delta: number) => {
    updateQuantity(
      item.product.id,
      item.selectedSize,
      item.selectedColor.name,
      item.quantity + delta
    );
  };

  return (
    <div className="flex gap-4 py-4 border-b border-ivory-dark">
      {/* Image */}
      <div className="relative w-20 h-24 flex-shrink-0 bg-ivory-dark overflow-hidden">
        <Image
          src={resolveImage(item.product.images?.[0])}
          alt={item.product.name}
          fill
          className="object-cover"
          sizes="80px"
          onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMG; }}
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <h4 className="font-playfair text-sm font-semibold text-charcoal leading-snug line-clamp-2">
            {item.product.name}
          </h4>
          <button
            onClick={() => removeItem(item.product.id, item.selectedSize, item.selectedColor.name)}
            aria-label="Remove item"
            className="text-charcoal/40 hover:text-red-500 transition-colors flex-shrink-0 p-0.5"
          >
            <X size={14} />
          </button>
        </div>

        {/* Variants */}
        <div className="flex items-center gap-3 mt-1 mb-3">
          <span className="text-xs font-inter text-charcoal/50">
            Size: <span className="text-charcoal/70 font-medium">{item.selectedSize}</span>
          </span>
          <span className="text-charcoal/30">•</span>
          <div className="flex items-center gap-1">
            <span
              className="w-3 h-3 rounded-full border border-charcoal/20 inline-block"
              style={{ backgroundColor: item.selectedColor.hex }}
            />
            <span className="text-xs font-inter text-charcoal/50">{item.selectedColor.name}</span>
          </div>
        </div>

        {/* Price + Qty */}
        <div className="flex items-center justify-between">
          <div className="flex items-center border border-ivory-dark">
            <button
              onClick={() => handleQuantityChange(-1)}
              aria-label="Decrease quantity"
              className="w-7 h-7 flex items-center justify-center hover:bg-ivory-dark transition-colors"
            >
              <Minus size={12} />
            </button>
            <span className="w-8 text-center font-inter text-sm font-medium">
              {item.quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(1)}
              aria-label="Increase quantity"
              className="w-7 h-7 flex items-center justify-center hover:bg-ivory-dark transition-colors"
            >
              <Plus size={12} />
            </button>
          </div>
          <span className="font-inter font-semibold text-navy text-sm">
            {formatPrice(item.product.price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}
