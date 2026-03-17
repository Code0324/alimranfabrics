import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ImageGallery from "@/components/product/ImageGallery";
import AddToCart from "@/components/product/AddToCart";
import ProductTabs from "@/components/product/ProductTabs";
import ProductCard from "@/components/ui/ProductCard";
import { getProductBySlug, getRelatedProducts } from "@/data/products";
import {
  getLocalProductBySlug,
  mtjPrintedProducts,
  printedCategoryProducts,
  alkaramProducts,
  embroideredCategoryProducts,
} from "@/data/collectionProducts";
import { fetchProduct } from "@/lib/api";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import type { Product, ProductColor } from "@/types";
import { Truck, Shield, RotateCcw, Star } from "lucide-react";

// Always server-render — never statically pre-build
export const dynamic = "force-dynamic";

interface ProductPageProps {
  params: { slug: string };
}

const FALLBACK_IMAGE = "/image/categories/cat-embroidered.jpg";
const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1")
  .replace(/\/api\/v1\/?$/, "")
  .replace(/\/$/, "");

// ── Slug → actual fabric/dress colour ────────────────────────────────────────
const SLUG_COLORS: Record<string, ProductColor> = {
  // MTJ
  bluelight:          { name: "Blue",         hex: "#89B4CC" },
  bottlegreen:        { name: "Bottle Green", hex: "#1B5E3B" },
  greenblk:           { name: "Green",        hex: "#2E5B3C" },
  redbeg:             { name: "Red",          hex: "#C0392B" },
  beigeblc:           { name: "Beige",        hex: "#D4B483" },
  blkchunri:          { name: "Black",        hex: "#1A1A1A" },
  blkprinted:         { name: "Black",        hex: "#1A1A1A" },
  blkcircle:          { name: "Black",        hex: "#1A1A1A" },
  // Nishat printed
  blackprinted:       { name: "Black",        hex: "#1A1A1A" },
  bluegreenprinted:   { name: "Blue Green",   hex: "#2E8B57" },
  blueprinted:        { name: "Blue",         hex: "#4169E1" },
  greenyellowprinted: { name: "Green Yellow", hex: "#9ACD32" },
  maroonwhiteprinted: { name: "Maroon",       hex: "#800000" },
  pinkprinted:        { name: "Pink",         hex: "#E91E8C" },
  purpuleprinted:     { name: "Purple",       hex: "#7B1FA2" },
  redprinted:         { name: "Red",          hex: "#CC0000" },
  // Al-Karam
  "03offwhite":       { name: "Off White",    hex: "#F5F0E8" },
  "05black":          { name: "Black",        hex: "#1A1A1A" },
  "06offwhite":       { name: "Off White",    hex: "#F5F0E8" },
  "10brown":          { name: "Brown",        hex: "#8B4513" },
  "16musterd":        { name: "Mustard",      hex: "#D4A017" },
  "18musterd":        { name: "Mustard",      hex: "#C49A00" },
  "19cream":          { name: "Cream",        hex: "#FFFDD0" },
  "42white":          { name: "White",        hex: "#F8F8F8" },
  "43beige":          { name: "Beige",        hex: "#F5F5DC" },
  "52blue":           { name: "Blue",         hex: "#4169E1" },
  "54pink":           { name: "Pink",         hex: "#E91E8C" },
  "66olivegreen":     { name: "Olive Green",  hex: "#6B8E23" },
  "71pink":           { name: "Pink",         hex: "#FF69B4" },
  "73darkblue":       { name: "Dark Blue",    hex: "#00008B" },
  "102black":         { name: "Black",        hex: "#1A1A1A" },
  "162olivegreen":    { name: "Olive Green",  hex: "#556B2F" },
  green103:           { name: "Green",        hex: "#228B22" },
  "50green":          { name: "Green",        hex: "#2E7D32" },
  // Embroidered
  white:              { name: "White",        hex: "#F8F8F8" },
  black:              { name: "Black",        hex: "#1A1A1A" },
  yellow:             { name: "Yellow",       hex: "#FFD700" },
  green:              { name: "Green",        hex: "#228B22" },
  brown:              { name: "Brown",        hex: "#8B4513" },
  rust:               { name: "Rust",         hex: "#B7410E" },
  "sky-blue":         { name: "Sky Blue",     hex: "#87CEEB" },
  "off-white":        { name: "Off White",    hex: "#F5F0E8" },
  "light-maroon":     { name: "Light Maroon", hex: "#C0706A" },
  "light-grey":       { name: "Light Grey",   hex: "#D3D3D3" },
  "seagreen-applic":  { name: "Sea Green",    hex: "#2E8B57" },
  red:                { name: "Red",          hex: "#CC0000" },
  "green-and-white":  { name: "Green White",  hex: "#2E8B57" },
  "yellow-and-white": { name: "Yellow White", hex: "#FFD700" },
  "sea-green":        { name: "Sea Green",    hex: "#20B2AA" },
  peach:              { name: "Peach",        hex: "#FFCBA4" },
  "yellow-and-black": { name: "Yellow Black", hex: "#FFD700" },
  pink:               { name: "Pink",         hex: "#E91E8C" },
  lemon:              { name: "Lemon",        hex: "#FFF44F" },
  maroon:             { name: "Maroon",       hex: "#800000" },
  lilac:              { name: "Lilac",        hex: "#C8A2C8" },
  grey:               { name: "Grey",         hex: "#808080" },
  beige:              { name: "Beige",        hex: "#F5F5DC" },
  "rust-applic":      { name: "Rust",         hex: "#B7410E" },
  "rust-white":       { name: "Rust White",   hex: "#B7410E" },
  coal:               { name: "Coal",         hex: "#2C2C2C" },
};

function deriveColor(slug: string): ProductColor {
  return SLUG_COLORS[slug] ?? { name: "Default", hex: "#888888" };
}

// ── Variant lookup by product ID prefix ──────────────────────────────────────
export type ColorVariant = { slug: string; color: ProductColor };

function getColorVariants(productId: string): ColorVariant[] | null {
  let pool: import("@/lib/api").BackendProduct[] | null = null;
  if (productId.startsWith("mtj-"))  pool = mtjPrintedProducts;
  if (productId.startsWith("prt-"))  pool = printedCategoryProducts;
  if (productId.startsWith("ak-"))   pool = alkaramProducts;
  if (productId.startsWith("emb-"))  pool = embroideredCategoryProducts;
  if (!pool) return null;
  return pool.map((p) => ({ slug: p.slug, color: deriveColor(p.slug) }));
}

function backendToProduct(bp: import("@/lib/api").BackendProduct): Product {
  const images =
    bp.images && bp.images.length > 0
      ? bp.images.map((img) => {
          if (!img.startsWith("/")) return img;
          if (img.startsWith("/image/")) return img;
          return `${API_BASE}${img}`;
        })
      : [FALLBACK_IMAGE];
  const isUnstitched = bp.name.toLowerCase().includes("unstitched");
  return {
    id: bp.id,
    name: bp.name,
    slug: bp.slug,
    price: bp.price,
    originalPrice: bp.originalPrice ?? undefined,
    images,
    category: bp.category,
    categorySlug: bp.categorySlug,
    fabric: bp.fabric || "Premium",
    sizes: isUnstitched ? ["Unstitched"] : ["S", "M", "L", "XL", "XXL"],
    colors: [deriveColor(bp.slug)],
    description: bp.description,
    careInstructions: "Please handle with care.",
    isNew: bp.isNew,
    isBestSeller: bp.isBestSeller,
    sku: bp.id,
    collection: bp.brand,
  };
}

async function resolveProduct(slug: string): Promise<Product | null> {
  // 1. Try static data first (instant, no network)
  const staticProduct = getProductBySlug(slug);
  if (staticProduct) return staticProduct;

  // 2. Try local collection fallback products (no network)
  const localProduct = getLocalProductBySlug(slug);
  if (localProduct) return backendToProduct(localProduct);

  // 3. Fall back to backend API
  try {
    const bp = await fetchProduct(slug);
    return backendToProduct(bp);
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await resolveProduct(params.slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images[0] ? [{ url: product.images[0] }] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await resolveProduct(params.slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);
  const discount = product.originalPrice
    ? calculateDiscount(product.originalPrice, product.price)
    : 0;
  const colorVariants = getColorVariants(product.id);

  return (
    <div className="pt-28 md:pt-32 bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: "Collections", href: "/collections/women" },
              { label: product.category, href: `/collections/${product.categorySlug}` },
              { label: product.name },
            ]}
          />
        </div>

        {/* Product layout */}
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 mb-20">
          <ImageGallery images={product.images} productName={product.name} />

          <div className="sticky top-28 h-fit">
            {/* Badges */}
            <div className="flex gap-2 mb-3">
              {product.isNew && (
                <span className="bg-navy text-ivory text-[10px] font-inter font-semibold px-2 py-0.5 uppercase tracking-wide">
                  New
                </span>
              )}
              {product.isBestSeller && (
                <span className="bg-gold text-charcoal text-[10px] font-inter font-semibold px-2 py-0.5 uppercase tracking-wide">
                  Best Seller
                </span>
              )}
              {discount > 0 && (
                <span className="bg-red-600 text-white text-[10px] font-inter font-semibold px-2 py-0.5 uppercase tracking-wide">
                  Save {discount}%
                </span>
              )}
            </div>

            <p className="font-inter text-xs text-charcoal/50 uppercase tracking-wider mb-2">
              {product.fabric} • SKU: {product.sku}
            </p>

            <h1 className="font-playfair text-2xl md:text-3xl font-bold text-charcoal mb-3">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={14} className="text-gold fill-gold" />
                ))}
              </div>
              <span className="font-inter text-xs text-charcoal/50">(47 reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-ivory-dark">
              <span className="font-playfair text-3xl font-bold text-navy">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="font-inter text-lg text-charcoal/40 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {discount > 0 && (
                <span className="font-inter text-sm font-semibold text-red-600">
                  {discount}% OFF
                </span>
              )}
            </div>

            <AddToCart product={product} colorVariants={colorVariants ?? undefined} />

            <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-ivory-dark">
              {[
                { icon: Truck, text: "Worldwide Shipping" },
                { icon: Shield, text: "Secure Payment" },
                { icon: RotateCcw, text: "30-Day Returns" },
              ].map((badge) => (
                <div key={badge.text} className="flex flex-col items-center gap-1.5 text-center">
                  <badge.icon size={18} style={{ color: "#C9A84C" }} />
                  <span className="font-inter text-[10px] text-charcoal/50 uppercase tracking-wide">
                    {badge.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ProductTabs product={product} />

        {related.length > 0 && (
          <div className="mt-20">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-4 mb-3">
                <span className="w-12 h-px bg-gold" />
                <span className="font-inter text-gold text-xs uppercase tracking-[0.3em]">You May Also Love</span>
                <span className="w-12 h-px bg-gold" />
              </div>
              <h2 className="section-title">Related Products</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
