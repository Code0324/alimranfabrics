import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Payment Methods",
  description: "Secure, flexible, and trusted payment methods accepted at Al Imran Fabrics.",
};

// ── SVG icons ────────────────────────────────────────────────────────────────

function CreditCardIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10" stroke="#C9A96E" strokeWidth="1.5">
      <rect x="4" y="10" width="32" height="22" rx="3" />
      <line x1="4" y1="17" x2="36" y2="17" />
      <rect x="8" y="22" width="8" height="4" rx="1" />
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10" stroke="#C9A96E" strokeWidth="1.5">
      <rect x="4" y="10" width="32" height="22" rx="3" />
      <path d="M28 21a2 2 0 100 4 2 2 0 000-4z" fill="#C9A96E" stroke="none" />
      <path d="M28 10V8a2 2 0 00-2-2H8a2 2 0 00-2 2v2" />
    </svg>
  );
}

function BankIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10" stroke="#C9A96E" strokeWidth="1.5">
      <path d="M6 16l14-8 14 8" />
      <rect x="6" y="28" width="28" height="4" />
      <line x1="10" y1="16" x2="10" y2="28" />
      <line x1="20" y1="16" x2="20" y2="28" />
      <line x1="30" y1="16" x2="30" y2="28" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 mx-auto mb-3" stroke="#1A1A1A" strokeWidth="1.5">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 018 0v4" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 mx-auto mb-3" stroke="#1A1A1A" strokeWidth="1.5">
      <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.5C16.5 22.15 20 17.25 20 12V6l-8-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 mx-auto mb-3" stroke="#1A1A1A" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12l3 3 5-5" />
    </svg>
  );
}

// ── Inline payment method logos (text-based, SAYA minimal style) ─────────────

const PAYMENT_LOGOS = [
  { label: "VISA",       bg: "#1A1A96", text: "#fff",    font: "italic font-bold" },
  { label: "MC",         bg: "#EB001B", text: "#fff",    font: "font-bold"        },
  { label: "AMEX",       bg: "#007BC1", text: "#fff",    font: "font-bold"        },
  { label: "DISCOVER",   bg: "#FF6600", text: "#fff",    font: "font-bold text-[8px]" },
  { label: "PAYPAL",     bg: "#003087", text: "#fff",    font: "font-bold text-[9px]" },
  { label: "Apple Pay",  bg: "#000000", text: "#fff",    font: "font-medium text-[8px]" },
  { label: "Google Pay", bg: "#fff",    text: "#1A1A1A", font: "font-medium text-[8px] border border-[#E8E4DE]" },
];

// ── Payment method cards data ─────────────────────────────────────────────────

const PAYMENT_CARDS = [
  {
    icon: <CreditCardIcon />,
    title: "Credit & Debit Cards",
    desc: "Pay securely with Visa, Mastercard, American Express, Discover, or Diners Club. All transactions are SSL encrypted.",
    badge: "Instant",
    badgeClass: "bg-[#F0FDF4] text-[#16A34A]",
  },
  {
    icon: <WalletIcon />,
    title: "PayPal / Apple Pay / Google Pay",
    desc: "Fast, one-click checkout with your preferred digital wallet. No card details needed.",
    badge: "Instant",
    badgeClass: "bg-[#F0FDF4] text-[#16A34A]",
  },
  {
    icon: <BankIcon />,
    title: "Bank Transfer (Pakistan)",
    desc: "For Pakistan customers — direct bank transfer or EasyPaisa / JazzCash. Contact us on WhatsApp for account details.",
    badge: "1–2 Days",
    badgeClass: "bg-[#FFFBEB] text-[#D97706]",
  },
];

// ── Security items ────────────────────────────────────────────────────────────

const SECURITY_ITEMS = [
  {
    icon: <LockIcon />,
    title: "SSL Encrypted",
    desc: "All transactions secured with 256-bit SSL encryption",
  },
  {
    icon: <ShieldIcon />,
    title: "Fraud Protection",
    desc: "Industry-standard payment security protocols",
  },
  {
    icon: <CheckIcon />,
    title: "Trusted Checkout",
    desc: "Safe & secure for all international orders",
  },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function PaymentMethodsPage() {
  return (
    <div className="bg-cream min-h-screen pt-28 md:pt-36">

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 mb-8">
        <Breadcrumb items={[{ label: "Payment Methods" }]} />
      </div>

      {/* Header */}
      <div className="text-center px-4 mb-16">
        <h1 className="font-cormorant text-4xl font-normal text-charcoal mb-4">
          Payment Options
        </h1>
        <p className="font-dm-sans text-sm text-[#666]">
          Secure, flexible, and trusted payment methods
        </p>
      </div>

      {/* ── Section 1: We Accept ── */}
      <section className="bg-[#F5F2ED] py-12 mb-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <p className="font-dm-sans text-[11px] uppercase tracking-widest text-[#999] mb-8">
            Accepted Payment Methods
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {PAYMENT_LOGOS.map((logo) => (
              <div
                key={logo.label}
                className={`h-8 px-3 flex items-center justify-center rounded text-[10px] grayscale hover:grayscale-0 transition-all ${logo.font}`}
                style={{ backgroundColor: logo.bg, color: logo.text, minWidth: "48px" }}
              >
                {logo.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 2: Payment Cards ── */}
      <section className="max-w-4xl mx-auto px-4 md:px-6 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PAYMENT_CARDS.map((card) => (
            <div key={card.title} className="border border-[#E8E4DE] p-8 bg-white">
              {card.icon}
              <h3 className="font-dm-sans text-[15px] font-medium text-[#1A1A1A] mt-4 mb-2">
                {card.title}
              </h3>
              <p className="font-dm-sans text-[13px] text-[#666] leading-relaxed">
                {card.desc}
              </p>
              <span className={`inline-block font-dm-sans text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full mt-4 ${card.badgeClass}`}>
                {card.badge}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 3: Security ── */}
      <section className="bg-[#F5F2ED] py-12 mb-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <p className="font-dm-sans text-[11px] uppercase tracking-widest text-[#999] text-center mb-10">
            Your Security Matters
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {SECURITY_ITEMS.map((item) => (
              <div key={item.title}>
                {item.icon}
                <h4 className="font-dm-sans text-[13px] font-medium text-[#1A1A1A] mb-1">
                  {item.title}
                </h4>
                <p className="font-dm-sans text-[12px] text-[#666] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 pb-20 text-center">
        <p className="font-dm-sans text-[13px] text-charcoal/50 mb-4">
          Have a question about payments?
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://wa.me/923145690329"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-dm-sans text-[12px] uppercase tracking-[0.2em] bg-[#111111] text-white px-7 py-3.5 hover:bg-[#2a2a2a] transition-colors"
          >
            WhatsApp Us
          </a>
          <Link
            href="/contact"
            className="inline-block font-dm-sans text-[12px] uppercase tracking-[0.2em] border border-[#1A1A1A] text-charcoal px-7 py-3.5 hover:bg-charcoal hover:text-white transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>

    </div>
  );
}
