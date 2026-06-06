"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Search, ShoppingBag, Heart, Menu, X, ChevronDown } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useWishlist } from "@/store/wishlistContext";

const navItems = [
  {
    label: "Stitched",
    href: "/collections/stitched",
    children: [
      { label: "Event Ready", href: "/collections/event-ready",  img: "/image/categories/cat-luxury.jpg" },
      { label: "Work Wear",   href: "/collections/work-wear",    img: "/image/categories/cat-stitched.jpg" },
      { label: "Daily Wear",  href: "/collections/daily-wear",   img: "/image/categories/cat-printed.jpg" },
    ],
  },
  {
    label: "Unstitched",
    href: "/collections/unstitched",
    children: [
      { label: "Embroidered", href: "/collections/embroidered", img: "/image/categories/cat-embroidered.jpg" },
      { label: "Printed",     href: "/collections/printed",     img: "/image/categories/cat-printed.jpg" },
    ],
  },
  {
    label: "Men",
    href: "/collections/men",
    children: [
      { label: "Shalwar Kameez", href: "/collections/shalwar-kameez", img: "/image/categories/cat-men-stitched.jpg" },
      { label: "Kurta Pajama",   href: "/collections/kurta-pajama",   img: "/image/categories/cat-men-stitched.jpg" },
    ],
  },
  {
    label: "Kids",
    href: "/collections/kids",
    children: [
      { label: "Girls", href: "/collections/girls", img: "/image/categories/cat-stitched.jpg" },
      { label: "Boys",  href: "/collections/boys",  img: "/image/categories/cat-men-stitched.jpg" },
    ],
  },
];

export default function Navbar() {
  const [isScrolled,  setIsScrolled]  = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [activeMenu,  setActiveMenu]  = useState<string | null>(null);
  const [searchOpen,  setSearchOpen]  = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted,     setMounted]     = useState(false);
  const router   = useRouter();
  const pathname = usePathname();
  const menuRef  = useRef<HTMLDivElement>(null);

  const itemCount = useCartStore((s) => s.getItemCount());
  const openCart  = useCartStore((s) => s.openCart);
  const { wishlist } = useWishlist();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node))
        setActiveMenu(null);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  // ── Hero/transparent mode: homepage only, before scroll ──
  const isHero = pathname === "/" && !isScrolled;

  const headerBg = isScrolled
    ? "bg-white shadow-[0_1px_20px_rgba(0,0,0,0.08)]"
    : isHero
      ? "bg-transparent"
      : "bg-white";

  const borderCls  = isHero ? "border-white/15" : "border-[#E8E4DC]";
  const iconCls    = isHero ? "text-white/75 hover:text-white" : "text-charcoal/70 hover:text-charcoal";
  const socialCls  = isHero ? "text-white/60 hover:text-white" : "text-charcoal/40 hover:text-charcoal";
  const navBg      = isHero ? "bg-transparent" : "bg-white";
  const navBorder  = isHero ? "border-white/15" : "border-[#E8E4DC]";
  const navLinkCls = isHero
    ? "font-dm-sans text-[13px] tracking-[0.06em] uppercase font-medium transition-colors duration-200 text-white/80 hover:text-white"
    : "font-dm-sans text-[13px] tracking-[0.06em] uppercase font-medium transition-colors duration-200 text-charcoal/70 hover:text-charcoal";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}
      style={{ top: "var(--promo-height, 0)" }}
    >
      {/* ── Upper bar: social | logo | icons ── */}
      <div className={`border-b ${borderCls}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Left: burger (mobile) / social icons (desktop) */}
            <div className="flex items-center gap-3">
              <button
                className={`md:hidden p-1 transition-colors ${iconCls}`}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>

              <div className="hidden md:flex items-center gap-2.5">
                {/* Facebook */}
                <a href="https://www.facebook.com/alimranfabricsonline" target="_blank" rel="noopener noreferrer"
                  aria-label="Facebook" className={`transition-colors ${socialCls}`}>
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                  </svg>
                </a>
                {/* Instagram */}
                <a href="https://www.instagram.com/invites/contact/?igsh=k3pgbig93ea2&utm_content=typ780n" target="_blank" rel="noopener noreferrer"
                  aria-label="Instagram" className={`transition-colors ${socialCls}`}>
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
                  </svg>
                </a>
                {/* YouTube */}
                <a href="https://youtube.com/@alimranfabrics?si=KWZm342myl_oCMNy" target="_blank" rel="noopener noreferrer"
                  aria-label="YouTube" className={`transition-colors ${socialCls}`}>
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                    <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
                    <polygon points="9.75,15.02 15.5,12 9.75,8.98 9.75,15.02" fill="white"/>
                  </svg>
                </a>
                {/* TikTok */}
                <a href="https://www.tiktok.com/@alimranfabrics_imr?_t=8pbttWG627z&_r=1" target="_blank" rel="noopener noreferrer"
                  aria-label="TikTok" className={`transition-colors ${socialCls}`}>
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.28 6.28 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.2 8.2 0 004.79 1.53V6.77a4.84 4.84 0 01-1.02-.08z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Center: Logo */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2">
              <div className="relative w-24 h-14 md:w-32 md:h-16 flex-shrink-0">
                <Image
                  src="/image/logo.png"
                  alt="Al Imran Fabrics"
                  fill
                  sizes="128px"
                  className="object-contain"
                  priority
                  style={isHero ? { filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.6)) brightness(0) invert(1)" } : undefined}
                />
              </div>
            </Link>

            {/* Right: action icons */}
            <div className="flex items-center gap-1 md:gap-2">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`p-2 transition-colors ${iconCls}`}
                aria-label="Search"
              >
                <Search size={18} strokeWidth={1.75} />
              </button>

              <Link
                href="/wishlist"
                className={`relative p-2 transition-colors ${iconCls}`}
                aria-label="Wishlist"
              >
                <Heart size={18} strokeWidth={1.75} />
                {mounted && wishlist.length > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-charcoal text-white
                                   text-[9px] font-medium flex items-center justify-center rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <button
                onClick={openCart}
                className={`relative p-2 transition-colors ${iconCls}`}
                aria-label="Shopping cart"
              >
                <ShoppingBag size={18} strokeWidth={1.75} />
                {mounted && itemCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-charcoal text-white
                                   text-[9px] font-medium flex items-center justify-center rounded-full">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Lower bar: horizontal nav links (desktop) ── */}
      <nav ref={menuRef} className={`hidden md:block border-b ${navBorder} ${navBg} transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center gap-8 h-10">
            {navItems.map((item) => (
              <div key={item.label} className="relative">
                <button
                  className={`${navLinkCls} flex items-center gap-1 h-10`}
                  onMouseEnter={() => setActiveMenu(item.label)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  {item.label}
                  <ChevronDown
                    size={12}
                    className={`transition-transform duration-200 ${isHero ? "text-white/50" : "text-charcoal/40"} ${activeMenu === item.label ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Mega menu — always white */}
                {activeMenu === item.label && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.1)] z-50 min-w-[520px] p-6 animate-fade-in border-t-2 border-charcoal"
                    onMouseEnter={() => setActiveMenu(item.label)}
                    onMouseLeave={() => setActiveMenu(null)}
                  >
                    <div className="grid grid-cols-3 gap-5">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={() => setActiveMenu(null)}
                          className="group flex flex-col gap-2"
                        >
                          <div className="relative h-32 overflow-hidden bg-cream">
                            <Image
                              src={child.img}
                              alt={child.label}
                              fill
                              loading="lazy"
                              sizes="160px"
                              quality={75}
                              className="object-cover group-hover:scale-105 transition-transform duration-400"
                            />
                          </div>
                          <span className="font-dm-sans text-xs font-medium uppercase tracking-wide text-charcoal/70 group-hover:text-charcoal transition-colors">
                            {child.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-[#E8E4DC] flex items-center justify-end">
                      <Link
                        href={item.href}
                        onClick={() => setActiveMenu(null)}
                        className="font-dm-sans text-xs font-medium uppercase tracking-wide text-charcoal hover:underline underline-offset-4"
                      >
                        Shop All {item.label} →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <Link
              href="/collections/new-arrivals"
              className={`${navLinkCls} ${isHero ? "text-white font-semibold" : "text-charcoal font-semibold"}`}
            >
              New Arrivals ✦
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Search bar ── */}
      {searchOpen && (
        <div className="bg-white border-b border-[#E8E4DC] animate-fade-in">
          <div className="max-w-7xl mx-auto px-6 py-3">
            <form
              className="relative max-w-lg mx-auto"
              onSubmit={(e) => {
                e.preventDefault();
                const q = searchQuery.trim();
                if (!q) return;
                setSearchOpen(false);
                setSearchQuery("");
                router.push(`/search?q=${encodeURIComponent(q)}`);
              }}
            >
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for kurtas, suits, embroidered sets…"
                autoFocus
                className="w-full pl-9 pr-20 py-2.5 text-sm font-dm-sans bg-[#F5F2ED]
                           border border-[#E8E4DC] focus:outline-none focus:border-charcoal
                           text-charcoal placeholder:text-charcoal/35 transition-colors"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 font-dm-sans text-xs font-semibold
                           uppercase tracking-wide text-charcoal hover:underline"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-[#E8E4DC] animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 pb-4">
            {navItems.map((item) => (
              <div key={item.label}>
                <button
                  className="w-full flex items-center justify-between py-3.5 text-sm font-dm-sans
                             font-medium uppercase tracking-wide text-charcoal border-b border-[#E8E4DC]"
                  onClick={() => setActiveMenu(activeMenu === item.label ? null : item.label)}
                >
                  {item.label}
                  <ChevronDown size={14} className={`transition-transform text-charcoal/40 ${activeMenu === item.label ? "rotate-180" : ""}`} />
                </button>
                {activeMenu === item.label && (
                  <div className="bg-cream pl-4">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={() => { setActiveMenu(null); setMobileOpen(false); }}
                        className="block py-3 text-sm font-dm-sans text-charcoal/60 hover:text-charcoal
                                   border-b border-[#E8E4DC] transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/collections/new-arrivals"
              onClick={() => setMobileOpen(false)}
              className="block py-3.5 text-sm font-dm-sans font-semibold uppercase tracking-wide text-charcoal"
            >
              New Arrivals ✦
            </Link>

            {/* Mobile social icons */}
            <div className="flex items-center gap-4 pt-4 mt-2 border-t border-[#E8E4DC]">
              <a href="https://www.facebook.com/alimranfabricsonline" target="_blank" rel="noopener noreferrer"
                aria-label="Facebook" className="text-charcoal/40 hover:text-charcoal">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/invites/contact/?igsh=k3pgbig93ea2&utm_content=typ780n" target="_blank" rel="noopener noreferrer"
                aria-label="Instagram" className="text-charcoal/40 hover:text-charcoal">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a href="https://youtube.com/@alimranfabrics?si=KWZm342myl_oCMNy" target="_blank" rel="noopener noreferrer"
                aria-label="YouTube" className="text-charcoal/40 hover:text-charcoal">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
                  <polygon points="9.75,15.02 15.5,12 9.75,8.98 9.75,15.02" fill="white"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
