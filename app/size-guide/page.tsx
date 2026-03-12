import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Size Guide",
  description: "Find your perfect fit with Al Imran Fabrics size charts for women, men, and kids.",
};

const womenSizes = [
  { size: "XS", chest: "32\"", waist: "26\"", hips: "35\"", length: "50\"" },
  { size: "S",  chest: "34\"", waist: "28\"", hips: "37\"", length: "51\"" },
  { size: "M",  chest: "36\"", waist: "30\"", hips: "39\"", length: "52\"" },
  { size: "L",  chest: "38\"", waist: "32\"", hips: "41\"", length: "53\"" },
  { size: "XL", chest: "40\"", waist: "34\"", hips: "43\"", length: "54\"" },
  { size: "2XL",chest: "42\"", waist: "36\"", hips: "45\"", length: "55\"" },
];

const menSizes = [
  { size: "S",  chest: "36\"", waist: "30\"", shoulder: "16.5\"", length: "42\"" },
  { size: "M",  chest: "38\"", waist: "32\"", shoulder: "17\"",   length: "43\"" },
  { size: "L",  chest: "40\"", waist: "34\"", shoulder: "17.5\"", length: "44\"" },
  { size: "XL", chest: "42\"", waist: "36\"", shoulder: "18\"",   length: "45\"" },
  { size: "2XL",chest: "44\"", waist: "38\"", shoulder: "18.5\"", length: "46\"" },
  { size: "3XL",chest: "46\"", waist: "40\"", shoulder: "19\"",   length: "47\"" },
];

export default function SizeGuidePage() {
  return (
    <div className="min-h-screen bg-ivory">
      <PageHero
        eyebrow="Fit & Measurements"
        title="Size Guide"
        description="All measurements are in inches. For the best fit, measure yourself and compare with the charts below."
        backgroundImage="/image/women-banner-silk.png"
        breadcrumbItems={[{ label: "Size Guide" }]}
      />

      <div className="max-w-5xl mx-auto px-4 py-16 space-y-16">
        {/* How to measure */}
        <div className="bg-white p-8 shadow-card">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-6 h-px bg-gold" />
            <h2 className="font-playfair text-xl font-bold text-charcoal">How to Measure</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 font-inter text-sm text-charcoal/70">
            <div>
              <p className="font-semibold text-charcoal mb-1">Chest / Bust</p>
              <p>Measure around the fullest part of your chest, keeping the tape parallel to the floor.</p>
            </div>
            <div>
              <p className="font-semibold text-charcoal mb-1">Waist</p>
              <p>Measure around your natural waistline, the narrowest part of your torso.</p>
            </div>
            <div>
              <p className="font-semibold text-charcoal mb-1">Hips</p>
              <p>Measure around the fullest part of your hips, about 8 inches below your waistline.</p>
            </div>
          </div>
        </div>

        {/* Women's table */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-gold" />
            <h2 className="font-playfair text-2xl font-bold text-charcoal">Women&apos;s Sizes</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-inter">
              <thead>
                <tr style={{ backgroundColor: "#070D38", color: "#FAF7F2" }}>
                  {["Size", "Chest", "Waist", "Hips", "Kameez Length"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-medium uppercase tracking-wide text-xs">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {womenSizes.map((row, i) => (
                  <tr key={row.size} style={{ backgroundColor: i % 2 === 0 ? "#FAF7F2" : "#FFFFFF" }}>
                    <td className="px-4 py-3 font-semibold text-charcoal">{row.size}</td>
                    <td className="px-4 py-3 text-charcoal/70">{row.chest}</td>
                    <td className="px-4 py-3 text-charcoal/70">{row.waist}</td>
                    <td className="px-4 py-3 text-charcoal/70">{row.hips}</td>
                    <td className="px-4 py-3 text-charcoal/70">{row.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Men's table */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-gold" />
            <h2 className="font-playfair text-2xl font-bold text-charcoal">Men&apos;s Sizes</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-inter">
              <thead>
                <tr style={{ backgroundColor: "#070D38", color: "#FAF7F2" }}>
                  {["Size", "Chest", "Waist", "Shoulder", "Kameez Length"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-medium uppercase tracking-wide text-xs">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {menSizes.map((row, i) => (
                  <tr key={row.size} style={{ backgroundColor: i % 2 === 0 ? "#FAF7F2" : "#FFFFFF" }}>
                    <td className="px-4 py-3 font-semibold text-charcoal">{row.size}</td>
                    <td className="px-4 py-3 text-charcoal/70">{row.chest}</td>
                    <td className="px-4 py-3 text-charcoal/70">{row.waist}</td>
                    <td className="px-4 py-3 text-charcoal/70">{row.shoulder}</td>
                    <td className="px-4 py-3 text-charcoal/70">{row.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-white p-10 shadow-card">
          <h3 className="font-playfair text-2xl font-bold text-charcoal mb-3">Still unsure about sizing?</h3>
          <p className="font-inter text-sm text-charcoal/60 mb-6 max-w-sm mx-auto">
            Our team is happy to help you find the perfect fit. Reach out via WhatsApp or email.
          </p>
          <Link href="/contact" className="btn-gold px-8 py-3">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
