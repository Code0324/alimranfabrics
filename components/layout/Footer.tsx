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
    <footer style={{ backgroundColor: "#800000", color: "#FFFF00" }}>
      {/* Ornamental top border */}
      <div className="ornamental-border" />

      {/* Newsletter section */}
      <div
        className="py-12 px-4"
        style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <h3
            className="font-playfair text-2xl md:text-3xl mb-2"
            style={{ color: "#FFFF00" }}
          >
            Join the Al Imran Family
          </h3>
          <p className="font-inter text-sm mb-6" style={{ color: "#000080" }}>
            Subscribe for exclusive deals, new collection launches, and cultural inspiration.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 font-inter text-sm focus:outline-none transition-colors"
              style={{
                backgroundColor: "rgba(255,255,0,0.1)",
                border: "1px solid rgba(255,255,0,0.35)",
                color: "#FFFF00",
              }}
            />
            <button className="btn-gold px-6 py-3 whitespace-nowrap">
              Subscribe
            </button>
          </div>
          <p className="text-xs font-inter mt-3" style={{ color: "#000080" }}>
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
              <span
                className="font-playfair font-bold text-2xl block"
                style={{ color: "#FFFF00" }}
              >
                Al Imran
              </span>
              <span
                className="font-playfair text-sm tracking-[0.2em] uppercase"
                style={{ color: "#000080" }}
              >
                Fabrics
              </span>
            </div>
            <p
              className="font-inter text-sm leading-relaxed mb-6 max-w-xs"
              style={{ color: "#000080" }}
            >
              Bringing the timeless elegance of Pakistani craftsmanship to homes around the world. Each piece tells a story of heritage, artistry, and love.
            </p>

            {/* Contact info */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-xs" style={{ color: "#000080" }}>
                <Mail size={13} className="flex-shrink-0" style={{ color: "#FFFF00" }} />
                <span>support@alimranfabrics.com</span>
              </div>
              <div className="flex items-center gap-2 text-xs" style={{ color: "#000080" }}>
                <Phone size={13} className="flex-shrink-0" style={{ color: "#FFFF00" }} />
                <span>+1 (555) 000-0000 (USA)</span>
              </div>
              <div className="flex items-center gap-2 text-xs" style={{ color: "#000080" }}>
                <MapPin size={13} className="flex-shrink-0" style={{ color: "#FFFF00" }} />
                <span>Lahore, Pakistan</span>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {[
                { href: "https://facebook.com", label: "Facebook", Icon: Facebook },
                { href: "https://instagram.com", label: "Instagram", Icon: Instagram },
                { href: "https://youtube.com", label: "YouTube", Icon: Youtube },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center transition-colors"
                  style={{
                    backgroundColor: "rgba(255,255,0,0.12)",
                    color: "#FFFF00",
                    border: "1px solid rgba(255,255,0,0.25)",
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4
                className="font-playfair font-semibold mb-4 text-base"
                style={{ color: "#FFFF00" }}
              >
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-inter text-sm transition-colors hover:text-[#FFFF00]"
                      style={{ color: "#000080" }}
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
      <div style={{ borderTop: "1px solid rgba(255,255,0,0.15)" }}>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-6">
              {["Secure Payment", "Free USA Shipping", "Authentic Craftsmanship", "Easy Returns"].map((badge) => (
                <div
                  key={badge}
                  className="flex items-center gap-1.5 text-xs font-inter"
                  style={{ color: "#000080" }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: "#FFFF00" }}
                  />
                  {badge}
                </div>
              ))}
            </div>

            <p className="text-xs font-inter" style={{ color: "#000080" }}>
              © {new Date().getFullYear()} Al Imran Fabrics. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
