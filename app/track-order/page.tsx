"use client";

import { useState } from "react";
import Link from "next/link";
import { Package, Search } from "lucide-react";

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (orderNumber.trim() && email.trim()) {
      setSubmitted(true);
    }
  }

  return (
    <div className="pt-28 md:pt-32 min-h-screen bg-ivory">
      {/* Hero */}
      <section className="py-14 px-4 text-center" style={{ backgroundColor: "#070D38" }}>
        <div className="flex items-center justify-center gap-4 mb-3">
          <span className="w-12 h-px" style={{ backgroundColor: "rgba(201,168,76,0.6)" }} />
          <span className="font-inter text-xs uppercase tracking-[0.3em]" style={{ color: "#C9A84C" }}>
            Order Status
          </span>
          <span className="w-12 h-px" style={{ backgroundColor: "rgba(201,168,76,0.6)" }} />
        </div>
        <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-3" style={{ color: "#FAF7F2" }}>
          Track Your Order
        </h1>
        <p className="font-inter text-sm max-w-md mx-auto" style={{ color: "rgba(250,247,242,0.7)" }}>
          Enter your order number and email to get real-time updates on your delivery.
        </p>
      </section>

      <div className="max-w-xl mx-auto px-4 py-16">
        {!submitted ? (
          <div className="bg-white p-8 shadow-card">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-12 h-12 flex items-center justify-center"
                style={{ backgroundColor: "rgba(12,19,80,0.08)" }}
              >
                <Package size={22} style={{ color: "#C9A84C" }} />
              </div>
              <h2 className="font-playfair text-xl font-bold text-charcoal">Find My Order</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block font-inter text-xs font-semibold text-charcoal uppercase tracking-wide mb-2">
                  Order Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. AIF-2024-00123"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-ivory-dark font-inter text-sm text-charcoal
                             focus:outline-none focus:border-gold transition-colors"
                />
              </div>
              <div>
                <label className="block font-inter text-xs font-semibold text-charcoal uppercase tracking-wide mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="The email used to place the order"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-ivory-dark font-inter text-sm text-charcoal
                             focus:outline-none focus:border-gold transition-colors"
                />
              </div>
              <button type="submit" className="btn-gold w-full py-3 flex items-center justify-center gap-2">
                <Search size={16} />
                Track Order
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white p-8 shadow-card text-center">
            <div
              className="w-16 h-16 mx-auto mb-5 flex items-center justify-center"
              style={{ backgroundColor: "rgba(12,19,80,0.08)" }}
            >
              <Package size={28} style={{ color: "#C9A84C" }} />
            </div>
            <h2 className="font-playfair text-xl font-bold text-charcoal mb-3">
              Order #{orderNumber}
            </h2>
            <p className="font-inter text-sm text-charcoal/60 mb-6">
              We&apos;ve sent tracking details to <strong>{email}</strong>. Please check your inbox for a link to track your shipment in real time.
            </p>
            <p className="font-inter text-xs text-charcoal/40 mb-6">
              Didn&apos;t receive an email? Check your spam folder or contact our support team.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => { setSubmitted(false); setOrderNumber(""); setEmail(""); }}
                className="btn-outline px-6 py-2.5"
              >
                Track Another Order
              </button>
              <Link href="/contact" className="btn-gold px-6 py-2.5">
                Contact Support
              </Link>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="font-inter text-sm text-charcoal/50">
            Can&apos;t find your order? <Link href="/contact" className="text-gold hover:underline">Contact us</Link> and we&apos;ll help you out.
          </p>
        </div>
      </div>
    </div>
  );
}
