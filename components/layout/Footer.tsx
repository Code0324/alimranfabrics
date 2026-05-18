import Link from "next/link";
import Image from "next/image";

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
    { label: "Printed", href: "/collections/printed" },
    { label: "Jacquard", href: "/collections/jacquard" },
    { label: "Solid", href: "/collections/solid" },
    { label: "Event Ready", href: "/collections/event-ready" },
    { label: "Work Wear", href: "/collections/work-wear" },
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

const YELLOW = "#FFE500";
const BLUE   = "#000080";
const RED    = "#B71C1C";

// Embossed text — raised feel on yellow background
const embossText: React.CSSProperties = {
  textShadow: "-1px -1px 1px rgba(255,255,255,0.80), 1px 1px 1px rgba(0,0,0,0.14)",
};

/* ── Branded contact icons ── */
function GmailIcon() {
  return (
    <svg width="20" height="15" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="gm-s" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#EA4335" floodOpacity="0.45"/>
        </filter>
      </defs>
      {/* White envelope base */}
      <rect x="0.5" y="0.5" width="39" height="29" rx="3" fill="white" filter="url(#gm-s)"/>
      {/* Blue left panel */}
      <path d="M0.5 4 Q0.5 0.5 4 0.5 L7 0.5 L7 24 L0.5 29.5Z" fill="#4285F4"/>
      {/* Green right panel */}
      <path d="M39.5 4 Q39.5 0.5 36 0.5 L33 0.5 L33 24 L39.5 29.5Z" fill="#34A853"/>
      {/* Yellow bottom-left */}
      <path d="M0.5 29.5 L7 24 L20 16 Z" fill="#FBBC04"/>
      {/* Red bottom-right */}
      <path d="M39.5 29.5 L33 24 L20 16 Z" fill="#EA4335"/>
      {/* Red M-fold at top */}
      <path d="M0.5 0.5 L20 15 L39.5 0.5 Z" fill="#EA4335"/>
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ph-g" cx="35%" cy="25%" r="75%">
          <stop offset="0%" stopColor="#4CAF50"/>
          <stop offset="100%" stopColor="#1B5E20"/>
        </radialGradient>
        <filter id="ph-s" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#1B5E20" floodOpacity="0.5"/>
          <feDropShadow dx="0" dy="-1" stdDeviation="1" floodColor="rgba(255,255,255,0.4)" floodOpacity="1"/>
        </filter>
      </defs>
      <rect x="1" y="1" width="30" height="30" rx="8" fill="url(#ph-g)" filter="url(#ph-s)"/>
      {/* Shine highlight */}
      <ellipse cx="12" cy="7" rx="8" ry="2.5" fill="rgba(255,255,255,0.22)"/>
      {/* Phone handset */}
      <path d="M10 8C10.5 8 10.9 8.2 11 8.5C11.5 9.3 12.1 10.6 12.3 11.1C12.5 11.6 12.3 12.1 12 12.5L11 13.4C11.7 14.8 12.8 15.8 14.1 16.5L15.2 15.5C15.5 15.2 16 15 16.5 15.2C17 15.4 18.2 16 19 16.5C19.3 16.7 19.5 17 19.5 17.5C19.5 19 18.4 21 16.8 21.3C14.1 21.8 9.5 19.4 7.7 15.2C7 13.6 5.8 10.3 9.4 8.1C9.6 8 9.8 8 10 8Z" fill="white"/>
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="14" height="18" viewBox="0 0 28 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="pin-g" cx="35%" cy="22%" r="72%">
          <stop offset="0%" stopColor="#EF5350"/>
          <stop offset="100%" stopColor="#B71C1C"/>
        </radialGradient>
        <filter id="pin-s" x="-35%" y="-10%" width="170%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="2.5" floodColor="#7F0000" floodOpacity="0.55"/>
          <feDropShadow dx="-1" dy="-1" stdDeviation="1" floodColor="rgba(255,255,255,0.4)" floodOpacity="1"/>
        </filter>
      </defs>
      {/* Pin body */}
      <path d="M14 1C6.8 1 1 6.8 1 14C1 23 14 37 14 37C14 37 27 23 27 14C27 6.8 21.2 1 14 1Z"
        fill="url(#pin-g)" filter="url(#pin-s)"/>
      {/* Specular highlight */}
      <ellipse cx="10" cy="9" rx="4.5" ry="3" fill="rgba(255,255,255,0.35)"/>
      {/* Inner white dot */}
      <circle cx="14" cy="14" r="5" fill="white" opacity="0.92"/>
      {/* Red center */}
      <circle cx="14" cy="14" r="2.5" fill="#B71C1C" opacity="0.7"/>
    </svg>
  );
}

/* ── 3D Social icons ── */
function FacebookIcon() {
  return (
    <svg width="38" height="38" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="fb-radial" cx="38%" cy="18%" r="80%">
          <stop offset="0%" stopColor="#60a8f7" />
          <stop offset="100%" stopColor="#0866ff" />
        </radialGradient>
        <filter id="fb-drop" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#0844bb" floodOpacity="0.6" />
          <feDropShadow dx="0" dy="-1" stdDeviation="1" floodColor="rgba(255,255,255,0.5)" floodOpacity="1" />
        </filter>
      </defs>
      <circle cx="18" cy="18" r="17" fill="url(#fb-radial)" filter="url(#fb-drop)" />
      <ellipse cx="15" cy="10" rx="7" ry="3" fill="rgba(255,255,255,0.18)" />
      <path
        d="M19.5 12.5H21.5V9.5H19.5C17.567 9.5 16 11.067 16 13V14.5H14V17.5H16V26.5H19V17.5H21.5L22 14.5H19V13C19 12.776 19.224 12.5 19.5 12.5Z"
        fill="white"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="38" height="38" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ig-radial" cx="30%" cy="107%" r="135%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="10%" stopColor="#fda86e" />
          <stop offset="35%" stopColor="#fd5949" />
          <stop offset="55%" stopColor="#d6249f" />
          <stop offset="82%" stopColor="#5b4fe9" />
          <stop offset="100%" stopColor="#285AEB" />
        </radialGradient>
        <filter id="ig-drop" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#c13584" floodOpacity="0.55" />
          <feDropShadow dx="0" dy="-1" stdDeviation="1" floodColor="rgba(255,255,255,0.4)" floodOpacity="1" />
        </filter>
      </defs>
      <rect x="1" y="1" width="34" height="34" rx="10" fill="url(#ig-radial)" filter="url(#ig-drop)" />
      <ellipse cx="18" cy="6" rx="10" ry="3" fill="rgba(255,255,255,0.15)" />
      <rect x="10" y="10" width="16" height="16" rx="5" fill="none" stroke="white" strokeWidth="1.9" />
      <circle cx="18" cy="18" r="4.2" fill="none" stroke="white" strokeWidth="1.9" />
      <circle cx="24.5" cy="11.5" r="1.4" fill="white" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="38" height="38" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="yt-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ff5555" />
          <stop offset="100%" stopColor="#c00000" />
        </linearGradient>
        <filter id="yt-drop" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#7a0000" floodOpacity="0.55" />
          <feDropShadow dx="0" dy="-1" stdDeviation="1" floodColor="rgba(255,255,255,0.4)" floodOpacity="1" />
        </filter>
      </defs>
      <rect x="1" y="1" width="34" height="34" rx="9" fill="url(#yt-grad)" filter="url(#yt-drop)" />
      <ellipse cx="18" cy="6" rx="10" ry="3" fill="rgba(255,255,255,0.15)" />
      <path
        d="M26.5 13.2C26.3 12.4 25.7 11.8 24.9 11.5C23.4 11 18 11 18 11C18 11 12.6 11 11.1 11.5C10.3 11.8 9.7 12.4 9.5 13.2C9 14.7 9 18 9 18C9 18 9 21.3 9.5 22.8C9.7 23.6 10.3 24.2 11.1 24.5C12.6 25 18 25 18 25C18 25 23.4 25 24.9 24.5C25.7 24.2 26.3 23.6 26.5 22.8C27 21.3 27 18 27 18C27 18 27 14.7 26.5 13.2Z"
        fill="white"
      />
      <polygon points="15.5,15 15.5,21 21,18" fill="#c00000" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="38" height="38" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="tt-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#111111" />
          <stop offset="100%" stopColor="#000000" />
        </linearGradient>
        <filter id="tt-drop" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.55" />
          <feDropShadow dx="0" dy="-1" stdDeviation="1" floodColor="rgba(255,255,255,0.4)" floodOpacity="1" />
        </filter>
      </defs>
      <rect x="1" y="1" width="34" height="34" rx="9" fill="url(#tt-grad)" filter="url(#tt-drop)" />
      <ellipse cx="18" cy="6" rx="10" ry="3" fill="rgba(255,255,255,0.1)" />
      {/* TikTok musical note icon */}
      <path d="M22 9h-2.5a4.5 4.5 0 01-4.5 4.5V16a7 7 0 004 .65V21a4 4 0 01-4 4 4 4 0 01-4-4 4 4 0 014-4v-2.5a6.5 6.5 0 00-6.5 6.5A6.5 6.5 0 0015 27a6.5 6.5 0 006.5-6.5V14a7 7 0 004.5 1.65V13.1A4.5 4.5 0 0122 9z" fill="white" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="38" height="38" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="wa-grad" cx="35%" cy="25%" r="75%">
          <stop offset="0%" stopColor="#4fce6e" />
          <stop offset="100%" stopColor="#128C7E" />
        </radialGradient>
        <filter id="wa-drop" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#075E54" floodOpacity="0.55" />
          <feDropShadow dx="0" dy="-1" stdDeviation="1" floodColor="rgba(255,255,255,0.4)" floodOpacity="1" />
        </filter>
      </defs>
      <rect x="1" y="1" width="34" height="34" rx="9" fill="url(#wa-grad)" filter="url(#wa-drop)" />
      <ellipse cx="18" cy="6" rx="10" ry="3" fill="rgba(255,255,255,0.18)" />
      <path d="M25 11.1A9.8 9.8 0 0018 8a9.9 9.9 0 00-8.6 14.8L8 28l5.4-1.4A9.9 9.9 0 0018 27.9a9.9 9.9 0 009.9-9.9 9.8 9.8 0 00-2.9-6.9zm-7 15.2a8.2 8.2 0 01-4.2-1.1l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 019.8 18 8.2 8.2 0 0118 9.8a8.2 8.2 0 018.2 8.2 8.2 8.2 0 01-8.2 8.3zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.6.8-.8 1-.1.2-.3.2-.5.1-.3-.1-1.1-.4-2-1.3-.7-.7-1.2-1.5-1.4-1.7-.1-.3 0-.4.1-.5l.4-.5c.1-.1.2-.3.2-.4.1-.2 0-.3 0-.5-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.7 4.3 3.8.6.3 1.1.4 1.4.5.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.2-.2-.5-.3z" fill="white" />
    </svg>
  );
}

function GoogleMapsIcon() {
  return (
    <svg width="38" height="38" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="gm2-grad" cx="35%" cy="22%" r="72%">
          <stop offset="0%" stopColor="#34A853" />
          <stop offset="100%" stopColor="#1E7E34" />
        </radialGradient>
        <filter id="gm2-drop" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#0a4d1a" floodOpacity="0.55" />
          <feDropShadow dx="0" dy="-1" stdDeviation="1" floodColor="rgba(255,255,255,0.4)" floodOpacity="1" />
        </filter>
      </defs>
      <rect x="1" y="1" width="34" height="34" rx="9" fill="url(#gm2-grad)" filter="url(#gm2-drop)" />
      <ellipse cx="18" cy="6" rx="10" ry="3" fill="rgba(255,255,255,0.18)" />
      {/* Map pin */}
      <path d="M18 8a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" fill="white" />
    </svg>
  );
}


export default function Footer() {
  return (
    <footer style={{ backgroundColor: YELLOW }}>
      <div className="ornamental-border" />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* ── Brand column ── */}
          <div className="lg:col-span-2">

            {/* Logo — transparent PNG, emboss filter on text only */}
            <div className="mb-5">
              <Link href="/">
                <div className="relative w-40 h-24 inline-block">
                  <Image
                    src="/image/logo.png"
                    alt="Al Imran Fabrics"
                    fill
                    sizes="160px"
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>
            </div>

            <p className="font-inter text-sm leading-relaxed mb-6 max-w-xs" style={{ color: BLUE, ...embossText }}>
              Bringing the timeless elegance of Pakistani craftsmanship to homes around the world. Each piece tells a story of heritage, artistry, and love.
            </p>

            {/* Contact info — original branded icons */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2.5 text-xs" style={{ color: BLUE, ...embossText }}>
                <span className="flex-shrink-0"><GmailIcon /></span>
                <span>alimranfabrics786@gmail.com</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs" style={{ color: BLUE, ...embossText }}>
                <span className="flex-shrink-0"><PhoneIcon /></span>
                <span>+92 314 5690329 (PAK)</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs" style={{ color: BLUE, ...embossText }}>
                <span className="flex-shrink-0"><MapPinIcon /></span>
                <span>Karachi, Pakistan</span>
              </div>
            </div>

            {/* 3D Social icons */}
            <div className="flex items-center gap-3 flex-wrap">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="transition-transform hover:scale-110 hover:-translate-y-1">
                <FacebookIcon />
              </a>
              <a href="https://www.instagram.com/invites/contact/?igsh=k3pgbig93ea2&utm_content=typ780n" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="transition-transform hover:scale-110 hover:-translate-y-1">
                <InstagramIcon />
              </a>
              <a href="https://youtube.com/@alimranfabrics?si=KWZm342myl_oCMNy" target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                className="transition-transform hover:scale-110 hover:-translate-y-1">
                <YouTubeIcon />
              </a>
              <a href="https://www.tiktok.com/@alimranfabrics_imr?_t=8pbttWG627z&_r=1" target="_blank" rel="noopener noreferrer" aria-label="TikTok"
                className="transition-transform hover:scale-110 hover:-translate-y-1">
                <TikTokIcon />
              </a>
              <a href="https://wa.me/c/923145690329" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Catalogue"
                className="transition-transform hover:scale-110 hover:-translate-y-1">
                <WhatsAppIcon />
              </a>
              <a href="https://maps.app.goo.gl/NdQqREdtZzHKUMq49" target="_blank" rel="noopener noreferrer" aria-label="Shop Location on Google Maps"
                className="transition-transform hover:scale-110 hover:-translate-y-1">
                <GoogleMapsIcon />
              </a>
            </div>
            {/* WhatsApp Channel */}
            <a
              href="https://whatsapp.com/channel/0029VaBgCb0Chq6Q7iQRfU1A"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-3 font-inter text-xs font-medium"
              style={{ color: BLUE, ...embossText }}
            >
              <svg viewBox="0 0 24 24" fill="#25D366" width="14" height="14">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Follow Our Channel for More New Updates
            </a>
          </div>

          {/* ── Link columns ── */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-playfair font-bold mb-4 text-base bg-transparent" style={{ color: RED, ...embossText }}>
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-inter text-sm transition-colors hover:text-[#B71C1C]"
                      style={{ color: BLUE, ...embossText }}
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

      {/* ── Bottom bar ── */}
      <div style={{ borderTop: "1px solid rgba(0,0,128,0.2)" }}>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-6">
              {["Secure Payment", "Authentic Craftsmanship", "Worldwide Shipping"].map((badge) => (
                <div key={badge} className="flex items-center gap-1.5 text-xs font-inter font-medium"
                  style={{ color: BLUE, ...embossText }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: RED }} />
                  {badge}
                </div>
              ))}
            </div>
            <p className="text-xs font-inter" style={{ color: BLUE, ...embossText }}>
              © {new Date().getFullYear()} Al Imran Fabrics. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
