import type { Metadata } from "next";
import Link from "next/link";
import { RotateCcw, CheckCircle, XCircle, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Returns & Exchanges",
  description: "Al Imran Fabrics 30-day hassle-free return and exchange policy.",
};

export default function ReturnsPage() {
  return (
    <div className="pt-28 md:pt-32 min-h-screen bg-ivory">
      {/* Hero */}
      <section className="py-14 px-4 text-center" style={{ backgroundColor: "#070D38" }}>
        <div className="flex items-center justify-center gap-4 mb-3">
          <span className="w-12 h-px" style={{ backgroundColor: "rgba(201,168,76,0.6)" }} />
          <span className="font-inter text-xs uppercase tracking-[0.3em]" style={{ color: "#C9A84C" }}>
            Our Policy
          </span>
          <span className="w-12 h-px" style={{ backgroundColor: "rgba(201,168,76,0.6)" }} />
        </div>
        <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-3" style={{ color: "#FAF7F2" }}>
          Returns &amp; Exchanges
        </h1>
        <p className="font-inter text-sm max-w-md mx-auto" style={{ color: "rgba(250,247,242,0.7)" }}>
          We want you to love your purchase. If something isn&apos;t right, we make it easy to return or exchange.
        </p>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-16 space-y-14">
        {/* Key points */}
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { icon: Clock, title: "30-Day Window", desc: "You have 30 days from delivery to initiate a return or exchange." },
            { icon: RotateCcw, title: "Easy Process", desc: "Simply contact us and we'll arrange the return pickup at no extra cost for USA." },
            { icon: CheckCircle, title: "Quick Refunds", desc: "Refunds are processed within 5–7 business days of receiving your return." },
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

        {/* Eligible & Not Eligible */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 shadow-card">
            <div className="flex items-center gap-2 mb-5">
              <CheckCircle size={20} style={{ color: "#C9A84C" }} />
              <h2 className="font-playfair text-xl font-bold text-charcoal">Eligible for Return</h2>
            </div>
            <ul className="space-y-3 font-inter text-sm text-charcoal/70">
              <li className="flex gap-2"><span className="text-gold font-bold mt-0.5">•</span> Items in original, unworn condition with tags attached</li>
              <li className="flex gap-2"><span className="text-gold font-bold mt-0.5">•</span> Received within 30 days of delivery date</li>
              <li className="flex gap-2"><span className="text-gold font-bold mt-0.5">•</span> Items with manufacturing defects or incorrect sizing</li>
              <li className="flex gap-2"><span className="text-gold font-bold mt-0.5">•</span> Items that do not match the description on our website</li>
              <li className="flex gap-2"><span className="text-gold font-bold mt-0.5">•</span> Items damaged during shipping</li>
            </ul>
          </div>
          <div className="bg-white p-8 shadow-card">
            <div className="flex items-center gap-2 mb-5">
              <XCircle size={20} className="text-red-500" />
              <h2 className="font-playfair text-xl font-bold text-charcoal">Not Eligible for Return</h2>
            </div>
            <ul className="space-y-3 font-inter text-sm text-charcoal/70">
              <li className="flex gap-2"><span className="text-red-400 font-bold mt-0.5">•</span> Custom stitched or made-to-measure items</li>
              <li className="flex gap-2"><span className="text-red-400 font-bold mt-0.5">•</span> Items showing signs of wear, washing, or alteration</li>
              <li className="flex gap-2"><span className="text-red-400 font-bold mt-0.5">•</span> Items returned after the 30-day window</li>
              <li className="flex gap-2"><span className="text-red-400 font-bold mt-0.5">•</span> Items purchased during final sale events</li>
              <li className="flex gap-2"><span className="text-red-400 font-bold mt-0.5">•</span> Accessories, undergarments, and intimate wear</li>
            </ul>
          </div>
        </div>

        {/* How to return */}
        <div className="bg-white p-8 shadow-card">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-px bg-gold" />
            <h2 className="font-playfair text-xl font-bold text-charcoal">How to Initiate a Return</h2>
          </div>
          <div className="space-y-5">
            {[
              { step: "01", title: "Contact Us", desc: "Email support@alimranfabrics.com or WhatsApp us with your order number and reason for return." },
              { step: "02", title: "Get Approval", desc: "We'll review your request and respond within 24 hours with approval and instructions." },
              { step: "03", title: "Ship It Back", desc: "Pack the item securely in its original packaging. We'll arrange pickup for USA customers." },
              { step: "04", title: "Refund or Exchange", desc: "Once received and inspected, your refund will be processed or your exchange shipped within 5–7 days." },
            ].map((s) => (
              <div key={s.step} className="flex gap-5">
                <span
                  className="font-playfair text-2xl font-bold flex-shrink-0 w-10 leading-none"
                  style={{ color: "#C9A84C" }}
                >
                  {s.step}
                </span>
                <div>
                  <h4 className="font-playfair font-semibold text-charcoal mb-1">{s.title}</h4>
                  <p className="font-inter text-sm text-charcoal/60">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="font-inter text-sm text-charcoal/60 mb-4">Need help with a return or exchange?</p>
          <Link href="/contact" className="btn-gold px-8 py-3">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
