import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import HeroCarousel from "@/components/home/HeroCarousel";
import LovedCollections from "@/components/home/LovedCollections";
import NewArrivals from "@/components/home/NewArrivals";
import CustomerReviews from "@/components/home/CustomerReviews";
import CategoryCard from "@/components/ui/CategoryCard";
import { Truck, Shield, RefreshCw, Star } from "lucide-react";

const brands = [
  { id: "al-karam",  name: "Al-Karam",  slug: "al-karam",  image: "/image/alkaram/03offwhite.png",                   productCount: 18, description: "Printed unstitched lawn" },
  { id: "mtj",       name: "MTJ",       slug: "mtj",       image: "/image/brands/mtj.jpg",                           productCount: 20, description: "Printed unstitched lawn" },
  { id: "bin-saeed", name: "Bin Saeed", slug: "bin-saeed", image: "/image/categories/cat-unstitched.jpg",            productCount: 20, description: "Premium unstitched fabric" },
  { id: "khaadi",    name: "Khaadi",    slug: "khaadi",    image: "/image/brands/khaadi.png",                        productCount: 20, description: "Women's fashion" },
  { id: "salina",    name: "Salina",    slug: "salina",    image: "/image/categories/cat-lawn.jpg",                  productCount: 20, description: "Lawn collection" },
  { id: "nishat",    name: "Nishat",    slug: "nishat",    image: "/image/categories/cat-embroidered.jpg",           productCount: 20, description: "Embroidered designs" },
  { id: "j-junaid",  name: "J.",        slug: "j-junaid",  image: "/image/brands/j..PNG",                           productCount: 20, description: "J. Junaid Jamshed" },
  { id: "sapphire",  name: "Sapphire",  slug: "sapphire",  image: "/image/categories/cat-stitched.jpg",             productCount: 20, description: "Women's fashion" },
  { id: "tawakkal",  name: "Tawakkal",  slug: "tawakkal",  image: "/image/categories/cat-luxury.jpg",               productCount: 20, description: "Formal wear" },
];

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
    desc: "30-day hassle-free return policy",
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
      {/* Hero */}
      <HeroCarousel />

      {/* Loved Collections — replaces quick category nav */}
      <LovedCollections />

      {/* Popular Brands */}
      <section className="py-16 md:py-20 bg-ivory overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-4 mb-3">
              <span className="w-12 h-px bg-gold" />
              <span className="font-inter text-gold text-xs uppercase tracking-[0.3em]">Shop by Brand</span>
              <span className="w-12 h-px bg-gold" />
            </div>
            <h2 className="section-title bg-transparent">Popular Brands</h2>
          </div>

          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4">
            {brands.map((brand) => (
              <CategoryCard key={brand.id} category={brand} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <NewArrivals />

      {/* Customer Reviews */}
      <CustomerReviews />

      {/* Brand Story Snippet */}
      <section className="py-16 md:py-24 px-4 bg-ivory">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative h-80 md:h-[500px] overflow-hidden">
              <Image
                src="/image/store.png"
                alt="Al Imran Fabrics store"
                fill
                className="object-cover object-center"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-4 border-gold hidden md:block" />
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-gold" />
              <span className="font-inter text-gold text-xs uppercase tracking-[0.3em]">Who We Are</span>
            </div>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-charcoal mb-5 bg-transparent">
              Pakistan&apos;s Premier Fashion Distributors
            </h2>
            <p className="font-inter text-charcoal/60 text-sm leading-relaxed mb-4">
              Al Imran Fabrics is your trusted destination for Pakistan&apos;s most celebrated clothing brands — all under one roof. We bring you the best of Khaadi, Gul Ahmed, Sana Safinaz, Maria B, Sapphire, and many more, delivered right to your doorstep.
            </p>
            <p className="font-inter text-charcoal/60 text-sm leading-relaxed mb-8">
              As an authorised multi-brand distributor, we handpick the finest collections each season — so you get authentic, original garments from Pakistan&apos;s top designers without the hassle of searching across multiple stores.
            </p>
            <Link href="/about" className="btn-outline">
              Discover Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us — slim cream bar */}
      <section style={{ backgroundColor: "#f5f3eb" }} className="py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
            {trustFeatures.map((f) => (
              <div key={f.title} className="flex flex-col items-center text-center gap-2.5">
                <f.icon size={20} strokeWidth={1.5} className="text-charcoal/50" />
                <div>
                  <p className="font-inter text-[11px] font-semibold text-charcoal uppercase tracking-wider mb-0.5">
                    {f.title}
                  </p>
                  <p className="font-inter text-[10px] text-charcoal/45 leading-snug max-w-[140px] mx-auto">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp floating button */}
      <div className="fixed bottom-6 right-6 z-30">
        <a
          href="https://wa.me/15550000000"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="w-14 h-14 bg-[#25D366] hover:bg-[#20bf5b] text-white flex items-center justify-center
                     rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      </div>
    </>
  );
}
