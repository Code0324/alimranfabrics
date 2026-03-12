import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";

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
const YELLOW = "#FFE500";
const BLUE   = "#000080";
const RED    = "#B71C1C";

// Embossed text style for yellow background
const embossStyle = {
  textShadow: "-1px -1px 1px rgba(255,255,255,0.75), 1px 1px 1px rgba(0,0,0,0.12)",
};

function FacebookIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="fb-radial" cx="38%" cy="18%" r="80%">
          <stop offset="0%" stopColor="#60a8f7" />
          <stop offset="100%" stopColor="#0866ff" />
        </radialGradient>
        <filter id="fb-shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#0844bb" floodOpacity="0.55" />
        </filter>
      </defs>
      <circle cx="18" cy="18" r="17" fill="url(#fb-radial)" filter="url(#fb-shadow)" />
      <circle cx="16" cy="10" r="6" fill="rgba(255,255,255,0.12)" />
      <path
        d="M19.5 12.5H21.5V9.5H19.5C17.567 9.5 16 11.067 16 13V14.5H14V17.5H16V26.5H19V17.5H21.5L22 14.5H19V13C19 12.776 19.224 12.5 19.5 12.5Z"
        fill="white"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ig-radial" cx="30%" cy="105%" r="130%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="12%" stopColor="#fda86e" />
          <stop offset="35%" stopColor="#fd5949" />
          <stop offset="55%" stopColor="#d6249f" />
          <stop offset="80%" stopColor="#5b4fe9" />
          <stop offset="100%" stopColor="#285AEB" />
        </radialGradient>
        <filter id="ig-shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#c13584" floodOpacity="0.5" />
        </filter>
      </defs>
      <rect x="1" y="1" width="34" height="34" rx="10" fill="url(#ig-radial)" filter="url(#ig-shadow)" />
      <rect x="1" y="1" width="34" height="34" rx="10" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <rect x="10" y="10" width="16" height="16" rx="5" fill="none" stroke="white" strokeWidth="1.8" />
      <circle cx="18" cy="18" r="4" fill="none" stroke="white" strokeWidth="1.8" />
      <circle cx="24.5" cy="11.5" r="1.3" fill="white" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="yt-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ff5a5a" />
          <stop offset="100%" stopColor="#cc0000" />
        </linearGradient>
        <filter id="yt-shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#8b0000" floodOpacity="0.5" />
        </filter>
      </defs>
      <rect x="1" y="1" width="34" height="34" rx="9" fill="url(#yt-grad)" filter="url(#yt-shadow)" />
      <rect x="1" y="1" width="34" height="34" rx="9" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <ellipse cx="18" cy="11" rx="8" ry="3" fill="rgba(255,255,255,0.1)" />
      <path
        d="M26.5 13.2C26.3 12.4 25.7 11.8 24.9 11.5C23.4 11 18 11 18 11C18 11 12.6 11 11.1 11.5C10.3 11.8 9.7 12.4 9.5 13.2C9 14.7 9 18 9 18C9 18 9 21.3 9.5 22.8C9.7 23.6 10.3 24.2 11.1 24.5C12.6 25 18 25 18 25C18 25 23.4 25 24.9 24.5C25.7 24.2 26.3 23.6 26.5 22.8C27 21.3 27 18 27 18C27 18 27 14.7 26.5 13.2Z"
        fill="white"
      />
      <polygon points="15.5,15 15.5,21 21,18" fill="#cc0000" />
    </svg>
  );
}

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
              <Link href="/">
                <div className="relative w-20 h-14">
                  <Image
                    src="/image/logo.jpeg"
                    alt="Al Imran Fabrics"
                    fill
                    sizes="80px"
                    className="object-contain"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </div>
              </Link>
            </div>
            <p className="font-inter text-sm leading-relaxed mb-6 max-w-xs" style={{ color: BLUE, ...embossStyle }}>
              Bringing the timeless elegance of Pakistani craftsmanship to homes around the world. Each piece tells a story of heritage, artistry, and love.
            </p>

            {/* Contact info */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-xs" style={{ color: BLUE, ...embossStyle }}>
                <Mail size={13} className="flex-shrink-0" style={{ color: RED }} />
                <span>alimranfabrics786@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-xs" style={{ color: BLUE, ...embossStyle }}>
                <Phone size={13} className="flex-shrink-0" style={{ color: RED }} />
                <span>+92 314 5690329 (PAK)</span>
              </div>
              <div className="flex items-center gap-2 text-xs" style={{ color: BLUE, ...embossStyle }}>
                <MapPin size={13} className="flex-shrink-0" style={{ color: RED }} />
                <span>Karachi, Pakistan</span>
              </div>
            </div>

            {/* 3D Social icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="transition-transform hover:scale-110 hover:-translate-y-0.5"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://www.instagram.com/alimranfabricsonline/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="transition-transform hover:scale-110 hover:-translate-y-0.5"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://youtube.com/@alimranfabrics?si=FUF3Zw6Sqob4LX34"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="transition-transform hover:scale-110 hover:-translate-y-0.5"
              >
                <YouTubeIcon />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4
                className="font-playfair font-semibold mb-4 text-base bg-transparent"
                style={{ color: RED, ...embossStyle }}
              >
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-inter text-sm transition-colors text-[#000080] hover:text-[#B71C1C]"
                      style={embossStyle}
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
              {["Secure Payment", "Authentic Craftsmanship", "Worldwide Shipping"].map((badge) => (
                <div key={badge} className="flex items-center gap-1.5 text-xs font-inter" style={{ color: BLUE, ...embossStyle }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: RED }} />
                  {badge}
                </div>
              ))}
            </div>
            <p className="text-xs font-inter" style={{ color: BLUE, ...embossStyle }}>
              © {new Date().getFullYear()} Al Imran Fabrics. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
