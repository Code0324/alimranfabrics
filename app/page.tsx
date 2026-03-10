import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import HeroCarousel from "@/components/home/HeroCarousel";
import NewArrivals from "@/components/home/NewArrivals";
import LovedCollections from "@/components/home/LovedCollections";
import NewsletterBanner from "@/components/home/NewsletterBanner";
import CategoryCard from "@/components/ui/CategoryCard";
import { categories } from "@/data/categories";
import { Truck, Shield, RefreshCw, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Al Imran Fabrics — Timeless Elegance, Global Reach",
  description:
    "Discover premium Pakistani clothing — embroidered suits, khaddar collections, men's formal wear, and kids' apparel. Free shipping to USA.",
};

const trustFeatures = [
  {
    icon: Truck,
    title: "Free USA Shipping",
    desc: "No duties, no hidden charges on all US orders",
  },
  {
    icon: Shield,
    title: "Authentic Craftsmanship",
    desc: "Every piece is handcrafted by skilled Pakistani artisans",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    desc: "30-day hassle-free return policy",
  },
  {
    icon: Star,
    title: "Premium Quality",
    desc: "Finest fabrics sourced from across Pakistan",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <HeroCarousel />

      {/* Trust strip */}
      <div className="bg-white border-y border-ivory-dark py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {trustFeatures.map((f) => (
            <div key={f.title} className="flex items-start gap-3">
              <f.icon size={20} className="flex-shrink-0 mt-0.5" style={{ color: "#FFE600" }} />
              <div>
                <p className="font-inter text-xs font-semibold text-charcoal uppercase tracking-wide">
                  {f.title}
                </p>
                <p className="font-inter text-xs text-charcoal/50 mt-0.5">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Categories */}
      <section className="py-16 md:py-20 bg-ivory overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-4 mb-3">
              <span className="w-12 h-px bg-gold" />
              <span className="font-inter text-gold text-xs uppercase tracking-[0.3em]">Browse</span>
              <span className="w-12 h-px bg-gold" />
            </div>
            <h2 className="section-title bg-transparent">Popular Categories</h2>
          </div>

          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <NewArrivals />

      {/* Promotional Banner */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1400&q=80"
            alt="Promotional banner"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(7,13,56,0.88)" }} />
        </div>

        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%)`,
            backgroundSize: "20px 20px",
          }}
        />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="w-16 h-px bg-gold/60" />
            <span className="font-inter text-gold text-xs uppercase tracking-[0.3em]">Exclusive Offer</span>
            <span className="w-16 h-px bg-gold/60" />
          </div>
          <h2 className="font-playfair text-ivory text-4xl md:text-5xl font-bold mb-4 bg-transparent">
            Free Shipping.<br />No Duty. No Drama.
          </h2>
          <p className="font-inter text-ivory/80 text-lg mb-3">For All USA Orders</p>
          <p className="font-inter text-ivory/60 text-sm mb-8 max-w-lg mx-auto">
            We handle everything — customs, duties, and delivery. Your premium Pakistani clothing arrives at your door, worry-free.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/collections/women" className="btn-gold px-8 py-4">
              Shop Women
            </Link>
            <Link
              href="/collections/men"
              className="inline-flex items-center gap-2 font-inter text-sm font-medium uppercase tracking-wide
                         text-ivory border border-ivory/50 px-8 py-4 hover:border-gold hover:text-gold transition-all duration-300"
            >
              Shop Men
            </Link>
          </div>
        </div>
      </section>

      {/* Loved Collections */}
      <LovedCollections />

      {/* Brand Story Snippet */}
      <section className="py-16 md:py-24 px-4 bg-ivory">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative h-80 md:h-[500px] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=700&q=85"
                alt="Al Imran Fabrics craftsmanship"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-4 border-gold hidden md:block" />
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-gold" />
              <span className="font-inter text-gold text-xs uppercase tracking-[0.3em]">Our Heritage</span>
            </div>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-charcoal mb-5 bg-transparent">
              Crafted with Generations of Artistry
            </h2>
            <p className="font-inter text-charcoal/60 text-sm leading-relaxed mb-4">
              At Al Imran Fabrics, we believe every thread carries a story. Born in the heart of Lahore,
              we&apos;ve been curating Pakistan&apos;s finest textiles for discerning customers around the world.
            </p>
            <p className="font-inter text-charcoal/60 text-sm leading-relaxed mb-8">
              Our master craftsmen bring centuries of embroidery traditions into every piece — from
              hand-stitched Zardozi work to intricate Resham embroidery — making each garment a wearable work of art.
            </p>
            <Link href="/about" className="btn-outline">
              Discover Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterBanner />

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
