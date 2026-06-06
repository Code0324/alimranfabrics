"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Home, Search, ShoppingBag, User } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", href: "/", Icon: Home },
  { label: "Search", href: "/collections/women", Icon: Search },
  { label: "Cart", href: "#cart", Icon: ShoppingBag, isCart: true },
  { label: "Account", href: "/login", Icon: User },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const itemCount = useCartStore((s) => s.getItemCount());
  const openCart = useCartStore((s) => s.openCart);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-[#E8E4DC] bg-white"
      aria-label="Mobile navigation"
    >
      <div className="grid grid-cols-4 h-14">
        {navItems.map(({ label, href, Icon, isCart }) => {
          const isActive = !isCart && pathname === href;

          if (isCart) {
            return (
              <button
                key={label}
                onClick={openCart}
                className="flex flex-col items-center justify-center gap-1 relative transition-colors"
                aria-label="Open cart"
              >
                <div className="relative">
                  <ShoppingBag size={20} className={isActive ? "text-charcoal" : "text-charcoal/40"} />
                  {mounted && itemCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 text-[9px] font-medium w-3.5 h-3.5
                                     flex items-center justify-center rounded-full bg-charcoal text-white">
                      {itemCount}
                    </span>
                  )}
                </div>
                <span className="font-dm-sans text-[9px] font-medium uppercase tracking-wide text-charcoal/40">
                  {label}
                </span>
              </button>
            );
          }

          return (
            <Link
              key={label}
              href={href}
              className="flex flex-col items-center justify-center gap-1 transition-colors"
            >
              <Icon size={20} className={isActive ? "text-charcoal" : "text-charcoal/40"} />
              <span className={`font-dm-sans text-[9px] font-medium uppercase tracking-wide
                ${isActive ? "text-charcoal" : "text-charcoal/40"}`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
