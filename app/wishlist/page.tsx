"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlist } from "@/store/wishlistContext";
import { products } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";
import Breadcrumb from "@/components/ui/Breadcrumb";

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const wishlisted = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-cream pt-28 md:pt-36">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* ── Breadcrumb ── */}
        <div className="mb-6">
          <Breadcrumb items={[{ label: "Wishlist" }]} />
        </div>

        {/* ── Page header ── */}
        <div className="mb-8 pb-4 border-b border-[#E8E4DE]">
          <h1 className="font-cormorant text-[32px] md:text-[40px] font-normal text-charcoal">
            Saved Items
            {wishlisted.length > 0 && (
              <span className="font-dm-sans text-[14px] font-normal text-charcoal/40 ml-3">
                {wishlisted.length} {wishlisted.length === 1 ? "piece" : "pieces"}
              </span>
            )}
          </h1>
        </div>

        {wishlisted.length === 0 ? (
          /* ── Empty state ── */
          <div className="text-center py-24">
            <div className="w-20 h-20 bg-[#F5F2ED] flex items-center justify-center mx-auto mb-6">
              <Heart size={28} className="text-charcoal/25" strokeWidth={1.5} />
            </div>
            <h2 className="font-cormorant text-[24px] font-normal text-charcoal mb-3">
              Nothing saved yet
            </h2>
            <p className="font-dm-sans text-[13px] text-charcoal/50 mb-8 max-w-xs mx-auto leading-relaxed">
              Browse our collections and tap the heart icon on any product to save it here.
            </p>
            <Link
              href="/collections/women"
              className="inline-block font-dm-sans text-[12px] uppercase tracking-[0.2em] bg-[#111111] text-white px-8 py-4 hover:bg-[#2a2a2a] transition-colors"
            >
              Explore Collections
            </Link>
          </div>
        ) : (
          /* ── 4-col product grid ── */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-[#E8E4DE] mb-16">
            {wishlisted.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
