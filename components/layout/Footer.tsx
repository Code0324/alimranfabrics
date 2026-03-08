import Link from "next/link";
import { Facebook, Instagram, Youtube, Mail, MapPin, Phone } from "lucide-react";

const footerLinks = {
  Shop: [
    { label: "Women", href: "/collections/women" },
    { label: "Men", href: "/collections/men" },
    { label: "Kids", href: "/collections/kids" },
    { label: "Unstitched", href: "/collections/unstitched" },
    { label: "New Arrivals", href: "/collections/new-arrivals" },
    { label: "Sale", href: "/collections/sale" },
  ],
  Collections: [
    { label: "Embroidered", href: "/collections/embroidered" },
    { label: "Jacquard", href: "/collections/jacquard" },
    { label: "Printed", href: "/collections/printed" },
    { label: "Khaddar", href: "/collections/khaddar" },
    { label: "Lawn", href: "/collections/lawn" },
    { label: "Bridal", href: "/collections/bridal" },
  ],
  "Customer Care": [
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "Size Guide", href: "/size-guide" },
    { label: "Shipping Info", href: "/shipping" },
    { label: "Returns & Exchanges", href: "/returns" },
    { label: "Track Order", href: "/track-order" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-charcoal text-ivory/80">
      {/* Ornamental top border */}
      <div className="ornamental-border" />

      {/* Newsletter section */}
      <div className="bg-emerald-dark py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="font-playfair text-2xl md:text-3xl text-ivory mb-2">
            Join the Al Imran Family
          </h3>
          <p className="text-ivory/60 font-inter text-sm mb-6">
            Subscribe for exclusive deals, new collection launches, and cultural inspiration.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 bg-white/10 border border-ivory/20 text-ivory placeholder-ivory/40
                         font-inter text-sm focus:outline-none focus:border-gold transition-colors"
            />
            <button className="btn-gold px-6 py-3 whitespace-nowrap">
              Subscribe
            </button>
          </div>
          <p className="text-ivory/30 text-xs font-inter mt-3">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <span className="font-playfair font-bold text-ivory text-2xl block">Al Imran</span>
              <span className="font-playfair text-gold text-sm tracking-[0.2em] uppercase">Fabrics</span>
            </div>
            <p className="text-ivory/50 font-inter text-sm leading-relaxed mb-6 max-w-xs">
              Bringing the timeless elegance of Pakistani craftsmanship to homes around the world. Each piece tells a story of heritage, artistry, and love.
            </p>

            {/* Contact info */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-xs text-ivory/50">
                <Mail size={13} className="text-gold flex-shrink-0" />
                <span>support@alimranfabrics.com</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-ivory/50">
                <Phone size={13} className="text-gold flex-shrink-0" />
                <span>+1 (555) 000-0000 (USA)</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-ivory/50">
                <MapPin size={13} className="text-gold flex-shrink-0" />
                <span>Lahore, Pakistan</span>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 bg-ivory/10 hover:bg-gold/20 flex items-center justify-center transition-colors"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 bg-ivory/10 hover:bg-gold/20 flex items-center justify-center transition-colors"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 bg-ivory/10 hover:bg-gold/20 flex items-center justify-center transition-colors"
              >
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-playfair text-ivory font-semibold mb-4 text-base">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-inter text-sm text-ivory/50 hover:text-gold transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Trust badges & bottom bar */}
      <div className="border-t border-ivory/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Trust badges */}
            <div className="flex items-center gap-6">
              {["Secure Payment", "Free USA Shipping", "Authentic Craftsmanship", "Easy Returns"].map((badge) => (
                <div key={badge} className="flex items-center gap-1.5 text-xs text-ivory/40 font-inter">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                  {badge}
                </div>
              ))}
            </div>

            <p className="text-xs text-ivory/30 font-inter">
              © {new Date().getFullYear()} Al Imran Fabrics. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
