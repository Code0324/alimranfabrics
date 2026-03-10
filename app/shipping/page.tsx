import type { Metadata } from "next";
import Link from "next/link";
import { Truck, Clock, Globe, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Shipping Info",
  description: "Learn about Al Imran Fabrics shipping rates, delivery times, and our free USA shipping policy.",
};

const shippingZones = [
  {
    region: "United States",
    standard: "Free",
    express: "$25",
    delivery: "7–14 business days (standard) / 3–5 days (express)",
    note: "No customs duties. We handle everything.",
  },
  {
    region: "Canada",
    standard: "$15",
    express: "$35",
    delivery: "10–18 business days (standard) / 5–7 days (express)",
    note: "Import duties may apply and are the buyer's responsibility.",
  },
  {
    region: "United Kingdom",
    standard: "$20",
    express: "$40",
    delivery: "10–18 business days (standard) / 5–7 days (express)",
    note: "Import duties may apply and are the buyer's responsibility.",
  },
  {
    region: "Rest of World",
    standard: "$25",
    express: "$50",
    delivery: "14–21 business days (standard) / 7–10 days (express)",
    note: "Import duties vary by country and are the buyer's responsibility.",
  },
];

export default function ShippingPage() {
  return (
    <div className="pt-28 md:pt-32 min-h-screen bg-ivory">
      {/* Hero */}
      <section className="py-14 px-4 text-center" style={{ backgroundColor: "#070D38" }}>
        <div className="flex items-center justify-center gap-4 mb-3">
          <span className="w-12 h-px" style={{ backgroundColor: "rgba(201,168,76,0.6)" }} />
          <span className="font-inter text-xs uppercase tracking-[0.3em]" style={{ color: "#C9A84C" }}>
            Delivery
          </span>
          <span className="w-12 h-px" style={{ backgroundColor: "rgba(201,168,76,0.6)" }} />
        </div>
        <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-3" style={{ color: "#FAF7F2" }}>
          Shipping Information
        </h1>
        <p className="font-inter text-sm max-w-md mx-auto" style={{ color: "rgba(250,247,242,0.7)" }}>
          We ship worldwide. USA orders are always free — no hidden duties, no surprises.
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-16 space-y-14">
        {/* Highlights */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Truck, title: "Free USA Shipping", desc: "No minimum order required. Always free to the USA." },
            { icon: Clock, title: "Processing Time", desc: "Orders are processed within 1–3 business days." },
            { icon: Globe, title: "Ships Worldwide", desc: "We deliver to 50+ countries across 5 continents." },
            { icon: Shield, title: "Fully Tracked", desc: "Every order ships with real-time tracking updates." },
          ].map((item) => (
            <div key={item.title} className="bg-white p-6 shadow-card text-center">
              <div
                className="w-12 h-12 mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: "rgba(12,19,80,0.08)" }}
              >
                <item.icon size={22} style={{ color: "#C9A84C" }} />
              </div>
              <h3 className="font-playfair font-semibold text-charcoal mb-2">{item.title}</h3>
              <p className="font-inter text-xs text-charcoal/60">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Rates table */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-gold" />
            <h2 className="font-playfair text-2xl font-bold text-charcoal">Shipping Rates</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-inter">
              <thead>
                <tr style={{ backgroundColor: "#070D38", color: "#FAF7F2" }}>
                  {["Region", "Standard", "Express", "Delivery Time", "Notes"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-medium uppercase tracking-wide text-xs">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {shippingZones.map((row, i) => (
                  <tr key={row.region} style={{ backgroundColor: i % 2 === 0 ? "#FAF7F2" : "#FFFFFF" }}>
                    <td className="px-4 py-3 font-semibold text-charcoal">{row.region}</td>
                    <td className="px-4 py-3 font-semibold" style={{ color: row.standard === "Free" ? "#C9A84C" : "#2C2C2C" }}>
                      {row.standard}
                    </td>
                    <td className="px-4 py-3 text-charcoal/70">{row.express}</td>
                    <td className="px-4 py-3 text-charcoal/70">{row.delivery}</td>
                    <td className="px-4 py-3 text-charcoal/50 text-xs">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional info */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 shadow-card">
            <h3 className="font-playfair text-xl font-bold text-charcoal mb-4">Order Processing</h3>
            <ul className="space-y-3 font-inter text-sm text-charcoal/70">
              <li className="flex gap-2"><span className="text-gold font-bold mt-0.5">•</span> Orders placed before 2 PM PKT ship the same day.</li>
              <li className="flex gap-2"><span className="text-gold font-bold mt-0.5">•</span> Custom or embroidered pieces may take 5–7 extra days.</li>
              <li className="flex gap-2"><span className="text-gold font-bold mt-0.5">•</span> You will receive an email with tracking details once shipped.</li>
              <li className="flex gap-2"><span className="text-gold font-bold mt-0.5">•</span> We do not ship on Pakistani public holidays.</li>
            </ul>
          </div>
          <div className="bg-white p-8 shadow-card">
            <h3 className="font-playfair text-xl font-bold text-charcoal mb-4">USA Duty-Free Promise</h3>
            <ul className="space-y-3 font-inter text-sm text-charcoal/70">
              <li className="flex gap-2"><span className="text-gold font-bold mt-0.5">•</span> We cover all US customs duties and import taxes.</li>
              <li className="flex gap-2"><span className="text-gold font-bold mt-0.5">•</span> What you see at checkout is the final price — no surprises.</li>
              <li className="flex gap-2"><span className="text-gold font-bold mt-0.5">•</span> Packages are shipped via DHL Express or FedEx.</li>
              <li className="flex gap-2"><span className="text-gold font-bold mt-0.5">•</span> Signature required for orders over $300.</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="font-inter text-sm text-charcoal/60 mb-4">Have a question about your shipment?</p>
          <Link href="/contact" className="btn-gold px-8 py-3">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
