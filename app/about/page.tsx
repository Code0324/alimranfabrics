import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Al Imran Fabrics — Pakistan's trusted multi-brand fashion distributor. Shop Khaadi, Gul Ahmed, Sana Safinaz, Maria B, and more, all in one place.",
};

const brands = [
  "Khaadi", "Gul Ahmed", "Sana Safinaz", "Maria B",
  "Sapphire", "Asim Jofa", "Zara Shahjahan", "Cross Stitch",
  "Rang Rasiya", "Bonanza Satrangi", "Zellbury", "Limelight",
];

const milestones = [
  { year: "2010", title: "Founded in Lahore", desc: "Al Imran Fabrics opens its first multi-brand store, carrying collections from Pakistan's top designers." },
  { year: "2015", title: "First International Orders", desc: "We began shipping to the Pakistani diaspora in the UK, Canada, and beyond." },
  { year: "2019", title: "Online Store Launch", desc: "Launched our e-commerce platform to serve customers across 20+ countries worldwide." },
  { year: "2022", title: "Worldwide Shipping", desc: "Expanded our delivery network to serve customers across 50+ countries." },
  { year: "2025", title: "15,000+ Happy Customers", desc: "Proud to serve a growing family of fashion lovers across 3 continents." },
];

export default function AboutPage() {
  return (
    <div className="bg-cream min-h-screen pt-28 md:pt-36">

      {/* ── Breadcrumb + Header ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-16">
        <div className="mb-6">
          <Breadcrumb items={[{ label: "About Us" }]} />
        </div>
        <div className="max-w-2xl">
          <p className="font-dm-sans text-[11px] uppercase tracking-[0.22em] text-charcoal/40 mb-3">Our Story</p>
          <h1 className="font-cormorant text-[38px] md:text-[52px] font-normal text-charcoal leading-tight mb-6">
            Pakistan&apos;s Best Brands,<br />All in One Place
          </h1>
          <p className="font-dm-sans text-[14px] text-charcoal/60 leading-relaxed max-w-xl">
            Al Imran Fabrics is your trusted multi-brand distributor for Pakistan&apos;s most celebrated fashion labels —
            bringing authentic collections straight to your door, wherever you are in the world.
          </p>
        </div>
      </div>

      {/* ── Who We Are ── */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-dm-sans text-[11px] uppercase tracking-[0.22em] text-charcoal/40 mb-4">Who We Are</p>
            <h2 className="font-cormorant text-[30px] md:text-[38px] font-normal text-charcoal mb-6 leading-tight">
              Your Trusted Multi-Brand Distributor
            </h2>
            <div className="space-y-4 font-dm-sans text-[14px] text-charcoal/60 leading-relaxed">
              <p>
                Al Imran Fabrics is not a manufacturer — we are proud distributors of Pakistan&apos;s finest fashion brands.
                Founded in Lahore, we bring together collections from Khaadi, Gul Ahmed, Sana Safinaz, Maria B,
                Sapphire, Asim Jofa, and many more under one roof.
              </p>
              <p>
                Whether you&apos;re looking for lawn for summer, khaddar for winter, bridal formals, or casual everyday wear —
                our team carefully curates each season&apos;s launches so you never miss the hottest drops.
              </p>
              <p>
                With customers across Pakistan, the UK, Canada, UAE, and beyond, we make it easy to shop your favourite
                Pakistani brands no matter where you live — with fast delivery, easy returns, and dedicated support.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F2ED]">
                <Image src="/image/categories/cat-stitched.jpg" alt="Pakistani fashion" fill className="object-cover" />
              </div>
              <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F2ED] mt-8">
                <Image src="/image/categories/cat-embroidered.jpg" alt="Pakistani fabric" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Brands We Carry ── */}
      <section className="py-16 md:py-24 bg-[#F5F2ED]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="mb-10">
            <p className="font-dm-sans text-[11px] uppercase tracking-[0.22em] text-charcoal/40 mb-3">What We Carry</p>
            <h2 className="font-cormorant text-[30px] md:text-[38px] font-normal text-charcoal">
              Brands We Distribute
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {brands.map((brand) => (
              <span
                key={brand}
                className="font-dm-sans text-[12px] uppercase tracking-[0.1em] text-charcoal border border-[#E8E4DE] px-4 py-2 bg-white hover:border-charcoal transition-colors"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Milestones ── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <div className="mb-10">
            <p className="font-dm-sans text-[11px] uppercase tracking-[0.22em] text-charcoal/40 mb-3">Our Journey</p>
            <h2 className="font-cormorant text-[30px] md:text-[38px] font-normal text-charcoal">
              Milestones
            </h2>
          </div>
          <div className="divide-y divide-[#E8E4DE]">
            {milestones.map((m) => (
              <div key={m.year} className="flex gap-8 items-start py-6">
                <span className="font-cormorant text-[22px] font-normal text-charcoal/30 flex-shrink-0 w-16">
                  {m.year}
                </span>
                <div>
                  <h3 className="font-dm-sans text-[13px] font-medium text-charcoal mb-1">{m.title}</h3>
                  <p className="font-dm-sans text-[13px] text-charcoal/50 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 md:py-24 bg-cream border-t border-[#E8E4DE]">
        <div className="max-w-2xl mx-auto px-4 md:px-6 text-center">
          <p className="font-dm-sans text-[11px] uppercase tracking-[0.22em] text-charcoal/40 mb-3">Start Shopping</p>
          <h2 className="font-cormorant text-[32px] md:text-[40px] font-normal text-charcoal mb-5">
            Discover This Season
          </h2>
          <p className="font-dm-sans text-[14px] text-charcoal/55 mb-8 leading-relaxed">
            The latest collections from Pakistan&apos;s top brands — all in one place.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/collections/new-arrivals"
              className="inline-block font-dm-sans text-[12px] uppercase tracking-[0.2em] bg-[#111111] text-white px-8 py-4 hover:bg-[#2a2a2a] transition-colors"
            >
              Shop New Arrivals
            </Link>
            <Link
              href="/contact"
              className="inline-block font-dm-sans text-[12px] uppercase tracking-[0.2em] border border-[#1A1A1A] text-charcoal px-8 py-4 hover:bg-charcoal hover:text-white transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
