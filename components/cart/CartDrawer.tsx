"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { X, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import CartItem from "./CartItem";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const { items, isOpen, closeCart, getTotal, getItemCount } = useCartStore();
  const drawerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const total = mounted ? getTotal() : 0;
  const count = mounted ? getItemCount() : 0;

  // ESC to close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
      // Focus trap
      drawerRef.current?.focus();
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-[59] transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        tabIndex={-1}
        className={`fixed top-0 right-0 h-[100dvh] w-full max-w-md bg-white z-[60] flex flex-col
                    transition-transform duration-300 ease-out shadow-2xl
                    focus:outline-none
                    ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8E4DE]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={17} className="text-charcoal/50" strokeWidth={1.5} />
            <h2 className="font-dm-sans text-[13px] uppercase tracking-[0.15em] text-charcoal">
              Your Bag
              {count > 0 && (
                <span className="text-charcoal/40 ml-2 font-normal">
                  ({count})
                </span>
              )}
            </h2>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="p-1 text-charcoal/40 hover:text-charcoal transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto px-6">
          {!mounted || items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 py-12 text-center">
              <div className="w-16 h-16 bg-[#F5F2ED] flex items-center justify-center">
                <ShoppingBag size={24} className="text-charcoal/25" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-cormorant text-[20px] font-normal text-charcoal mb-1.5">
                  Your bag is empty
                </p>
                <p className="font-dm-sans text-[12px] text-charcoal/45 leading-relaxed">
                  Discover our beautiful collections and add your favourites.
                </p>
              </div>
              <button
                onClick={closeCart}
                className="font-dm-sans text-[11px] uppercase tracking-[0.15em] border border-[#E8E4DE] text-charcoal/60 px-6 py-3 hover:border-charcoal hover:text-charcoal transition-colors mt-1"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div>
              {items.map((item) => (
                <CartItem
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}`}
                  item={item}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer / Summary */}
        {mounted && items.length > 0 && (
          <div className="border-t border-[#E8E4DE] px-6 py-5 space-y-4">
            <div className="space-y-2 font-dm-sans text-[13px]">
              <div className="flex justify-between">
                <span className="text-charcoal/55">Subtotal</span>
                <span className="text-charcoal font-medium">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal/55">Shipping</span>
                <span className="text-charcoal">Complimentary</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-[#E8E4DE]">
                <span className="text-[11px] uppercase tracking-[0.1em] text-charcoal/55">Total</span>
                <span className="text-[15px] font-medium text-charcoal">{formatPrice(total)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Link
                href="/cart"
                onClick={closeCart}
                className="font-dm-sans text-[12px] uppercase tracking-[0.2em] bg-[#111111] text-white py-3.5 w-full text-center block hover:bg-[#2a2a2a] transition-colors"
              >
                View Full Bag
              </Link>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="font-dm-sans text-[12px] uppercase tracking-[0.2em] border border-[#E8E4DE] text-charcoal/60 py-3.5 w-full text-center block hover:border-charcoal hover:text-charcoal transition-colors"
              >
                Checkout
              </Link>
            </div>

            <p className="text-center font-dm-sans text-[11px] text-charcoal/30">
              SSL encrypted · Secure checkout
            </p>
          </div>
        )}
      </div>
    </>
  );
}
