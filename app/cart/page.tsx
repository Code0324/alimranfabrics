import type { Metadata } from "next";
import CartPageContent from "@/components/cart/CartPageContent";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "Review your selected items and proceed to checkout.",
};

export default function CartPage() {
  return (
    <div className="pt-28 md:pt-32 min-h-screen bg-ivory">
      <CartPageContent />
    </div>
  );
}
