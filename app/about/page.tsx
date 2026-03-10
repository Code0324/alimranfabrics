import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Scissors, Globe, Heart, Award, Users, Leaf } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Al Imran Fabrics — our heritage, values, and mission to bring authentic Pakistani fashion to the world.",
};

const values = [
  {
    icon: Award,
    title: "Uncompromising Quality",
    desc: "Every garment undergoes rigorous quality checks before it reaches your hands. We use only premium, hand-selected fabrics.",
  },
  {
    icon: Scissors,
    title: "Heritage Craftsmanship",
    desc: "Our artisans have inherited embroidery techniques passed down through generations of Pakistani textile masters.",
  },
  {
    icon: Globe,
    title: "Global Delivery",
    desc: "From Lahore to Los Angeles — we ship worldwide with full customs handling so your order arrives without any hassle.",
  },
  {
    icon: Heart,
    title: "Made with Love",
    desc: "Each piece is crafted with genuine care and passion. We don't mass-produce — we create with intention.",
  },
  {
    icon: Users,
    title: "Supporting Artisans",
    desc: "We directly employ over 200 skilled craftspeople in Pakistan, ensuring fair wages and sustainable livelihoods.",
  },
  {
    icon: Leaf,
    title: "Sustainable Practices",
    desc: "We're committed to eco-friendly dyes, responsible sourcing, and minimal packaging waste.",
  },
];

const milestones = [
  { year: "2008", title: "Founded in Lahore", desc: "Al Imran Fabrics opens its first atelier in Lahore's Model Town." },
  { year: "2014", title: "First International Order", desc: "We shipped our first collection to the Pakistani diaspora in the United States." },
  { year: "2018", title: "Online Expansion", desc: "Launched our e-commerce platform to serve customers across 15 countries." },
  { year: "2022", title: "USA Free Shipping", desc: "Introduced our signature free shipping program for all USA customers." },
  { year: "2025", title: "15,000+ Happy Customers", desc: "Celebrating our growing family of customers across 3 continents." },
];

export default function AboutPage() {
  return (
    <div className="pt-28 md:pt-32">
      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1400&q=80"
            alt="About Al Imran Fabrics"
            fill
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-charcoal/75" />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="w-12 h-px bg-gold/60" />
            <span className="font-inter text-gold text-xs uppercase tracking-[0.3em]">Our Story</span>
            <span className="w-12 h-px bg-gold/60" />
          </div>
          <h1 className="font-playfair text-4xl md:text-6xl font-bold text-ivory mb-5">
            Timeless Elegance,<br />Global Reach
          </h1>
          <p className="font-inter text-ivory/70 text-base md:text-lg leading-relaxed">
            A story woven with threads of tradition, passion, and the desire to share Pakistan&apos;s
            breathtaking textile heritage with the world.
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-16 md:py-24 px-4 bg-ivory">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-gold" />
              <span className="font-inter text-gold text-xs uppercase tracking-[0.3em]">Who We Are</span>
            </div>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-charcoal mb-6">
              Born in Lahore, Loved Worldwide
            </h2>
            <div className="space-y-4 font-inter text-charcoal/70 text-sm leading-relaxed">
              <p>
                Al Imran Fabrics was born from a simple belief: that the extraordinary craftsmanship of Pakistani artisans deserves to be celebrated globally. Founded in 2008 in the heart of Lahore, we started as a small boutique serving local families for Eid and wedding occasions.
              </p>
              <p>
                Today, we are a bridge between Pakistan&apos;s centuries-old textile tradition and homes across North America, Europe, and beyond. Each collection we curate is a love letter to the artisans who pour their hearts into every stitch.
              </p>
              <p>
                We work directly with master embroiderers, weavers, and tailors across Punjab — ensuring both exceptional quality and fair compensation. When you wear Al Imran, you wear the hands, the stories, and the heritage of Pakistan&apos;s finest craftspeople.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=80"
                  alt="Craftsmanship"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-64 mt-6 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&q=80"
                  alt="Embroidery"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gold text-charcoal px-6 py-3 font-playfair font-bold text-center text-sm whitespace-nowrap">
              15+ Years of Excellence
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-4 mb-3">
              <span className="w-12 h-px bg-gold" />
              <span className="font-inter text-gold text-xs uppercase tracking-[0.3em]">Why Choose Us</span>
              <span className="w-12 h-px bg-gold" />
            </div>
            <h2 className="section-title mb-3">Why Al Imran Fabrics</h2>
            <p className="font-inter text-charcoal/60 max-w-md mx-auto text-sm">
              Six pillars that define our commitment to you and our artisan community.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="group p-6 border border-ivory-dark hover:border-gold/40 transition-all duration-300 hover:shadow-gold"
              >
                <div className="w-12 h-12 flex items-center justify-center mb-5 transition-colors bg-navy/10 group-hover:bg-navy/20">
                  <value.icon size={22} style={{ color: "#C9A84C" }} />
                </div>
                <h3 className="font-playfair font-semibold text-lg text-charcoal mb-2">
                  {value.title}
                </h3>
                <p className="font-inter text-sm text-charcoal/60 leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 px-4 bg-charcoal">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-4 mb-3">
              <span className="w-12 h-px bg-gold/60" />
              <span className="font-inter text-gold text-xs uppercase tracking-[0.3em]">Our Journey</span>
              <span className="w-12 h-px bg-gold/60" />
            </div>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-ivory">
              Milestones That Define Us
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 -translate-x-0.5 top-0 bottom-0 w-px bg-gold/30 hidden md:block" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className={`flex gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className={`md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <div className="bg-white/5 border border-ivory/10 p-5 hover:border-gold/30 transition-colors">
                      <span className="font-playfair text-gold text-xl font-bold block mb-1">{m.year}</span>
                      <h3 className="font-playfair text-ivory font-semibold mb-1">{m.title}</h3>
                      <p className="font-inter text-ivory/50 text-sm">{m.desc}</p>
                    </div>
                  </div>
                  <div className="md:w-0 flex-shrink-0 hidden md:flex items-start justify-center relative">
                    <div className="w-3 h-3 bg-gold rounded-full mt-5 -translate-x-1.5" />
                  </div>
                  <div className="md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team placeholder */}
      <section className="py-16 md:py-24 px-4 bg-ivory">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-4 mb-3">
              <span className="w-12 h-px bg-gold" />
              <span className="font-inter text-gold text-xs uppercase tracking-[0.3em]">The People</span>
              <span className="w-12 h-px bg-gold" />
            </div>
            <h2 className="section-title mb-3">Our Artisan Community</h2>
            <p className="font-inter text-charcoal/60 max-w-md mx-auto text-sm">
              Behind every garment is a skilled craftsperson whose expertise has been refined over decades.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&q=80",
              "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=80",
              "https://images.unsplash.com/photo-1558171813-0ebd2dc6d440?w=400&q=80",
              "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400&q=80",
            ].map((img, i) => (
              <div key={i} className="relative aspect-square overflow-hidden group">
                <Image
                  src={img}
                  alt={`Artisan ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 text-center" style={{ backgroundColor: "#070D38" }}>
        <h2 className="font-playfair text-3xl font-bold text-ivory mb-4">
          Ready to Explore?
        </h2>
        <p className="font-inter text-ivory/70 text-sm mb-8 max-w-md mx-auto">
          Discover our latest collections and bring the elegance of Pakistani heritage into your wardrobe.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/collections/women" className="btn-gold">
            Shop Women
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center font-inter text-sm font-medium uppercase tracking-wide
                       text-ivory border border-ivory/50 px-6 py-3 hover:border-gold hover:text-gold transition-all duration-300"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
