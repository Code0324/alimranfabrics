"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Minus } from "lucide-react";
import { Product } from "@/types";

type Panel = "Description" | "Fabric & Care" | "Shipping Info";
const panels: Panel[] = ["Description", "Fabric & Care", "Shipping Info"];

export default function ProductTabs({ product }: { product: Product }) {
  const [open, setOpen] = useState<Panel | null>("Description");
  const toggle = (p: Panel) => setOpen((prev) => (prev === p ? null : p));

  return (
    <div className="border-t border-[#E8E4DE]">
      {panels.map((panel) => (
        <div key={panel} className="border-b border-[#E8E4DE]">
          {/* ── Accordion header ── */}
          <button
            onClick={() => toggle(panel)}
            className="w-full flex items-center justify-between py-4 text-left"
          >
            <span className="font-dm-sans text-[12px] uppercase tracking-[0.18em] text-charcoal font-medium">
              {panel}
            </span>
            {open === panel
              ? <Minus size={14} className="text-charcoal/50 flex-shrink-0" />
              : <Plus  size={14} className="text-charcoal/50 flex-shrink-0" />}
          </button>

          {/* ── Accordion content ── */}
          {open === panel && (
            <div className="pb-6 animate-fade-in">
              {panel === "Description" && (
                <div className="max-w-2xl">
                  <p className="font-dm-sans text-[13px] text-charcoal/60 leading-relaxed mb-5">
                    {product.description}
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { label: "Category",   value: product.category },
                      { label: "Fabric",     value: product.fabric },
                      { label: "Collection", value: product.collection || "—" },
                      { label: "SKU",        value: product.sku },
                    ].map((d) => (
                      <div key={d.label} className="flex gap-3 border-b border-[#E8E4DE] pb-2">
                        <span className="font-dm-sans text-[11px] text-charcoal/40 uppercase tracking-[0.1em] w-24 flex-shrink-0">
                          {d.label}
                        </span>
                        <span className="font-dm-sans text-[12px] text-charcoal">{d.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {panel === "Fabric & Care" && (
                <div className="max-w-2xl space-y-4">
                  <div>
                    <p className="font-dm-sans text-[11px] uppercase tracking-[0.15em] text-charcoal mb-2">
                      Fabric Composition
                    </p>
                    <p className="font-dm-sans text-[13px] text-charcoal/60 leading-relaxed">
                      Premium {product.fabric} — sourced from Pakistan&apos;s finest mills and hand-inspected for quality before crafting.
                    </p>
                  </div>
                  <div>
                    <p className="font-dm-sans text-[11px] uppercase tracking-[0.15em] text-charcoal mb-2">
                      Care Instructions
                    </p>
                    <p className="font-dm-sans text-[13px] text-charcoal/60 leading-relaxed">
                      {product.careInstructions}
                    </p>
                  </div>
                  <div>
                    <p className="font-dm-sans text-[11px] uppercase tracking-[0.15em] text-charcoal mb-2">
                      Storage
                    </p>
                    <p className="font-dm-sans text-[13px] text-charcoal/60 leading-relaxed">
                      Store in a cool, dry place. Use breathable garment bags for embroidered pieces to preserve the embellishment.
                    </p>
                  </div>
                </div>
              )}

              {panel === "Shipping Info" && (
                <div className="max-w-2xl space-y-4">
                  {[
                    { title: "Worldwide Shipping",   desc: "We ship globally. Delivery in 7–18 business days depending on location." },
                    { title: "Order Processing",     desc: "All orders processed within 2–3 business days. Tracking info sent via email." },
                    { title: "Returns & Exchanges",  desc: "30-day return window. Items must be unworn in original condition." },
                  ].map((item) => (
                    <div key={item.title} className="border-b border-[#E8E4DE] pb-4">
                      <p className="font-dm-sans text-[11px] uppercase tracking-[0.15em] text-charcoal mb-1.5">
                        {item.title}
                      </p>
                      <p className="font-dm-sans text-[13px] text-charcoal/55 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                  <Link
                    href="/contact"
                    className="inline-block font-dm-sans text-[12px] text-charcoal/50 underline underline-offset-4 hover:text-charcoal transition-colors"
                  >
                    Questions? Contact our support team →
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
