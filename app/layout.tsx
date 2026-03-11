import type { Metadata } from "next";
import "./globals.css";
import { WishlistProvider } from "@/store/wishlistContext";
import PromoBanner from "@/components/layout/PromoBanner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

export const metadata: Metadata = {
  title: {
    default: "Al Imran Fabrics — Timeless Elegance, Global Reach",
    template: "%s | Al Imran Fabrics",
  },
  description:
    "Premium Pakistani clothing brand offering Men's, Women's, and Kids' apparel. Exquisite embroidery, fine fabrics, and free shipping to USA.",
  keywords: ["Pakistani clothing", "shalwar kameez", "embroidered suits", "lawn collection", "Al Imran Fabrics"],
  openGraph: {
    siteName: "Al Imran Fabrics",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Inter:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Tenor+Sans&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-ivory text-charcoal font-inter antialiased pb-16 md:pb-0">
        <WishlistProvider>
          <PromoBanner />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          <MobileBottomNav />
          <WhatsAppFloat />
        </WishlistProvider>
      </body>
    </html>
  );
}
