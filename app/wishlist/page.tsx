"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlist } from "@/store/wishlistContext";
import { products } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";
import PageHero from "@/components/ui/PageHero";

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const wishlisted = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-ivory">
      <PageHero
        eyebrow="My Collection"
        title="My Wishlist"
        description={
          wishlisted.length > 0
            ? `You have ${wishlisted.length} saved item${wishlisted.length > 1 ? "s" : ""}`
            : "Save pieces you love to come back to them later"
        }
        backgroundImage="/image/women-banner-silk.png"
        breadcrumbItems={[{ label: "Wishlist" }]}
      />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {wishlisted.length === 0 ? (
          <div className="text-center py-24">
            <div
              className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full"
              style={{ backgroundColor: "rgba(12,19,80,0.08)" }}
            >
              <Heart size={36} style={{ color: "#C9A84C" }} />
            </div>
            <h2 className="font-playfair text-2xl font-bold text-charcoal mb-3">
              Your wishlist is empty
            </h2>
            <p className="font-inter text-sm text-charcoal/60 mb-8 max-w-sm mx-auto">
              Browse our collections and tap the heart icon on any product to save it here.
            </p>
            <Link href="/collections/women" className="btn-gold px-8 py-3">
              Explore Collections
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {wishlisted.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
