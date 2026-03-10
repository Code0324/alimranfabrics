import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CollectionGrid from "@/components/collection/CollectionGrid";
import { products } from "@/data/products";
import { categories, getCategoryBySlug } from "@/data/categories";

interface CollectionPageProps {
  params: { slug: string };
}

const VALID_SLUGS = [
  ...categories.map((c) => c.slug),
  "new-arrivals", "sale", "women", "men", "kids",
  "formal", "casual", "unstitched", "khaddar", "embroidered",
  "lawn", "cotton", "sherwani", "waistcoat", "girls", "boys",
  "jacquard", "printed", "solid", "ready-to-wear", "bridal",
  "shalwar-kameez",
];

export async function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = params;
  const category = getCategoryBySlug(slug);
  const title = category?.name || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title,
    description: category?.description || `Explore Al Imran Fabrics ${title} collection`,
  };
}

function getProductsForSlug(slug: string) {
  if (slug === "new-arrivals") return products.filter((p) => p.isNew);
  if (slug === "sale") return products.filter((p) => p.originalPrice);
  const byCategory = products.filter((p) => p.categorySlug === slug);
  if (byCategory.length > 0) return byCategory;
  const byCollection = products.filter(
    (p) => p.collection?.toLowerCase().replace(/\s+/g, "-") === slug
  );
  if (byCollection.length > 0) return byCollection;
  const byFabric = products.filter(
    (p) => p.fabric.toLowerCase() === slug
  );
  if (byFabric.length > 0) return byFabric;
  return products;
}

// Eyebrow label for special slugs
function getEyebrow(slug: string): string {
  if (slug === "sale") return "Limited Time";
  if (slug === "new-arrivals") return "Just In";
  if (slug === "women") return "Women's Collection";
  if (slug === "men") return "Men's Collection";
  if (slug === "kids") return "Kids' Collection";
  return "Al Imran Fabrics";
}

export default function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = params;

  if (!VALID_SLUGS.includes(slug)) {
    notFound();
  }

  const category = getCategoryBySlug(slug);
  const collectionProducts = getProductsForSlug(slug);
  const title = category?.name || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const description = category?.description || `Explore our ${title} collection`;
  const eyebrow = getEyebrow(slug);

  return (
    <div className="min-h-screen bg-ivory">
      {/* ── Yellow branded header — same for all collections ── */}
      <section
        className="relative overflow-hidden pt-28 md:pt-32"
        style={{ background: "linear-gradient(135deg, #C9A84C 0%, #D9BC74 50%, #A8882E 100%)" }}
      >
        {/* Subtle linen texture overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
            backgroundSize: "6px 6px",
          }}
          aria-hidden
        />
        {/* Art-deco corner brackets */}
        <span className="pointer-events-none absolute top-5 left-5 w-8 h-8 md:w-10 md:h-10" style={{ borderTop: "1.5px solid rgba(255,255,255,0.5)", borderLeft: "1.5px solid rgba(255,255,255,0.5)" }} aria-hidden />
        <span className="pointer-events-none absolute top-5 right-5 w-8 h-8 md:w-10 md:h-10" style={{ borderTop: "1.5px solid rgba(255,255,255,0.5)", borderRight: "1.5px solid rgba(255,255,255,0.5)" }} aria-hidden />
        <span className="pointer-events-none absolute bottom-5 left-5 w-8 h-8 md:w-10 md:h-10" style={{ borderBottom: "1.5px solid rgba(255,255,255,0.5)", borderLeft: "1.5px solid rgba(255,255,255,0.5)" }} aria-hidden />
        <span className="pointer-events-none absolute bottom-5 right-5 w-8 h-8 md:w-10 md:h-10" style={{ borderBottom: "1.5px solid rgba(255,255,255,0.5)", borderRight: "1.5px solid rgba(255,255,255,0.5)" }} aria-hidden />

        <div className="relative py-12 md:py-16 px-4 text-center">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-4 mb-3">
            <span className="w-10 h-px" style={{ backgroundColor: "rgba(255,255,255,0.5)" }} />
            <span className="font-inter text-[10px] uppercase tracking-[0.35em]" style={{ color: "rgba(255,255,255,0.85)" }}>
              {eyebrow}
            </span>
            <span className="w-10 h-px" style={{ backgroundColor: "rgba(255,255,255,0.5)" }} />
          </div>

          {/* Title */}
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-2" style={{ color: "#070D38" }}>
            {title}
          </h1>

          {/* Thin white divider */}
          <div className="mx-auto my-3 w-14" style={{ height: "1.5px", backgroundColor: "rgba(255,255,255,0.6)" }} />

          {/* Description */}
          <p className="font-inter text-sm max-w-md mx-auto" style={{ color: "rgba(7,13,56,0.75)" }}>
            {description}
          </p>
        </div>
      </section>

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
        <CollectionGrid allProducts={collectionProducts} />
      </div>
    </div>
  );
}
