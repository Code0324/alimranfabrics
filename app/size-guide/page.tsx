import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
import SizeGuideTabs from "@/components/ui/SizeGuideTabs";

export const metadata: Metadata = {
  title: "Size Guide",
  description: "Find your perfect fit with Al Imran Fabrics size charts for women, men, and kids.",
};

export default function SizeGuidePage() {
  return (
    <div className="bg-cream min-h-screen pt-28 md:pt-36">
      <div className="max-w-4xl mx-auto px-4 md:px-6 pb-20">

        {/* ── Breadcrumb ── */}
        <div className="mb-8">
          <Breadcrumb items={[{ label: "Size Guide" }]} />
        </div>

        {/* ── Header ── */}
        <div className="text-center mb-12">
          <h1 className="font-cormorant text-4xl font-normal text-charcoal mb-4">
            Size Guide
          </h1>
          <p className="font-dm-sans text-sm text-[#666]">
            Find your perfect fit
          </p>
        </div>

        {/* ── How to Measure ── */}
        <div className="mb-12">
          <p className="font-dm-sans text-[11px] uppercase tracking-widest text-charcoal/40 text-center mb-8">
            How to Measure
          </p>
          <div className="grid grid-cols-3 gap-8 text-center">
            {[
              {
                label: "Bust",
                desc: "Measure around the fullest part of your chest, keeping the tape parallel to the ground.",
                svg: (
                  <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10 mx-auto" stroke="#1A1A1A" strokeWidth="1.5">
                    <circle cx="24" cy="24" r="20" strokeDasharray="4 3" />
                    <line x1="4" y1="24" x2="8" y2="24" />
                    <line x1="40" y1="24" x2="44" y2="24" />
                  </svg>
                ),
              },
              {
                label: "Waist",
                desc: "Measure around your natural waistline, above your belly button.",
                svg: (
                  <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10 mx-auto" stroke="#1A1A1A" strokeWidth="1.5">
                    <path d="M8 24 Q24 16 40 24" />
                    <path d="M8 24 Q24 32 40 24" />
                    <line x1="4" y1="24" x2="8" y2="24" />
                    <line x1="40" y1="24" x2="44" y2="24" />
                  </svg>
                ),
              },
              {
                label: "Hips",
                desc: "Measure around the fullest part of your hips, about 20cm below your waist.",
                svg: (
                  <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10 mx-auto" stroke="#1A1A1A" strokeWidth="1.5">
                    <ellipse cx="24" cy="28" rx="18" ry="12" />
                    <line x1="6" y1="28" x2="2" y2="28" />
                    <line x1="42" y1="28" x2="46" y2="28" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.label}>
                {item.svg}
                <p className="font-dm-sans text-[11px] uppercase tracking-widest font-medium mt-3 text-charcoal mb-2">
                  {item.label}
                </p>
                <p className="font-dm-sans text-[13px] text-[#666] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <hr className="border-[#E8E4DE] mb-10" />

        {/* ── Tabs + Tables ── */}
        <SizeGuideTabs />

        {/* ── Bottom note ── */}
        <p className="font-dm-sans text-[12px] text-[#999] mt-10 text-center italic leading-relaxed">
          All measurements are in inches. If you are between sizes, we recommend sizing up.{" "}
          For further assistance contact us on{" "}
          <a href="https://wa.me/923145690329" target="_blank" rel="noopener noreferrer" className="underline hover:text-charcoal">
            WhatsApp
          </a>{" "}
          or email at{" "}
          <a href="mailto:alimranfabrics786@gmail.com" className="underline hover:text-charcoal">
            alimranfabrics786@gmail.com
          </a>
        </p>

        {/* ── CTA ── */}
        <div className="text-center mt-10 border-t border-[#E8E4DE] pt-10">
          <p className="font-dm-sans text-[13px] text-charcoal/50 mb-4">
            Still unsure? Our team is happy to help you find the perfect fit.
          </p>
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
