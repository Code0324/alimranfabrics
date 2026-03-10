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

// Brand colours derived from logo
const YELLOW = "#FFE600";
const BLUE   = "#000080";
const RED    = "#B71C1C";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: YELLOW }}>
      {/* Ornamental top border */}
      <div className="ornamental-border" />

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <span className="font-playfair font-bold text-2xl block" style={{ color: BLUE }}>
                Al Imran
              </span>
              <span
                className="font-playfair text-sm tracking-[0.2em] uppercase"
                style={{ color: RED }}
              >
                Fabrics
              </span>
            </div>
            <p className="font-inter text-sm leading-relaxed mb-6 max-w-xs" style={{ color: BLUE }}>
              Bringing the timeless elegance of Pakistani craftsmanship to homes around the world. Each piece tells a story of heritage, artistry, and love.
            </p>

            {/* Contact info */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-xs" style={{ color: BLUE }}>
                <Mail size={13} className="flex-shrink-0" style={{ color: RED }} />
                <span>support@alimranfabrics.com</span>
              </div>
              <div className="flex items-center gap-2 text-xs" style={{ color: BLUE }}>
                <Phone size={13} className="flex-shrink-0" style={{ color: RED }} />
                <span>+1 (555) 000-0000 (USA)</span>
              </div>
              <div className="flex items-center gap-2 text-xs" style={{ color: BLUE }}>
                <MapPin size={13} className="flex-shrink-0" style={{ color: RED }} />
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
                    backgroundColor: BLUE,
                    color: YELLOW,
                    border: `1px solid ${BLUE}`,
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
                className="font-playfair font-semibold mb-4 text-base bg-transparent"
                style={{ color: RED }}
              >
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-inter text-sm transition-colors text-[#000080] hover:text-[#B71C1C]"
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
      <div style={{ borderTop: `1px solid rgba(0,0,128,0.2)` }}>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-6">
              {["Secure Payment", "Free USA Shipping", "Authentic Craftsmanship", "Easy Returns"].map((badge) => (
                <div key={badge} className="flex items-center gap-1.5 text-xs font-inter" style={{ color: BLUE }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: RED }} />
                  {badge}
                </div>
              ))}
            </div>
            <p className="text-xs font-inter" style={{ color: BLUE }}>
              © {new Date().getFullYear()} Al Imran Fabrics. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
