"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, Heart, Menu, X, ChevronDown, Globe } from "lucide-react";
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
  const [currency, setCurrency] = useState("USD");
  const menuRef = useRef<HTMLDivElement>(null);

  const itemCount = useCartStore((s) => s.getItemCount());
  const openCart = useCartStore((s) => s.openCart);
  const { wishlist } = useWishlist();

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || mobileOpen
          ? "bg-white shadow-md"
          : "bg-white/95 backdrop-blur-sm"
      }`}
      style={{ top: "var(--promo-height, 0)" }}
    >
      {/* Top utility bar */}
      <div className="border-b border-ivory-dark hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between py-2">
          <div className="flex items-center gap-4 text-xs text-charcoal/60 font-inter">
            <span>Free Shipping on USA Orders</span>
            <span className="text-gold">|</span>
            <Link href="/about" className="hover:text-emerald transition-colors">Our Story</Link>
            <span className="text-gold">|</span>
            <Link href="/contact" className="hover:text-emerald transition-colors">Contact</Link>
          </div>
          <div className="flex items-center gap-2">
            <Globe size={14} className="text-charcoal/50" />
            <button
              onClick={() => setCurrency(currency === "USD" ? "CAD" : "USD")}
              className="text-xs font-inter font-medium text-charcoal/70 hover:text-emerald transition-colors"
            >
              {currency} ▾
            </button>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav ref={menuRef} className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-charcoal p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex flex-col items-center group">
            <span className="font-playfair font-bold text-emerald text-xl md:text-2xl leading-none tracking-tight">
              Al Imran
            </span>
            <span className="font-playfair text-gold text-xs md:text-sm tracking-[0.2em] uppercase">
              Fabrics
            </span>
          </Link>

          {/* Desktop nav */}
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
                    className="absolute top-full left-1/2 -translate-x-1/2 bg-white shadow-xl border-t-2 border-gold z-50 min-w-[560px] p-6 animate-fade-in"
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
                          <div className="relative h-32 overflow-hidden bg-ivory-dark">
                            <Image
                              src={child.img}
                              alt={child.label}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <span className="text-xs font-inter font-medium text-charcoal uppercase tracking-wide group-hover:text-emerald transition-colors">
                            {child.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-ivory-dark flex items-center justify-between">
                      <span className="text-xs text-charcoal/50 font-inter">
                        View all {item.label}
                      </span>
                      <Link
                        href={item.href}
                        onClick={() => setActiveMenu(null)}
                        className="text-xs font-semibold text-emerald hover:text-gold transition-colors uppercase tracking-wide"
                      >
                        Shop All →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <Link href="/collections/new-arrivals" className="nav-link">
              <span className="text-gold font-semibold">New Arrivals</span>
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-3 md:gap-4">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-charcoal hover:text-emerald transition-colors p-1"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <Link href="/wishlist" className="relative text-charcoal hover:text-emerald transition-colors p-1" aria-label="Wishlist">
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-charcoal text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <button
              onClick={openCart}
              className="relative text-charcoal hover:text-emerald transition-colors p-1"
              aria-label="Shopping cart"
            >
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald text-ivory text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t border-ivory-dark py-3 animate-fade-in">
            <div className="relative max-w-md mx-auto">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40" />
              <input
                type="text"
                placeholder="Search for kurtas, suits, sherwanis..."
                autoFocus
                className="w-full pl-9 pr-4 py-2.5 border border-ivory-dark bg-ivory text-sm font-inter
                           focus:outline-none focus:border-emerald transition-colors"
              />
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-ivory-dark pb-4 animate-fade-in">
            {navItems.map((item) => (
              <div key={item.label}>
                <button
                  className="w-full flex items-center justify-between py-3 text-sm font-inter font-medium uppercase tracking-wide text-charcoal border-b border-ivory-dark"
                  onClick={() => setActiveMenu(activeMenu === item.label ? null : item.label)}
                >
                  {item.label}
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${activeMenu === item.label ? "rotate-180" : ""}`}
                  />
                </button>
                {activeMenu === item.label && (
                  <div className="bg-ivory pl-4">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={() => { setActiveMenu(null); setMobileOpen(false); }}
                        className="block py-2.5 text-sm text-charcoal/70 hover:text-emerald transition-colors border-b border-ivory-dark/50"
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
              className="block py-3 text-sm font-semibold text-gold uppercase tracking-wide"
            >
              New Arrivals
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
