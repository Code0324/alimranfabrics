"use client";

import Link from "next/link";
import { Home, Search, ShoppingBag, User } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", href: "/", Icon: Home },
  { label: "Search", href: "/collections/women", Icon: Search },
  { label: "Cart", href: "#cart", Icon: ShoppingBag, isCart: true },
  { label: "Account", href: "/about", Icon: User },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const itemCount = useCartStore((s) => s.getItemCount());
  const openCart = useCartStore((s) => s.openCart);

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t"
      style={{ backgroundColor: "#ffffff", borderColor: "#e5e7eb" }}
      aria-label="Mobile navigation"
    >
      <div className="grid grid-cols-4 h-16">
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
                  <ShoppingBag
                    size={22}
                    style={{ color: "#CC0000" }}
                  />
                  {itemCount > 0 && (
                    <span
                      className="absolute -top-1.5 -right-1.5 text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
                      style={{ backgroundColor: "#CC0000", color: "#ffffff" }}
                    >
                      {itemCount}
                    </span>
                  )}
                </div>
                <span
                  className="font-inter text-[10px] font-semibold uppercase tracking-wide"
                  style={{ color: "#CC0000" }}
                >
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
              <Icon
                size={22}
                style={{ color: isActive ? "#CC0000" : "#6b7280" }}
              />
              <span
                className="font-inter text-[10px] font-semibold uppercase tracking-wide"
                style={{ color: isActive ? "#CC0000" : "#6b7280" }}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
