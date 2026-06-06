import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import HeroCarousel from "@/components/home/HeroCarousel";
import LovedCollections from "@/components/home/LovedCollections";
import NewArrivals from "@/components/home/NewArrivals";
import CustomerReviews from "@/components/home/CustomerReviews";
import BrandLogosSlider from "@/components/home/BrandLogosSlider";
import { Truck, Shield, RefreshCw, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Al Imran Fabrics — Timeless Elegance, Global Reach",
  description:
    "Discover premium Pakistani clothing — embroidered suits, khaddar collections, men's traditional wear, and kids' apparel. Worldwide shipping available.",
};

const trustFeatures = [
  {
    icon: Truck,
    title: "Worldwide Shipping",
    desc: "We deliver to your doorstep, wherever you are in the world",
  },
  {
    icon: Shield,
    title: "Authentic Craftsmanship",
    desc: "Curated from Pakistan's most trusted brands and distributors",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    desc: "30-day hassle-free return policy on all orders",
  },
  {
    icon: Star,
    title: "Premium Quality",
    desc: "Sourcing premium products from leading brands across Pakistan",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <HeroCarousel />

      {/* ── Loved Collections ── */}
      <LovedCollections />

      {/* ── Popular Brands ── */}
      <BrandLogosSlider />

      {/* ── New Arrivals ── */}
      <NewArrivals />

      {/* ── Customer Reviews ── */}
      <CustomerReviews />

      {/* ── Brand Story ── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">

            {/* Image */}
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/image/store.png"
                  alt="Al Imran Fabrics store"
                  fill
                  className="object-cover object-center"
                />
              </div>
              {/* Decorative offset border */}
              <div className="absolute -bottom-5 -right-5 w-28 h-28 border border-[#E8E4DC] hidden md:block pointer-events-none" />
            </div>

            {/* Text */}
            <div>
              <p className="section-label mb-4">Our Brand</p>
              <h2 className="font-cormorant text-3xl md:text-4xl font-semibold text-charcoal mb-6 leading-tight">
                Pakistan&apos;s Premier<br />Fashion Distributors
              </h2>
              <p className="font-dm-sans text-charcoal/60 text-sm leading-relaxed mb-4">
                Al Imran Fabrics is your trusted destination for Pakistan&apos;s most celebrated clothing brands — all under one roof. We bring you the best of Khaadi, Gul Ahmed, Sana Safinaz, Maria B, Sapphire, and many more, delivered right to your doorstep.
              </p>
              <p className="font-dm-sans text-charcoal/60 text-sm leading-relaxed mb-8">
                As an authorised multi-brand distributor, we handpick the finest collections each season — so you get authentic, original garments from Pakistan&apos;s top designers without the hassle of searching across multiple stores.
              </p>
              <Link href="/about" className="btn-outline">
                Discover Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Badges ── */}
      <section className="py-10 md:py-14 bg-cream border-t border-b border-[#E8E4DC]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {trustFeatures.map((f) => (
              <div key={f.title} className="flex flex-col items-center text-center gap-3">
                <f.icon size={22} strokeWidth={1.25} className="text-charcoal/35" />
                <div>
                  <p className="font-dm-sans text-[12px] font-semibold text-charcoal uppercase tracking-[0.1em] mb-1">
                    {f.title}
                  </p>
                  <p className="font-dm-sans text-[11px] text-charcoal/45 leading-snug max-w-[150px] mx-auto">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WhatsApp floating button ── */}
      <div className="fixed bottom-6 right-6 z-30">
        <a
          href="https://wa.me/c/923145690329"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="w-13 h-13 bg-[#25D366] hover:bg-[#20bf5b] text-white flex items-center justify-center
                     rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110
                     w-12 h-12 md:w-14 md:h-14"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      </div>
    </>
  );
}
