"use client";

import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { CartItem as CartItemType } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";

const FALLBACK_IMG = "/image/categories/cat-embroidered.jpg";
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
    <div className="flex gap-5 py-5 border-b border-[#E8E4DE]">
      {/* Image */}
      <div className="relative w-20 h-[100px] flex-shrink-0 bg-[#F5F2ED] overflow-hidden">
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
          <h4 className="font-dm-sans text-[13px] font-medium text-charcoal leading-snug line-clamp-2">
            {item.product.name}
          </h4>
          <button
            onClick={() => removeItem(item.product.id, item.selectedSize, item.selectedColor.name)}
            aria-label="Remove item"
            className="text-charcoal/30 hover:text-charcoal transition-colors flex-shrink-0 p-0.5 mt-0.5"
          >
            <X size={13} />
          </button>
        </div>

        {/* Variants */}
        <div className="flex items-center gap-3 mt-1.5 mb-3.5">
          <span className="font-dm-sans text-[11px] text-charcoal/45 uppercase tracking-[0.1em]">
            {item.selectedSize}
          </span>
          <span className="text-charcoal/25">·</span>
          <div className="flex items-center gap-1.5">
            <span
              className="w-3 h-3 rounded-full border border-charcoal/20 inline-block"
              style={{ backgroundColor: item.selectedColor.hex }}
            />
            <span className="font-dm-sans text-[11px] text-charcoal/45">{item.selectedColor.name}</span>
          </div>
        </div>

        {/* Qty + Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center border border-[#E8E4DE]">
            <button
              onClick={() => handleQuantityChange(-1)}
              aria-label="Decrease quantity"
              className="w-7 h-7 flex items-center justify-center text-charcoal/50 hover:bg-[#F5F2ED] transition-colors"
            >
              <Minus size={11} />
            </button>
            <span className="w-8 text-center font-dm-sans text-[13px] text-charcoal">
              {item.quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(1)}
              aria-label="Increase quantity"
              className="w-7 h-7 flex items-center justify-center text-charcoal/50 hover:bg-[#F5F2ED] transition-colors"
            >
              <Plus size={11} />
            </button>
          </div>
          <span className="font-dm-sans text-[14px] font-medium text-charcoal">
            {formatPrice(item.product.price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}
