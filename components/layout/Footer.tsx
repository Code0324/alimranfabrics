"use client";

import Link from "next/link";
import Image from "next/image";

const shopLinks = [
  { label: "Women",        href: "/collections/women" },
  { label: "Men",          href: "/collections/men" },
  { label: "Kids",         href: "/collections/kids" },
  { label: "Unstitched",   href: "/collections/unstitched" },
  { label: "New Arrivals", href: "/collections/new-arrivals" },
  { label: "Sale",         href: "/collections/sale" },
];

const customerCareLinks = [
  { label: "About Us",        href: "/about" },
  { label: "Contact Us",      href: "/contact" },
  { label: "Track Your Order", href: "/track-order" },
  { label: "FAQ",             href: "/about" },
];

const helpLinks = [
  { label: "Size Guide",         href: "/size-guide" },
  { label: "Payment Methods",    href: "/payment-methods" },
  { label: "Shipping Info",      href: "/shipping" },
  { label: "Returns & Exchanges", href: "/returns" },
  { label: "Terms & Conditions", href: "/about" },
];

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="font-dm-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal mb-4">
        {title}
      </h4>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="font-dm-sans text-sm text-charcoal/55 hover:text-charcoal transition-colors"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#F5F2ED" }} className="border-t border-[#E8E4DC]">

      {/* ── Main grid ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">

          {/* Col 1: Have Questions? */}
          <div>
            <h4 className="font-dm-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal mb-4">
              Have Questions?
            </h4>
            <div className="space-y-3 mb-6">
              <a
                href="tel:+923145690329"
                className="block font-cormorant text-base font-medium text-charcoal hover:text-charcoal/70 transition-colors"
              >
                +92 314 5690329 (PAK)
              </a>
              <a
                href="mailto:alimranfabrics786@gmail.com"
                className="block font-dm-sans text-sm text-charcoal/55 hover:text-charcoal transition-colors break-all"
              >
                alimranfabrics786@gmail.com
              </a>
              <a
                href="https://wa.me/c/923145690329"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-dm-sans text-sm text-charcoal/55 hover:text-charcoal transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="#25D366" width="14" height="14">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Us
              </a>
              <p className="font-dm-sans text-xs text-charcoal/40">Karachi, Pakistan</p>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3 flex-wrap">
              <a href="https://www.facebook.com/alimranfabricsonline" target="_blank" rel="noopener noreferrer"
                aria-label="Facebook" className="text-charcoal/40 hover:text-charcoal transition-colors">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/invites/contact/?igsh=k3pgbig93ea2&utm_content=typ780n" target="_blank" rel="noopener noreferrer"
                aria-label="Instagram" className="text-charcoal/40 hover:text-charcoal transition-colors">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a href="https://youtube.com/@alimranfabrics?si=KWZm342myl_oCMNy" target="_blank" rel="noopener noreferrer"
                aria-label="YouTube" className="text-charcoal/40 hover:text-charcoal transition-colors">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
                  <polygon points="9.75,15.02 15.5,12 9.75,8.98 9.75,15.02" fill="white"/>
                </svg>
              </a>
              <a href="https://www.tiktok.com/@alimranfabrics_imr?_t=8pbttWG627z&_r=1" target="_blank" rel="noopener noreferrer"
                aria-label="TikTok" className="text-charcoal/40 hover:text-charcoal transition-colors">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.28 6.28 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.2 8.2 0 004.79 1.53V6.77a4.84 4.84 0 01-1.02-.08z"/>
                </svg>
              </a>
              <a href="https://wa.me/c/923145690329" target="_blank" rel="noopener noreferrer"
                aria-label="WhatsApp" className="text-charcoal/40 hover:text-charcoal transition-colors">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Customer Care */}
          <FooterCol title="Customer Care" links={customerCareLinks} />

          {/* Col 3: Help & Information */}
          <FooterCol title="Help & Information" links={helpLinks} />

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="font-dm-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal mb-4">
              Newsletter Signup
            </h4>
            <p className="font-dm-sans text-sm text-charcoal/55 leading-relaxed mb-4">
              Get the latest arrivals and exclusive offers straight to your inbox.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-2"
            >
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2.5 text-sm font-dm-sans bg-white border border-[#E8E4DC]
                           text-charcoal placeholder:text-charcoal/35
                           focus:outline-none focus:border-charcoal transition-colors"
              />
              <button
                type="submit"
                className="w-full px-4 py-2.5 bg-charcoal text-white font-dm-sans text-xs
                           uppercase tracking-[0.12em] font-medium hover:bg-charcoal/80 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-[#E8E4DC]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <div className="relative w-24 h-12">
                <Image
                  src="/image/logo.png"
                  alt="Al Imran Fabrics"
                  fill
                  sizes="96px"
                  className="object-contain"
                />
              </div>
            </Link>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              {["Secure Payment", "Authentic Craftsmanship", "Worldwide Shipping", "5.0 ★ Rating"].map((badge) => (
                <span key={badge} className="font-dm-sans text-[11px] text-charcoal/40 uppercase tracking-wider">
                  {badge}
                </span>
              ))}
            </div>

            {/* Payment icons + copyright */}
            <div className="flex flex-col items-end gap-2">
              {/* Payment brand pills */}
              <div className="flex items-center gap-1.5 flex-wrap justify-end">
                {["VISA", "MC", "AMEX", "Discover", "PayPal", "Apple Pay", "Google Pay", "JazzCash", "EasyPaisa"].map((brand) => (
                  <span
                    key={brand}
                    className="font-dm-sans text-[7px] font-bold px-1.5 py-0.5 border border-[#E8E4DC] text-charcoal/35 rounded grayscale hover:grayscale-0 transition-all"
                  >
                    {brand}
                  </span>
                ))}
              </div>
              <p className="font-dm-sans text-xs text-charcoal/35">
                © {new Date().getFullYear()} Al Imran Fabrics
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
