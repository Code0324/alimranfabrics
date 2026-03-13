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
        <div className="flex items-center justify-between px-6 py-5 border-b border-ivory-dark">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} style={{ color: "#C9A84C" }} />
            <h2 className="font-playfair text-lg font-semibold text-charcoal">
              Your Cart
              {count > 0 && (
                <span className="font-inter text-sm text-charcoal/50 ml-2 font-normal">
                  ({count} {count === 1 ? "item" : "items"})
                </span>
              )}
            </h2>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="p-2 hover:bg-ivory-dark rounded-full transition-colors text-charcoal/60 hover:text-charcoal"
          >
            <X size={18} />
          </button>
        </div>


        {/* Cart items */}
        <div className="flex-1 overflow-y-auto px-6">
          {!mounted || items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 py-12">
              <div className="w-20 h-20 bg-ivory-dark rounded-full flex items-center justify-center">
                <ShoppingBag size={32} className="text-charcoal/30" />
              </div>
              <div className="text-center">
                <h3 className="font-playfair text-lg font-semibold text-charcoal mb-1">
                  Your cart is empty
                </h3>
                <p className="font-inter text-sm text-charcoal/50">
                  Discover our beautiful collections and add your favorites.
                </p>
              </div>
              <button
                onClick={closeCart}
                className="btn-primary mt-2"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="divide-y divide-ivory-dark">
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
          <div className="border-t border-ivory-dark px-6 py-5 space-y-4">
            {/* Subtotal */}
            <div className="space-y-2">
              <div className="flex justify-between font-inter text-sm">
                <span className="text-charcoal/60">Subtotal</span>
                <span className="font-medium">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between font-inter text-sm">
                <span className="text-charcoal/60">Shipping</span>
                <span className="font-medium text-navy">Free</span>
              </div>
              <div className="flex justify-between font-inter font-bold text-base pt-2 border-t border-ivory-dark">
                <span>Total</span>
                <span style={{ color: "#C9A84C" }}>{formatPrice(total)}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2">
              <Link
                href="/cart"
                onClick={closeCart}
                className="btn-primary w-full text-center block"
              >
                View Full Cart
              </Link>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="btn-gold w-full text-center block"
              >
                Checkout
              </Link>
            </div>

            <p className="text-center font-inter text-xs text-charcoal/40">
              Secure checkout • SSL encrypted
            </p>
          </div>
        )}
      </div>
    </>
  );
}
