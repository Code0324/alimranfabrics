"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, ShoppingBag, Heart, Menu, X, ChevronDown } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useWishlist } from "@/store/wishlistContext";

const navItems = [
  {
    label: "Ready to Wear",
    href: "/collections/ready-to-wear",
    children: [
      { label: "Women's Formal", href: "/collections/formal", img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=200&q=65&fm=webp&auto=compress" },
      { label: "Women's Casual", href: "/collections/casual", img: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=200&q=65&fm=webp&auto=compress" },
      { label: "Embroidered", href: "/collections/embroidered", img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=200&q=65&fm=webp&auto=compress" },
      { label: "Jacquard", href: "/collections/jacquard", img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=200&q=65&fm=webp&auto=compress" },
    ],
  },
  {
    label: "Unstitched",
    href: "/collections/unstitched",
    children: [
      { label: "Lawn", href: "/collections/lawn", img: "https://images.unsplash.com/photo-1558171813-0ebd2dc6d440?w=200&q=65&fm=webp&auto=compress" },
      { label: "Khaddar", href: "/collections/khaddar", img: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=200&q=65&fm=webp&auto=compress" },
      { label: "Cotton", href: "/collections/cotton", img: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=200&q=65&fm=webp&auto=compress" },
    ],
  },
  {
    label: "Men",
    href: "/collections/men",
    children: [
      { label: "Shalwar Kameez", href: "/collections/shalwar-kameez", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=65&fm=webp&auto=compress" },
      { label: "Sherwani", href: "/collections/sherwani", img: "https://images.unsplash.com/photo-1512418490979-92798cec1380?w=200&q=65&fm=webp&auto=compress" },
      { label: "Waistcoat Sets", href: "/collections/waistcoat", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=65&fm=webp&auto=compress" },
    ],
  },
  {
    label: "Kids",
    href: "/collections/kids",
    children: [
      { label: "Girls", href: "/collections/girls", img: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=200&q=65&fm=webp&auto=compress" },
      { label: "Boys", href: "/collections/boys", img: "https://images.unsplash.com/photo-1533483595632-c5f0e57a1936?w=200&q=65&fm=webp&auto=compress" },
    ],
  },
];


export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const itemCount = useCartStore((s) => s.getItemCount());
  const openCart = useCartStore((s) => s.openCart);
  const { wishlist } = useWishlist();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{ top: "var(--promo-height, 0)" }}
    >
      {/* ── Announcement ticker ── */}
      <div className="overflow-hidden py-1.5" style={{ backgroundColor: "#CC0000" }}>
        <div
          className="flex whitespace-nowrap animate-ticker"
          aria-label="Announcements"
        >
          {[0, 1].map((i) => (
            <span key={i} aria-hidden={i === 1 || undefined}
              className="font-inter text-xs font-semibold tracking-wide px-4"
              style={{ color: "#FFE500", textShadow: "-1px -1px 0px rgba(160,0,0,0.5), 1px 1px 0px rgba(255,255,200,0.18)" }}>
              <span>Worldwide Shipping</span>
              <span style={{ color: "#ffffff", margin: "0 6px" }}>✦</span>
              <span style={{ color: "rgba(255,229,0,0.9)" }}>New Ramadan Collection Out Now</span>
              <span style={{ color: "#ffffff", margin: "0 6px" }}>✦</span>
              <span>50% OFF Selected Pieces</span>
              <span style={{ color: "#ffffff", margin: "0 6px" }}>✦</span>
              <span style={{ color: "rgba(255,229,0,0.9)" }}>Global Delivery Available</span>
              <span style={{ color: "#ffffff", margin: "0 6px" }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Top utility bar ── */}
      <div
        className="hidden md:block border-b transition-all duration-300"
        style={{ backgroundColor: "#CC0000", borderColor: "rgba(255,0,0,0.3)" }}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between py-2">
          <div className="flex items-center gap-2.5">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="transition-transform hover:scale-110">
              <svg width="22" height="22" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="nfb" cx="38%" cy="18%" r="80%"><stop offset="0%" stopColor="#60a8f7"/><stop offset="100%" stopColor="#0866ff"/></radialGradient>
                </defs>
                <circle cx="18" cy="18" r="17" fill="url(#nfb)"/>
                <path d="M19.5 12.5H21.5V9.5H19.5C17.567 9.5 16 11.067 16 13V14.5H14V17.5H16V26.5H19V17.5H21.5L22 14.5H19V13C19 12.776 19.224 12.5 19.5 12.5Z" fill="white"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/alimranfabricsonline/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="transition-transform hover:scale-110">
              <svg width="22" height="22" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="nig" cx="30%" cy="105%" r="130%"><stop offset="0%" stopColor="#fdf497"/><stop offset="35%" stopColor="#fd5949"/><stop offset="55%" stopColor="#d6249f"/><stop offset="100%" stopColor="#285AEB"/></radialGradient>
                </defs>
                <rect x="1" y="1" width="34" height="34" rx="10" fill="url(#nig)"/>
                <rect x="10" y="10" width="16" height="16" rx="5" fill="none" stroke="white" strokeWidth="1.8"/>
                <circle cx="18" cy="18" r="4" fill="none" stroke="white" strokeWidth="1.8"/>
                <circle cx="24.5" cy="11.5" r="1.3" fill="white"/>
              </svg>
            </a>
            <a href="https://youtube.com/@alimranfabrics?si=FUF3Zw6Sqob4LX34" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="transition-transform hover:scale-110">
              <svg width="22" height="22" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="nyt" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#ff5a5a"/><stop offset="100%" stopColor="#cc0000"/></linearGradient>
                </defs>
                <rect x="1" y="1" width="34" height="34" rx="9" fill="url(#nyt)"/>
                <path d="M26.5 13.2C26.3 12.4 25.7 11.8 24.9 11.5C23.4 11 18 11 18 11C18 11 12.6 11 11.1 11.5C10.3 11.8 9.7 12.4 9.5 13.2C9 14.7 9 18 9 18C9 18 9 21.3 9.5 22.8C9.7 23.6 10.3 24.2 11.1 24.5C12.6 25 18 25 18 25C18 25 23.4 25 24.9 24.5C25.7 24.2 26.3 23.6 26.5 22.8C27 21.3 27 18 27 18C27 18 27 14.7 26.5 13.2Z" fill="white"/>
                <polygon points="15.5,15 15.5,21 21,18" fill="#cc0000"/>
              </svg>
            </a>

          </div>
        </div>
      </div>

      {/* ── Main navbar ── */}
      <nav
        ref={menuRef}
        className={`max-w-none transition-all duration-300 ${
          isScrolled || mobileOpen ? "shadow-lg" : ""
        }`}
        style={{ background: "linear-gradient(180deg,#FFF5AA 0%,#FFE500 45%,#E8CE00 100%)", borderBottom: "2px solid rgba(12,19,80,0.12)", boxShadow: "0 2px 12px rgba(255,229,0,0.4)" }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-1 transition-colors"
              style={{ color: "#0C1350" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#CC0000")}
              onMouseLeave={e => (e.currentTarget.style.color = "#0C1350")}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center group">
              <div className="relative w-28 h-16 md:w-36 md:h-20 flex-shrink-0">
                <Image
                  src="/image/logo.png"
                  alt="Al Imran Fabrics"
                  fill
                  sizes="144px"
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* ── Desktop nav links ── */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <div key={item.label} className="relative">
                  <button
                    className="nav-link flex items-center gap-1 py-6"
                    onMouseEnter={() => setActiveMenu(item.label)}
                    onMouseLeave={() => setActiveMenu(null)}
                    onClick={() => setActiveMenu(activeMenu === item.label ? null : item.label)}
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${
                        activeMenu === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Mega Menu */}
                  {activeMenu === item.label && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 bg-white shadow-xl z-50 min-w-[560px] p-6 animate-fade-in"
                      style={{ borderTop: "3px solid #CC0000" }}
                      onMouseEnter={() => setActiveMenu(item.label)}
                      onMouseLeave={() => setActiveMenu(null)}
                    >
                      <div className="grid grid-cols-3 gap-4">
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
                                sizes="180px"
                                quality={75}
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <span
                              className="text-xs font-inter font-medium uppercase tracking-wide transition-colors"
                              style={{ color: "#2C2C2C" }}
                            >
                              {child.label}
                            </span>
                          </Link>
                        ))}
                      </div>
                      <div
                        className="mt-4 pt-4 flex items-center justify-between"
                        style={{ borderTop: "1px solid #F0EBE1" }}
                      >
                        <span className="text-xs font-inter" style={{ color: "rgba(44,44,44,0.5)" }}>
                          View all {item.label}
                        </span>
                        <Link
                          href={item.href}
                          onClick={() => setActiveMenu(null)}
                          className="text-xs font-semibold uppercase tracking-wide transition-colors hover:text-[#C9A84C]"
                          style={{ color: "#0C1350" }}
                        >
                          Shop All →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <Link href="/collections/new-arrivals" className="nav-link">
                <span style={{ color: "#CC0000" }} className="font-bold">New Arrivals ✦</span>
              </Link>
            </div>

            {/* ── Icon actions ── */}
            <div className="flex items-center gap-3 md:gap-4">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-1 transition-colors"
                style={{ color: "#0C1350" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#CC0000")}
                onMouseLeave={e => (e.currentTarget.style.color = "#0C1350")}
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <Link
                href="/wishlist"
                className="relative p-1 transition-colors"
                style={{ color: "#0C1350" }}
                aria-label="Wishlist"
              >
                <Heart size={20} />
                {mounted && wishlist.length > 0 && (
                  <span
                    className="absolute -top-1 -right-1 text-[10px] font-bold w-4 h-4 flex items-center justify-center"
                    style={{ borderRadius: "4px", backgroundColor: "#FFE500", color: "#CC0000" }}
                  >
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <button
                onClick={openCart}
                className="relative p-1 transition-colors"
                style={{ color: "#0C1350" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#CC0000")}
                onMouseLeave={e => (e.currentTarget.style.color = "#0C1350")}
                aria-label="Shopping cart"
              >
                <ShoppingBag size={20} />
                {mounted && itemCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 text-[10px] font-bold w-4 h-4 flex items-center justify-center"
                    style={{ borderRadius: "4px", backgroundColor: "#FFE500", color: "#CC0000" }}
                  >
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* ── Search bar ── */}
          {searchOpen && (
            <div
              className="py-3 animate-fade-in"
              style={{ borderTop: "1px solid rgba(12,19,80,0.15)" }}
            >
              <form
                className="relative max-w-md mx-auto"
                onSubmit={(e) => {
                  e.preventDefault();
                  const q = searchQuery.trim();
                  if (!q) return;
                  setSearchOpen(false);
                  setSearchQuery("");
                  router.push(`/search?q=${encodeURIComponent(q)}`);
                }}
              >
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#0C1350" }} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for kurtas, suits, sherwanis..."
                  autoFocus
                  className="w-full pl-9 pr-12 py-2.5 text-sm font-inter focus:outline-none transition-colors"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "2px solid #0C1350",
                    color: "#0C1350",
                  }}
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 font-inter text-xs font-bold uppercase tracking-wide px-1"
                  style={{ color: "#CC0000" }}
                >
                  Go
                </button>
              </form>
            </div>
          )}

          {/* ── Mobile menu ── */}
          {mobileOpen && (
            <div
              className="md:hidden pb-4 animate-fade-in"
              style={{ borderTop: "2px solid rgba(12,19,80,0.2)" }}
            >
              {navItems.map((item) => (
                <div key={item.label}>
                  <button
                    className="w-full flex items-center justify-between py-3 text-sm font-inter font-bold uppercase tracking-wide"
                    style={{
                      color: "#0C1350",
                      borderBottom: "1px solid rgba(12,19,80,0.12)",
                    }}
                    onClick={() => setActiveMenu(activeMenu === item.label ? null : item.label)}
                  >
                    {item.label}
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${activeMenu === item.label ? "rotate-180" : ""}`}
                      style={{ color: "#CC0000" }}
                    />
                  </button>
                  {activeMenu === item.label && (
                    <div style={{ backgroundColor: "rgba(255,255,255,0.6)" }} className="pl-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={() => { setActiveMenu(null); setMobileOpen(false); }}
                          className="block py-2.5 text-sm font-inter font-medium transition-colors"
                          style={{
                            color: "#0C1350",
                            borderBottom: "1px solid rgba(12,19,80,0.08)",
                          }}
                          onMouseEnter={e => (e.currentTarget.style.color = "#CC0000")}
                          onMouseLeave={e => (e.currentTarget.style.color = "#0C1350")}
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
                className="block py-3 text-sm font-bold uppercase tracking-wide"
                style={{ color: "#CC0000" }}
              >
                New Arrivals ✦
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
