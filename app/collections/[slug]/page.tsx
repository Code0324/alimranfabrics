import type { Metadata } from "next";
import Breadcrumb from "@/components/ui/Breadcrumb";
import PageHero from "@/components/ui/PageHero";
import CollectionGridApi from "@/components/collection/CollectionGridApi";
import { fetchProducts, fetchCategories } from "@/lib/api";
import { getLocalProducts } from "@/data/collectionProducts";

interface CollectionPageProps {
  params: { slug: string };
}

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  try {
    const cats = await fetchCategories();
    return cats.map((c) => ({ slug: c.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const title = params.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title,
    description: `Explore Al Imran Fabrics ${title} collection`,
  };
}

function getEyebrow(slug: string): string {
  if (slug === "sale") return "Limited Time";
  if (slug === "new-arrivals") return "Just In";
  if (slug === "women") return "Women's Collection";
  if (slug === "men") return "Men's Collection";
  if (slug === "kids") return "Kids' Collection";
  return "Al Imran Fabrics";
}

function getBgImage(slug: string): string {
  const map: Record<string, string> = {
    "women":          "/image/women-banner-new.webp",
    "men":            "/image/men-banner-new.png",
    "kids":           "/image/categories/cat-stitched.jpg",
    "embroidered":    "/image/categories/cat-embroidered.jpg",
    "printed":        "/image/categories/cat-printed.jpg",
    "stitched":       "/image/categories/cat-stitched.jpg",
    "unstitched":     "/image/categories/cat-unstitched.jpg",
    "lawn":           "/image/categories/cat-lawn.jpg",
    "khaddar":        "/image/categories/cat-winter.jpg",
    "formal":         "/image/categories/cat-luxury.jpg",
    "luxury":         "/image/categories/cat-luxury.jpg",
    "bridal":         "/image/categories/cat-bridal.jpg",
    "new-arrivals":   "/image/women-banner-silk.png",
    "sale":           "/image/women-banner-silk.png",
    "men-formal":     "/image/categories/cat-men-formal.jpg",
    "shalwar-kameez": "/image/categories/cat-men-stitched.jpg",
    "sherwani":       "/image/categories/cat-men-formal.jpg",
    "waistcoat":      "/image/categories/cat-men-stitched.jpg",
    "ready-to-wear":  "/image/categories/cat-stitched.jpg",
    // brand slugs
    "mtj":            "/image/categories/cat-men-formal.jpg",
    "bin-saeed":      "/image/categories/cat-unstitched.jpg",
    "khaadi":         "/image/women-banner-new.webp",
    "salina":         "/image/categories/cat-lawn.jpg",
    "nishat":         "/image/categories/cat-embroidered.jpg",
    "j-junaid":       "/image/categories/cat-men-stitched.jpg",
    "sapphire":       "/image/women-banner-silk.png",
    "tawakkal":       "/image/categories/cat-luxury.jpg",
    "jacquard":       "/image/categories/cat-luxury.jpg",
    "casual":         "/image/categories/cat-printed.jpg",
    "girls":          "/image/categories/cat-stitched.jpg",
    "boys":           "/image/categories/cat-men-kurta.jpg",
    "cotton":         "/image/categories/cat-unstitched.jpg",
    "chickenkar":     "/image/categories/chickenkar.jpg",
    "chiffon":        "/image/categories/chiffon.jpg",
  };
  return map[slug] ?? "/image/women-banner-silk.png";
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = params;
  const title = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const eyebrow = getEyebrow(slug);

  // Fetch products from backend
  let collectionProducts: import("@/lib/api").BackendProduct[] = [];
  try {
    if (slug === "new-arrivals") {
      collectionProducts = await fetchProducts({ new_arrival: true, limit: 50 });
    } else if (slug === "sale") {
      // sale = products with discount
      collectionProducts = await fetchProducts({ limit: 50 });
      collectionProducts = collectionProducts.filter((p) => p.discountPercentage > 0 || p.originalPrice);
    } else {
      collectionProducts = await fetchProducts({ category_slug: slug, limit: 50 });
    }

    // Fall back to local catalogue when the backend has nothing for this slug
    if (collectionProducts.length === 0) {
      collectionProducts = getLocalProducts(slug);
    }
    // Last resort: all backend products
    if (collectionProducts.length === 0) {
      collectionProducts = await fetchProducts({ limit: 50 });
    }
  } catch {
    collectionProducts = getLocalProducts(slug);
  }

  const description = `Explore our ${title} collection — ${collectionProducts.length} products`;

  return (
    <div className="min-h-screen bg-ivory">
      <PageHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        backgroundImage={getBgImage(slug)}
        breadcrumbItems={[
          { label: "Collections", href: "/collections" },
          { label: title },
        ]}
      />

      {/* ── Product count strip ── */}
      <div className="border-b border-ivory-dark bg-white">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Breadcrumb
            items={[
              { label: "Collections" },
              { label: title },
            ]}
          />
          <span className="font-inter text-xs text-charcoal/40 uppercase tracking-wide hidden sm:block">
            {collectionProducts.length} items
          </span>
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <CollectionGridApi allProducts={collectionProducts} />
      </div>
    </div>
  );
}
