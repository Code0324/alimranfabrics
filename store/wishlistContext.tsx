"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { WishlistContextType } from "@/types";

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);

  const addToWishlist = useCallback((productId: string) => {
    setWishlist((prev) => [...prev, productId]);
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlist((prev) => prev.filter((id) => id !== productId));
  }, []);

  const isWishlisted = useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist]
  );

  const toggleWishlist = useCallback(
    (productId: string) => {
      if (wishlist.includes(productId)) {
        removeFromWishlist(productId);
      } else {
        addToWishlist(productId);
      }
    },
    [wishlist, addToWishlist, removeFromWishlist]
  );

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isWishlisted, toggleWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistContextType {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
