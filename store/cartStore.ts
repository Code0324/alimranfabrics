"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartStore, CartItem, Product, ProductColor } from "@/types";

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product: Product, size: string, color: ProductColor) => {
        const { items } = get();
        const existingIndex = items.findIndex(
          (item) =>
            item.product.id === product.id &&
            item.selectedSize === size &&
            item.selectedColor.name === color.name
        );

        if (existingIndex > -1) {
          const updated = [...items];
          updated[existingIndex].quantity += 1;
          set({ items: updated, isOpen: true });
        } else {
          set({
            items: [...items, { product, quantity: 1, selectedSize: size, selectedColor: color }],
            isOpen: true,
          });
        }
      },

      removeItem: (productId: string, size: string, colorName: string) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.product.id === productId &&
                item.selectedSize === size &&
                item.selectedColor.name === colorName
              )
          ),
        }));
      },

      updateQuantity: (productId: string, size: string, colorName: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId, size, colorName);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor.name === colorName
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      getTotal: () => {
        const { items } = get();
        return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      },

      getItemCount: () => {
        const { items } = get();
        return items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: "al-imran-cart",
    }
  )
);
