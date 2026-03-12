"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, Heart, Menu, X, ChevronDown, Facebook, Instagram, Youtube } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useWishlist } from "@/store/wishlistContext";

const navItems = [
  {
    label: "Ready to Wear",
    href: "/collections/ready-to-wear",
    children: [
      { label: "Women's Formal", href: "/collections/formal", img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=200&q=70" },
      { label: "Women's Casual", href: "/collections/casual", img: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=200&q=70" },
      { label: "Embroidered", href: "/collections/embroidered", img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=200&q=70" },
      { label: "Jacquard", href: "/collections/jacquard", img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=200&q=70" },
    ],
  },
  {
    label: "Unstitched",
    href: "/collections/unstitched",
    children: [
      { label: "Lawn", href: "/collections/lawn", img: "https://images.unsplash.com/photo-1558171813-0ebd2dc6d440?w=200&q=70" },
      { label: "Khaddar", href: "/collections/khaddar", img: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=200&q=70" },
      { label: "Cotton", href: "/collections/cotton", img: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=200&q=70" },
    ],
  },
  {
    label: "Men",
    href: "/collections/men",
    children: [
      { label: "Shalwar Kameez", href: "/collections/shalwar-kameez", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=70" },
      { label: "Sherwani", href: "/collections/sherwani", img: "https://images.unsplash.com/photo-1512418490979-92798cec1380?w=200&q=70" },
      { label: "Waistcoat Sets", href: "/collections/waistcoat", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=70" },
    ],
  },
  {
    label: "Kids",
    href: "/collections/kids",
    children: [
      { label: "Girls", href: "/collections/girls", img: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=200&q=70" },
      { label: "Boys", href: "/collections/boys", img: "https://images.unsplash.com/photo-1533483595632-c5f0e57a1936?w=200&q=70" },
    ],
  },
];


export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
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
          <span className="font-inter text-xs font-semibold tracking-wide px-4" style={{ color: "#FFFD82" }}>
            <span style={{ color: "#FFFD82" }}>Free Shipping</span>
            <span style={{ color: "rgba(255,253,130,0.75)" }}> — No Duty. No Drama. </span>
            <span style={{ color: "#ffffff" }}>●</span>
            <span style={{ color: "rgba(255,253,130,0.75)" }}> New Ramadan Collection Out Now </span>
            <span style={{ color: "#ffffff" }}>●</span>
            <span style={{ color: "#FFFD82" }}> Free USA Shipping </span>
            <span style={{ color: "rgba(255,253,130,0.75)" }}> — Save up to </span>
            <span style={{ color: "#FFFD82" }}>50% OFF </span>
            <span style={{ color: "#ffffff" }}>●</span>
            <span style={{ color: "rgba(255,253,130,0.75)" }}> Global Shipping Available </span>
          </span>
          <span className="font-inter text-xs font-semibold tracking-wide px-4" aria-hidden style={{ color: "#FFFD82" }}>
            <span style={{ color: "#FFFD82" }}>Free Shipping</span>
            <span style={{ color: "rgba(255,253,130,0.75)" }}> — No Duty. No Drama. </span>
            <span style={{ color: "#ffffff" }}>●</span>
            <span style={{ color: "rgba(255,253,130,0.75)" }}> New Ramadan Collection Out Now </span>
            <span style={{ color: "#ffffff" }}>●</span>
            <span style={{ color: "#FFFD82" }}> Free USA Shipping </span>
            <span style={{ color: "rgba(255,253,130,0.75)" }}> — Save up to </span>
            <span style={{ color: "#FFFD82" }}>50% OFF </span>
            <span style={{ color: "#ffffff" }}>●</span>
            <span style={{ color: "rgba(255,253,130,0.75)" }}> Global Shipping Available </span>
          </span>
        </div>
      </div>

      {/* ── Top utility bar ── */}
      <div
        className="hidden md:block border-b transition-all duration-300"
        style={{ backgroundColor: "#CC0000", borderColor: "rgba(255,0,0,0.3)" }}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            {[
              { href: "https://facebook.com",                                          Icon: Facebook,  label: "Facebook" },
              { href: "https://www.instagram.com/alimranfabricsonline/",               Icon: Instagram, label: "Instagram" },
              { href: "https://youtube.com/@alimranfabrics?si=FUF3Zw6Sqob4LX34",      Icon: Youtube,   label: "YouTube" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="transition-opacity hover:opacity-70"
                style={{ color: "#FFFD82" }}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
          <span className="font-inter text-xs font-semibold" style={{ color: "#FFFD82" }}>
            PKR — Pakistan Rupee
          </span>
        </div>
      </div>

      {/* ── Main navbar ── */}
      <nav
        ref={menuRef}
        className={`max-w-none transition-all duration-300 ${
          isScrolled || mobileOpen ? "shadow-lg" : ""
        }`}
        style={{ background: "linear-gradient(180deg,#ffffcc 0%,#FFFD82 45%,#f0eb60 100%)", borderBottom: "2px solid rgba(12,19,80,0.12)", boxShadow: "0 2px 12px rgba(255,253,130,0.4)" }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
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
              <div className="relative w-16 h-12 md:w-20 md:h-14 flex-shrink-0">
                <Image
                  src="/image/logo.jpeg"
                  alt="Al Imran Fabrics"
                  fill
                  sizes="80px"
                  className="object-contain"
                  style={{ mixBlendMode: "multiply" }}
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
                    style={{ borderRadius: "4px", backgroundColor: "#FFFD82", color: "#CC0000" }}
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
                    style={{ borderRadius: "4px", backgroundColor: "#FFFD82", color: "#CC0000" }}
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
              <div className="relative max-w-md mx-auto">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#0C1350" }} />
                <input
                  type="text"
                  placeholder="Search for kurtas, suits, sherwanis..."
                  autoFocus
                  className="w-full pl-9 pr-4 py-2.5 text-sm font-inter focus:outline-none transition-colors"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "2px solid #0C1350",
                    color: "#0C1350",
                  }}
                />
              </div>
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
