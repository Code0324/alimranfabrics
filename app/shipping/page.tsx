import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Shipping Info",
  description: "Learn about Al Imran Fabrics shipping rates, delivery times, and our worldwide shipping policy.",
};

const shippingZones = [
  { region: "United States",  standard: "Free",  express: "$25",  delivery: "7–14 business days",  note: "No customs duties handled" },
  { region: "Canada",         standard: "$15",   express: "$35",  delivery: "10–18 business days", note: "Import duties may apply" },
  { region: "United Kingdom", standard: "$20",   express: "$40",  delivery: "10–18 business days", note: "Import duties may apply" },
  { region: "Rest of World",  standard: "$25",   express: "$50",  delivery: "14–21 business days", note: "Duties vary by country" },
];

export default function ShippingPage() {
  return (
    <div className="bg-cream min-h-screen pt-28 md:pt-36">
      <div className="max-w-3xl mx-auto px-4 md:px-6 pb-20">

        {/* ── Breadcrumb + Header ── */}
        <div className="mb-10">
          <div className="mb-6">
            <Breadcrumb items={[{ label: "Shipping" }]} />
          </div>
          <p className="font-dm-sans text-[11px] uppercase tracking-[0.22em] text-charcoal/40 mb-3">Delivery</p>
          <h1 className="font-cormorant text-[36px] md:text-[48px] font-normal text-charcoal mb-4">
            Shipping Information
          </h1>
          <p className="font-dm-sans text-[14px] text-charcoal/55 leading-relaxed">
            We ship worldwide — premium Pakistani craftsmanship delivered to your door, wherever you are.
          </p>
        </div>

        {/* ── Key facts ── */}
        <div className="grid grid-cols-2 gap-px bg-[#E8E4DE] mb-12">
          {[
            { label: "Processing Time", value: "1–3 business days" },
            { label: "Shipping Partners", value: "DHL Express · FedEx" },
            { label: "Order Tracking", value: "Full tracking on every order" },
            { label: "Countries Served", value: "50+ worldwide" },
          ].map((f) => (
            <div key={f.label} className="bg-white p-6">
              <p className="font-dm-sans text-[10px] uppercase tracking-[0.18em] text-charcoal/35 mb-1.5">{f.label}</p>
              <p className="font-dm-sans text-[13px] text-charcoal font-medium">{f.value}</p>
            </div>
          ))}
        </div>

        {/* ── Rates table ── */}
        <div className="mb-12">
          <p className="font-dm-sans text-[11px] uppercase tracking-[0.22em] text-charcoal/40 mb-4">Shipping Rates</p>
          <div className="overflow-x-auto border border-[#E8E4DE]">
            <table className="w-full">
              <thead>
                <tr className="bg-[#F5F2ED]">
                  {["Region", "Standard", "Express", "Delivery Time", "Notes"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-dm-sans text-[10px] uppercase tracking-[0.15em] text-charcoal/50">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E4DE]">
                {shippingZones.map((row) => (
                  <tr key={row.region} className="bg-white">
                    <td className="px-4 py-3 font-dm-sans text-[13px] font-medium text-charcoal">{row.region}</td>
                    <td className="px-4 py-3 font-dm-sans text-[13px] text-charcoal">{row.standard}</td>
                    <td className="px-4 py-3 font-dm-sans text-[13px] text-charcoal/60">{row.express}</td>
                    <td className="px-4 py-3 font-dm-sans text-[13px] text-charcoal/60">{row.delivery}</td>
                    <td className="px-4 py-3 font-dm-sans text-[11px] text-charcoal/40">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Order processing ── */}
        <div className="mb-12 border-t border-[#E8E4DE] pt-10">
          <p className="font-dm-sans text-[11px] uppercase tracking-[0.22em] text-charcoal/40 mb-4">Order Processing</p>
          <ul className="space-y-3">
            {[
              "Orders placed before 2 PM PKT ship the same day.",
              "Custom or embroidered pieces may take 5–7 extra days.",
              "You will receive an email with tracking details once shipped.",
              "We do not ship on Pakistani public holidays.",
              "Signature required for orders over $300.",
            ].map((item) => (
              <li key={item} className="flex gap-3 font-dm-sans text-[13px] text-charcoal/60">
                <span className="text-charcoal/25 flex-shrink-0 mt-0.5">—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* ── CTA ── */}
        <div className="border-t border-[#E8E4DE] pt-10">
          <p className="font-dm-sans text-[13px] text-charcoal/50 mb-4">
            Have a question about your shipment?
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
