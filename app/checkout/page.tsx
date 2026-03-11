import type { Metadata } from "next";
import CheckoutContent from "@/components/checkout/CheckoutContent";

export const metadata: Metadata = {
  title: "Checkout — Al Imran Fabrics",
  description: "Complete your order securely.",
};

export default function CheckoutPage() {
  return (
    <div className="pt-28 md:pt-32 min-h-screen bg-ivory">
      <CheckoutContent />
    </div>
  );
}
