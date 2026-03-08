"use client";

import { useState } from "react";
import Link from "next/link";
import { Product } from "@/types";

type Tab = "Description" | "Fabric & Care" | "Shipping Info";
const tabs: Tab[] = ["Description", "Fabric & Care", "Shipping Info"];

export default function ProductTabs({ product }: { product: Product }) {
  const [activeTab, setActiveTab] = useState<Tab>("Description");

  return (
    <div>
      <div className="border-b border-ivory-dark flex gap-8 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`font-inter text-sm font-medium pb-4 uppercase tracking-wide whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab
                ? "border-emerald text-emerald"
                : "border-transparent text-charcoal/50 hover:text-charcoal"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="py-8">
        {activeTab === "Description" && (
          <div className="max-w-2xl">
            <p className="font-inter text-sm text-charcoal/70 leading-relaxed">{product.description}</p>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {[
                { label: "Category", value: product.category },
                { label: "Fabric", value: product.fabric },
                { label: "Collection", value: product.collection || "—" },
                { label: "SKU", value: product.sku },
              ].map((detail) => (
                <div key={detail.label} className="flex gap-2">
                  <span className="font-inter text-xs text-charcoal/50 uppercase tracking-wide w-24 flex-shrink-0">
                    {detail.label}
                  </span>
                  <span className="font-inter text-sm text-charcoal font-medium">{detail.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Fabric & Care" && (
          <div className="max-w-2xl space-y-5">
            <div>
              <h4 className="font-playfair font-semibold text-charcoal mb-2">Fabric Composition</h4>
              <p className="font-inter text-sm text-charcoal/70">
                Premium {product.fabric} — sourced from Pakistan&apos;s finest mills and hand-inspected for quality before crafting.
              </p>
            </div>
            <div>
              <h4 className="font-playfair font-semibold text-charcoal mb-2">Care Instructions</h4>
              <p className="font-inter text-sm text-charcoal/70">{product.careInstructions}</p>
            </div>
            <div>
              <h4 className="font-playfair font-semibold text-charcoal mb-2">Storage Tips</h4>
              <p className="font-inter text-sm text-charcoal/70">
                Store in a cool, dry place. Use breathable garment bags for embroidered or heavily embellished pieces to preserve the work.
              </p>
            </div>
          </div>
        )}

        {activeTab === "Shipping Info" && (
          <div className="max-w-2xl space-y-5">
            {[
              {
                title: "USA Orders",
                desc: "Free standard shipping (7–12 business days). No duties, no customs fees — we handle everything.",
                highlight: true,
              },
              {
                title: "Canada & International",
                desc: "Flat rate shipping available. Delivery in 10–18 business days. Duties may apply.",
                highlight: false,
              },
              {
                title: "Order Processing",
                desc: "All orders are processed within 2–3 business days. Tracking information sent via email.",
                highlight: false,
              },
              {
                title: "Returns & Exchanges",
                desc: "30-day return window. Items must be unworn in original condition. Contact us to initiate a return.",
                highlight: false,
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`flex gap-4 ${item.highlight ? "bg-emerald/5 border border-emerald/20 p-4" : ""}`}
              >
                <div className={`w-1.5 flex-shrink-0 mt-1 ${item.highlight ? "bg-emerald" : "bg-gold/40"}`} />
                <div>
                  <h4 className="font-playfair font-semibold text-charcoal mb-1">{item.title}</h4>
                  <p className="font-inter text-sm text-charcoal/60">{item.desc}</p>
                </div>
              </div>
            ))}
            <Link
              href="/contact"
              className="inline-block text-emerald font-inter text-sm hover:underline underline-offset-2"
            >
              Questions? Contact our support team →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
