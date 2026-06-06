"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, ArrowLeft, Truck, Lock } from "lucide-react";
import CartItem from "@/components/cart/CartItem";
import ProductCard from "@/components/ui/ProductCard";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import { products } from "@/data/products";

// ── Payment method types ──────────────────────────────────────────────────────

type PaymentMethod = "card" | "bank" | "whatsapp";

interface PaymentOption {
  id: PaymentMethod;
  emoji: string;
  label: string;
  sub: string;
}

const PAYMENT_OPTIONS: PaymentOption[] = [
  { id: "card",      emoji: "💳", label: "Credit / Debit Card",       sub: "Visa, Mastercard, AmEx"          },
  { id: "bank",      emoji: "🏦", label: "Bank Transfer (Pakistan)",   sub: "EasyPaisa, JazzCash, Bank"       },
  { id: "whatsapp",  emoji: "💬", label: "WhatsApp Order",             sub: "Place order via WhatsApp"        },
];

// ── Small payment brand badges ────────────────────────────────────────────────

const BRAND_PILLS = ["VISA", "MC", "AMEX", "PayPal"];

// ── Radio card ───────────────────────────────────────────────────────────────

function RadioCard({
  option,
  selected,
  onSelect,
}: {
  option: PaymentOption;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full flex items-center gap-3 p-3 text-left transition-colors border
        ${selected
          ? "border-[#1A1A1A] bg-[#FAFAF9]"
          : "border-[#E8E4DE] hover:border-[#aaa] bg-white"}`}
    >
      {/* Radio dot */}
      <span className={`flex-shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center
        ${selected ? "border-[#1A1A1A]" : "border-[#ccc]"}`}>
        {selected && <span className="w-2 h-2 rounded-full bg-[#1A1A1A]" />}
      </span>
      <span className="text-base">{option.emoji}</span>
      <span className="flex-1 min-w-0">
        <span className="block font-dm-sans text-[13px] font-medium text-[#1A1A1A]">
          {option.label}
        </span>
        <span className="block font-dm-sans text-[11px] text-[#999]">
          {option.sub}
        </span>
      </span>
    </button>
  );
}

// ── Card form ─────────────────────────────────────────────────────────────────

function CardForm() {
  return (
    <div className="mt-3 space-y-3 border border-[#E8E4DE] p-4 bg-[#FAFAF9]">
      <div>
        <label className="block font-dm-sans text-[10px] uppercase tracking-widest text-[#999] mb-1">
          Card Number
        </label>
        <input
          type="text"
          placeholder="1234 5678 9012 3456"
          maxLength={19}
          className="w-full border-b border-[#E8E4DE] pb-2 font-dm-sans text-[13px] text-charcoal placeholder:text-charcoal/30 bg-transparent focus:outline-none focus:border-charcoal/50 transition-colors"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block font-dm-sans text-[10px] uppercase tracking-widest text-[#999] mb-1">
            Expiry (MM/YY)
          </label>
          <input
            type="text"
            placeholder="MM / YY"
            maxLength={7}
            className="w-full border-b border-[#E8E4DE] pb-2 font-dm-sans text-[13px] text-charcoal placeholder:text-charcoal/30 bg-transparent focus:outline-none focus:border-charcoal/50 transition-colors"
          />
        </div>
        <div>
          <label className="block font-dm-sans text-[10px] uppercase tracking-widest text-[#999] mb-1">
            CVV
          </label>
          <input
            type="text"
            placeholder="•••"
            maxLength={4}
            className="w-full border-b border-[#E8E4DE] pb-2 font-dm-sans text-[13px] text-charcoal placeholder:text-charcoal/30 bg-transparent focus:outline-none focus:border-charcoal/50 transition-colors"
          />
        </div>
      </div>
      <div>
        <label className="block font-dm-sans text-[10px] uppercase tracking-widest text-[#999] mb-1">
          Cardholder Name
        </label>
        <input
          type="text"
          placeholder="As on card"
          className="w-full border-b border-[#E8E4DE] pb-2 font-dm-sans text-[13px] text-charcoal placeholder:text-charcoal/30 bg-transparent focus:outline-none focus:border-charcoal/50 transition-colors"
        />
      </div>
      <div className="flex items-center gap-1.5 pt-1">
        <Lock size={11} className="text-[#999]" strokeWidth={1.5} />
        <span className="font-dm-sans text-[10px] text-[#999]">Secured by SSL</span>
      </div>
    </div>
  );
}

// ── Bank transfer info ────────────────────────────────────────────────────────

function BankInfo() {
  return (
    <div className="mt-3 bg-[#FAF7F2] border border-[#E8E4DE] p-4 font-dm-sans text-[12px] text-[#444] leading-relaxed space-y-1">
      <p className="font-medium text-charcoal mb-2">After placing order, transfer to:</p>
      <p>🏦 <span className="font-medium">Bank:</span> HBL / MCB / Meezan Bank</p>
      <p>👤 <span className="font-medium">Account Title:</span> Al Imran Fabrics</p>
      <p>🔢 <span className="font-medium">Account #:</span> XXXXXXXXXXXX</p>
      <p>📱 <span className="font-medium">Send screenshot to WhatsApp:</span>{" "}
        <a
          href="https://wa.me/923145690329"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-charcoal"
        >
          +92 314 5690329
        </a>
      </p>
      <p className="mt-2 text-[#999] italic">
        Order confirmed after payment verification (1–2 hrs)
      </p>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function CartPageContent() {
  const { items, getTotal, getItemCount } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");

  useEffect(() => { setMounted(true); }, []);

  const total = mounted ? getTotal() : 0;
  const count = mounted ? getItemCount() : 0;

  const upsellProducts = products
    .filter((p) => !items.find((i) => i.product.id === p.id))
    .slice(0, 4);

  // Build WhatsApp message from cart items
  const buildWhatsAppMessage = () => {
    const lines = items.map(
      (i) => `• ${i.product.name} (${i.selectedSize}, ${i.selectedColor.name}) × ${i.quantity}`
    );
    const msg = `Hi! I'd like to order:\n${lines.join("\n")}\nTotal: ${formatPrice(total)}`;
    return `https://wa.me/923145690329?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">

      {/* Back link */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-dm-sans text-[11px] uppercase tracking-[0.15em] text-charcoal/40 hover:text-charcoal transition-colors"
        >
          <ArrowLeft size={13} />
          Continue Shopping
        </Link>
      </div>

      {/* Heading */}
      <div className="mb-8 pb-4 border-b border-[#E8E4DE]">
        <h1 className="font-cormorant text-[32px] md:text-[40px] font-normal text-charcoal">
          Shopping Bag
          {count > 0 && (
            <span className="font-dm-sans text-[14px] font-normal text-charcoal/40 ml-3">
              {count} {count === 1 ? "item" : "items"}
            </span>
          )}
        </h1>
      </div>

      {!mounted || items.length === 0 ? (
        /* ── Empty state ── */
        <div className="text-center py-24">
          <div className="w-20 h-20 bg-[#F5F2ED] flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={30} className="text-charcoal/25" strokeWidth={1.5} />
          </div>
          <h2 className="font-cormorant text-[24px] font-normal text-charcoal mb-3">
            Your bag is empty
          </h2>
          <p className="font-dm-sans text-[13px] text-charcoal/50 mb-8 max-w-xs mx-auto leading-relaxed">
            Looks like you haven&apos;t added anything yet. Explore our beautiful collections.
          </p>
          <Link
            href="/collections/women"
            className="inline-block font-dm-sans text-[12px] uppercase tracking-[0.2em] bg-[#111111] text-white px-8 py-4 hover:bg-[#2a2a2a] transition-colors"
          >
            Browse Collections
          </Link>
        </div>
      ) : (
        /* ── Cart + Summary ── */
        <div className="grid lg:grid-cols-[1fr_360px] gap-10 items-start">

          {/* Left — Cart items */}
          <div>
            {/* Shipping notice */}
            <div className="flex items-center gap-3 bg-[#F5F2ED] border border-[#E8E4DE] px-5 py-3 mb-6">
              <Truck size={14} className="text-charcoal/40 flex-shrink-0" strokeWidth={1.5} />
              <p className="font-dm-sans text-[12px] text-charcoal/60">
                <span className="text-charcoal font-medium">Complimentary shipping</span> on all orders · Delivered in 7–18 business days
              </p>
            </div>

            {/* Items */}
            <div className="bg-white border border-[#E8E4DE]">
              <div className="px-6 divide-y-0">
                {items.map((item) => (
                  <CartItem
                    key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}`}
                    item={item}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right — Order summary */}
          <div className="lg:sticky lg:top-36">
            <div className="bg-white border border-[#E8E4DE] p-6">
              <h2 className="font-cormorant text-[20px] font-normal text-charcoal mb-5 pb-4 border-b border-[#E8E4DE]">
                Order Summary
              </h2>

              <div className="space-y-3 font-dm-sans text-[13px] mb-5">
                <div className="flex justify-between">
                  <span className="text-charcoal/55">Subtotal ({count} {count === 1 ? "item" : "items"})</span>
                  <span className="text-charcoal font-medium">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/55">Shipping</span>
                  <span className="text-charcoal">Complimentary</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/55">Duties & Taxes</span>
                  <span className="text-charcoal">Calculated at checkout</span>
                </div>
              </div>

              <div className="flex justify-between font-dm-sans py-4 border-t border-b border-[#E8E4DE] mb-5">
                <span className="text-[13px] uppercase tracking-[0.1em] text-charcoal/60">Total</span>
                <span className="text-[16px] font-medium text-charcoal">{formatPrice(total)}</span>
              </div>

              {/* ── Payment Method Selector ── */}
              <div className="mb-5">
                <p className="font-dm-sans text-[11px] uppercase tracking-widest text-[#999] mb-3">
                  Select Payment Method
                </p>
                <div className="space-y-1.5">
                  {PAYMENT_OPTIONS.map((opt) => (
                    <RadioCard
                      key={opt.id}
                      option={opt}
                      selected={paymentMethod === opt.id}
                      onSelect={() => setPaymentMethod(opt.id)}
                    />
                  ))}
                </div>

                {/* Conditional UI */}
                {paymentMethod === "card"      && <CardForm />}
                {paymentMethod === "bank"      && <BankInfo />}
              </div>

              {/* ── Action buttons ── */}
              <div className="space-y-2.5">
                {paymentMethod === "whatsapp" ? (
                  <a
                    href={buildWhatsAppMessage()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 font-dm-sans text-[12px] uppercase tracking-[0.2em] bg-[#25D366] text-white py-4 hover:bg-[#1ebe5d] transition-colors"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Send Order on WhatsApp
                  </a>
                ) : (
                  <Link
                    href="/checkout"
                    className="w-full flex items-center justify-center font-dm-sans text-[12px] uppercase tracking-[0.2em] bg-[#111111] text-white py-4 hover:bg-[#2a2a2a] transition-colors"
                  >
                    Proceed to Checkout
                  </Link>
                )}
                <Link
                  href="/"
                  className="w-full flex items-center justify-center font-dm-sans text-[12px] uppercase tracking-[0.2em] border border-[#E8E4DE] text-charcoal/60 py-4 hover:border-[#1A1A1A] hover:text-charcoal transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Promo code */}
              <div className="mt-5 pt-5 border-t border-[#E8E4DE]">
                <p className="font-dm-sans text-[11px] uppercase tracking-[0.15em] text-charcoal/40 mb-2">Promo Code</p>
                <div className="flex gap-0">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2.5 border border-[#E8E4DE] font-dm-sans text-[12px] text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-charcoal/40 transition-colors"
                  />
                  <button className="px-4 py-2.5 bg-[#111111] text-white font-dm-sans text-[11px] uppercase tracking-[0.12em] hover:bg-[#2a2a2a] transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              {/* Payment icons row */}
              <div className="mt-4 pt-4 border-t border-[#E8E4DE]">
                <div className="flex items-center justify-center gap-2 mb-1.5">
                  {BRAND_PILLS.map((b) => (
                    <span
                      key={b}
                      className="font-dm-sans text-[8px] font-bold px-1.5 py-0.5 border border-[#E8E4DE] text-charcoal/40 rounded"
                    >
                      {b}
                    </span>
                  ))}
                </div>
                <p className="font-dm-sans text-[10px] text-charcoal/35 text-center flex items-center justify-center gap-1">
                  <Lock size={10} strokeWidth={1.5} />
                  Secure Checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── You May Also Like ── */}
      {upsellProducts.length > 0 && (
        <div className="mt-20 mb-10">
          <div className="flex items-end justify-between mb-6 border-b border-[#E8E4DE] pb-4">
            <div>
              <p className="font-dm-sans text-[11px] uppercase tracking-[0.22em] text-charcoal/40 mb-1">
                Complete Your Look
              </p>
              <h2 className="font-cormorant text-[26px] font-normal text-charcoal">
                You May Also Like
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#E8E4DE]">
            {upsellProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
