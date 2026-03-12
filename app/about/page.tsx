import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Globe, Shield, Star, Zap, HeartHandshake } from "lucide-react";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Al Imran Fabrics — Pakistan's trusted multi-brand fashion distributor. Shop Khaadi, Gul Ahmed, Sana Safinaz, Maria B, and more, all in one place.",
};

const values = [
  {
    icon: Shield,
    title: "100% Authentic",
    desc: "Every product we sell is sourced directly from official brand channels. No replicas, no imitations — ever.",
  },
  {
    icon: Star,
    title: "Top Pakistani Brands",
    desc: "We carry collections from Khaadi, Gul Ahmed, Sana Safinaz, Maria B, Sapphire, Asim Jofa, and many more.",
  },
  {
    icon: Globe,
    title: "Worldwide Delivery",
    desc: "From Lahore to London, Toronto to Toronto — we ship worldwide with full customs handling.",
  },
  {
    icon: Zap,
    title: "New Arrivals Every Week",
    desc: "We stay ahead of every season — the latest drops from your favourite Pakistani brands land here first.",
  },
  {
    icon: ShoppingBag,
    title: "One-Stop Shop",
    desc: "No need to browse dozens of websites. Find all your favourite brands together, with easy comparison and checkout.",
  },
  {
    icon: HeartHandshake,
    title: "Customer First",
    desc: "Our team is always here to help you find the perfect outfit for Eid, weddings, or everyday elegance.",
  },
];

const brands = [
  "Khaadi", "Gul Ahmed", "Sana Safinaz", "Maria B",
  "Sapphire", "Asim Jofa", "Zara Shahjahan", "Cross Stitch",
  "Rang Rasiya", "Bonanza Satrangi", "Zellbury", "Limelight",
];

const milestones = [
  { year: "2010", title: "Founded in Lahore", desc: "Al Imran Fabrics opens its first multi-brand store in Lahore, carrying collections from Pakistan's top designers." },
  { year: "2015", title: "First International Orders", desc: "We began shipping to the Pakistani diaspora in the United States, UK, and Canada." },
  { year: "2019", title: "Online Store Launch", desc: "Launched our e-commerce platform to serve customers across 20+ countries worldwide." },
  { year: "2022", title: "Free Shipping — USA", desc: "Introduced free shipping on all orders to the United States." },
  { year: "2025", title: "15,000+ Happy Customers", desc: "Proud to serve a growing family of fashion lovers across 3 continents." },
];

export default function AboutPage() {
  return (
    <div>
      <PageHero
        eyebrow="Our Story"
        title={<>Pakistan&apos;s Best Brands,<br />All in One Place</>}
        description="Al Imran Fabrics is your trusted multi-brand distributor for Pakistan's most celebrated fashion labels — bringing authentic collections straight to your door, wherever you are in the world."
        backgroundImage="/image/women-banner-silk.png"
        breadcrumbItems={[{ label: "About Us" }]}
      />

      {/* Who We Are */}
      <section className="py-16 md:py-24 px-4 bg-ivory">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px" style={{ backgroundColor: "#CC0000" }} />
              <span className="font-inter text-xs uppercase tracking-[0.3em] font-bold" style={{ color: "#CC0000" }}>Who We Are</span>
            </div>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-charcoal mb-6">
              Your Trusted Multi-Brand Distributor
            </h2>
            <div className="space-y-4 font-inter text-charcoal/70 text-sm leading-relaxed">
              <p>
                Al Imran Fabrics is not a manufacturer — we are proud distributors of Pakistan&apos;s finest fashion brands.
                Founded in Lahore, we bring together the very best collections from Khaadi, Gul Ahmed, Sana Safinaz, Maria B,
                Sapphire, Asim Jofa, and many more under one roof.
              </p>
              <p>
                Whether you&apos;re looking for lawn for summer, khaddar for winter, bridal formals, or casual everyday wear —
                we have it all. Our team carefully curates each season&apos;s launches so you never miss the hottest drops.
              </p>
              <p>
                With customers across Pakistan, the USA, UK, Canada, and beyond, we make it easy to shop your favourite
                Pakistani brands no matter where you live — with fast delivery, easy returns, and dedicated support.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative h-64 overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=80" alt="Pakistani fashion" fill className="object-cover" />
              </div>
              <div className="relative h-64 mt-6 overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&q=80" alt="Pakistani fabric" fill className="object-cover" />
              </div>
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 font-playfair font-bold text-center text-sm whitespace-nowrap"
              style={{ backgroundColor: "#FFFD82", color: "#CC0000" }}>
              15+ Years Serving Customers
            </div>
          </div>
        </div>
      </section>

      {/* Brands We Carry */}
      <section className="py-16 px-4" style={{ backgroundColor: "#FFFD82" }}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-3">
            <span className="w-12 h-px" style={{ backgroundColor: "#CC0000" }} />
            <span className="font-inter text-[10px] uppercase tracking-[0.35em] font-bold" style={{ color: "#CC0000" }}>What We Carry</span>
            <span className="w-12 h-px" style={{ backgroundColor: "#CC0000" }} />
          </div>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-3" style={{ color: "#CC0000" }}>Brands We Distribute</h2>
          <p className="font-inter text-sm mb-10 max-w-md mx-auto" style={{ color: "#0C1350" }}>
            We are authorised distributors for Pakistan&apos;s most loved clothing labels.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {brands.map((brand) => (
              <span key={brand}
                className="font-inter font-semibold text-sm px-5 py-2.5 border-2 transition-all duration-200 hover:scale-105"
                style={{ borderColor: "#CC0000", color: "#CC0000", backgroundColor: "rgba(255,255,255,0.6)" }}>
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-4 mb-3">
              <span className="w-12 h-px" style={{ backgroundColor: "#CC0000" }} />
              <span className="font-inter text-[10px] uppercase tracking-[0.35em] font-bold" style={{ color: "#CC0000" }}>Why Choose Us</span>
              <span className="w-12 h-px" style={{ backgroundColor: "#CC0000" }} />
            </div>
            <h2 className="section-title mb-3">Why Al Imran Fabrics</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value) => (
              <div key={value.title} className="group p-6 border-2 border-[#FFFD82] hover:border-[#CC0000] transition-all duration-300">
                <div className="w-12 h-12 flex items-center justify-center mb-5 transition-colors" style={{ backgroundColor: "#FFFD82" }}>
                  <value.icon size={22} style={{ color: "#CC0000" }} />
                </div>
                <h3 className="font-playfair font-semibold text-lg text-charcoal mb-2">{value.title}</h3>
                <p className="font-inter text-sm text-charcoal/60 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 px-4" style={{ backgroundColor: "#0C1350" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-4 mb-3">
              <span className="w-12 h-px" style={{ backgroundColor: "#FFFD82" }} />
              <span className="font-inter text-[10px] uppercase tracking-[0.35em] font-bold" style={{ color: "#FFFD82" }}>Our Journey</span>
              <span className="w-12 h-px" style={{ backgroundColor: "#FFFD82" }} />
            </div>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white">Our Milestones</h2>
          </div>
          <div className="space-y-6">
            {milestones.map((m) => (
              <div key={m.year} className="flex gap-6 items-start border border-white/10 p-5 hover:border-[#FFFD82]/40 transition-colors">
                <div className="flex-shrink-0 font-playfair font-bold text-2xl" style={{ color: "#FFFD82" }}>{m.year}</div>
                <div>
                  <h3 className="font-playfair font-semibold text-white mb-1">{m.title}</h3>
                  <p className="font-inter text-white/50 text-sm">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 text-center" style={{ backgroundColor: "#FFFD82" }}>
        <h2 className="font-playfair text-3xl font-bold mb-4" style={{ color: "#CC0000" }}>
          Ready to Shop?
        </h2>
        <p className="font-inter text-sm mb-8 max-w-md mx-auto" style={{ color: "#0C1350" }}>
          Discover the latest collections from Pakistan&apos;s top brands — all in one place.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/collections/new-arrivals" className="btn-primary">
            Shop New Arrivals
          </Link>
          <Link href="/contact" className="btn-outline">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
