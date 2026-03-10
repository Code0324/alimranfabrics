"use client";

import Link from "next/link";
import { ShoppingBag, ArrowLeft, Truck } from "lucide-react";
import CartItem from "@/components/cart/CartItem";
import ProductCard from "@/components/ui/ProductCard";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import { products } from "@/data/products";

export default function CartPageContent() {
  const { items, getTotal, getItemCount } = useCartStore();
  const total = getTotal();
  const count = getItemCount();

  const upsellProducts = products
    .filter((p) => !items.find((i) => i.product.id === p.id))
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Back link */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/"
          className="text-charcoal/50 hover:text-gold transition-colors flex items-center gap-1.5 font-inter text-sm"
        >
          <ArrowLeft size={16} />
          Continue Shopping
        </Link>
      </div>

      <h1 className="font-playfair text-3xl md:text-4xl font-bold text-charcoal mb-8">
        Shopping Cart
        {count > 0 && (
          <span className="font-inter text-base font-normal text-charcoal/50 ml-3">
            ({count} {count === 1 ? "item" : "items"})
          </span>
        )}
      </h1>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-24 h-24 bg-ivory-dark flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={36} className="text-charcoal/30" />
          </div>
          <h2 className="font-playfair text-2xl font-semibold text-charcoal mb-3">
            Your cart is empty
          </h2>
          <p className="font-inter text-charcoal/60 text-sm mb-8 max-w-sm mx-auto">
            Looks like you haven&apos;t added anything yet. Explore our beautiful collections.
          </p>
          <Link href="/collections/women" className="btn-primary">
            Browse Collections
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Cart items */}
          <div className="lg:col-span-2">
            <div className="bg-navy/10 border border-navy/20 flex items-center gap-3 px-5 py-3 mb-6">
              <Truck size={16} className="text-gold flex-shrink-0" />
              <p className="font-inter text-sm text-navy">
                <span className="font-semibold">Free shipping</span> on all USA orders — no duty, no extra charges.
              </p>
            </div>

            <div className="bg-white p-6 shadow-card">
              <div className="divide-y divide-ivory-dark">
                {items.map((item) => (
                  <CartItem
                    key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}`}
                    item={item}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 shadow-card sticky top-28">
              <h2 className="font-playfair text-lg font-semibold text-charcoal mb-5 pb-4 border-b border-ivory-dark">
                Order Summary
              </h2>

              <div className="space-y-3 font-inter text-sm mb-5">
                <div className="flex justify-between">
                  <span className="text-charcoal/60">Subtotal ({count} items)</span>
                  <span className="font-medium">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/60">Shipping</span>
                  <span className="font-medium text-navy">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/60">Duties & Taxes</span>
                  <span className="font-medium text-navy">$0.00</span>
                </div>
              </div>

              <div className="flex justify-between font-inter font-bold text-base py-4 border-t border-ivory-dark mb-5">
                <span>Total</span>
                <span className="text-navy text-lg">{formatPrice(total)}</span>
              </div>

              <div className="space-y-3">
                <Link href="/checkout" className="btn-primary w-full text-center block">
                  Proceed to Checkout
                </Link>
                <Link href="/" className="btn-outline w-full text-center block">
                  Continue Shopping
                </Link>
              </div>

              {/* Promo code */}
              <div className="mt-5 pt-5 border-t border-ivory-dark">
                <p className="font-inter text-xs text-charcoal/50 mb-2 uppercase tracking-wide">Promo Code</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 border border-charcoal/20 font-inter text-xs focus:outline-none focus:border-gold transition-colors"
                  />
                  <button className="px-4 py-2 bg-charcoal text-ivory font-inter text-xs font-medium hover:bg-navy transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className="font-inter text-xs text-charcoal/40">🔒 Secure checkout • SSL encrypted</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upsell */}
      {upsellProducts.length > 0 && (
        <div className="mt-20">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-4 mb-3">
              <span className="w-12 h-px bg-gold" />
              <span className="font-inter text-gold text-xs uppercase tracking-[0.3em]">You May Also Like</span>
              <span className="w-12 h-px bg-gold" />
            </div>
            <h2 className="section-title">Complete Your Look</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {upsellProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
