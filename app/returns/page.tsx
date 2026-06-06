import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Returns & Exchanges",
  description: "Al Imran Fabrics 30-day hassle-free return and exchange policy.",
};

export default function ReturnsPage() {
  return (
    <div className="bg-cream min-h-screen pt-28 md:pt-36">
      <div className="max-w-3xl mx-auto px-4 md:px-6 pb-20">

        {/* ── Breadcrumb + Header ── */}
        <div className="mb-10">
          <div className="mb-6">
            <Breadcrumb items={[{ label: "Returns & Exchanges" }]} />
          </div>
          <p className="font-dm-sans text-[11px] uppercase tracking-[0.22em] text-charcoal/40 mb-3">Our Policy</p>
          <h1 className="font-cormorant text-[36px] md:text-[48px] font-normal text-charcoal mb-4">
            Returns & Exchanges
          </h1>
          <p className="font-dm-sans text-[14px] text-charcoal/55 leading-relaxed">
            We want you to love your purchase. If something isn&apos;t right, we make it easy to return or exchange within 30 days.
          </p>
        </div>

        {/* ── Eligible / Not eligible ── */}
        <div className="grid md:grid-cols-2 gap-px bg-[#E8E4DE] mb-12">
          <div className="bg-white p-7">
            <p className="font-dm-sans text-[10px] uppercase tracking-[0.18em] text-charcoal/40 mb-4">Eligible for Return</p>
            <ul className="space-y-3">
              {[
                "Items in original, unworn condition with tags attached",
                "Received within 30 days of delivery date",
                "Items with manufacturing defects or incorrect sizing",
                "Items that do not match the website description",
                "Items damaged during shipping",
              ].map((item) => (
                <li key={item} className="flex gap-3 font-dm-sans text-[13px] text-charcoal/60">
                  <span className="text-charcoal/25 flex-shrink-0">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-7">
            <p className="font-dm-sans text-[10px] uppercase tracking-[0.18em] text-charcoal/40 mb-4">Not Eligible for Return</p>
            <ul className="space-y-3">
              {[
                "Custom stitched or made-to-measure items",
                "Items showing signs of wear, washing, or alteration",
                "Items returned after the 30-day window",
                "Items purchased during final sale events",
                "Accessories, undergarments, and intimate wear",
              ].map((item) => (
                <li key={item} className="flex gap-3 font-dm-sans text-[13px] text-charcoal/60">
                  <span className="text-charcoal/25 flex-shrink-0">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── How to return ── */}
        <div className="mb-12 border-t border-[#E8E4DE] pt-10">
          <p className="font-dm-sans text-[11px] uppercase tracking-[0.22em] text-charcoal/40 mb-6">How to Initiate a Return</p>
          <div className="divide-y divide-[#E8E4DE]">
            {[
              { step: "01", title: "Contact Us", desc: "Email support@alimranfabrics.com or WhatsApp us with your order number and reason for return." },
              { step: "02", title: "Get Approval", desc: "We'll review your request and respond within 24 hours with approval and instructions." },
              { step: "03", title: "Ship It Back", desc: "Pack the item securely in its original packaging. Contact us to arrange the return shipment." },
              { step: "04", title: "Refund or Exchange", desc: "Once received and inspected, your refund will be processed or your exchange shipped within 5–7 days." },
            ].map((s) => (
              <div key={s.step} className="flex gap-6 py-5 items-start">
                <span className="font-cormorant text-[22px] font-normal text-charcoal/25 flex-shrink-0 w-8 leading-none">
                  {s.step}
                </span>
                <div>
                  <p className="font-dm-sans text-[13px] font-medium text-charcoal mb-1">{s.title}</p>
                  <p className="font-dm-sans text-[13px] text-charcoal/55 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="border-t border-[#E8E4DE] pt-10">
          <p className="font-dm-sans text-[13px] text-charcoal/50 mb-4">
            Need help with a return or exchange?
          </p>
          <Link
            href="/contact"
            className="inline-block font-dm-sans text-[12px] uppercase tracking-[0.2em] border border-[#1A1A1A] text-charcoal px-7 py-3.5 hover:bg-charcoal hover:text-white transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
