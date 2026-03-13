import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ImageGallery from "@/components/product/ImageGallery";
import AddToCart from "@/components/product/AddToCart";
import ProductTabs from "@/components/product/ProductTabs";
import ProductCard from "@/components/ui/ProductCard";
import { getProductBySlug, getRelatedProducts } from "@/data/products";
import { getLocalProductBySlug } from "@/data/collectionProducts";
import { fetchProduct } from "@/lib/api";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import type { Product } from "@/types";
import { Truck, Shield, RotateCcw, Star } from "lucide-react";

// Always server-render — never statically pre-build
export const dynamic = "force-dynamic";

interface ProductPageProps {
  params: { slug: string };
}

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=80";
const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1")
  .replace(/\/api\/v1\/?$/, "")
  .replace(/\/$/, "");

function backendToProduct(bp: import("@/lib/api").BackendProduct): Product {
  const images =
    bp.images && bp.images.length > 0
      ? bp.images.map((img) => (img.startsWith("/") ? `${API_BASE}${img}` : img))
      : [FALLBACK_IMAGE];
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
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [{ name: "Default", hex: "#888888" }],
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

            <AddToCart product={product} />

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
