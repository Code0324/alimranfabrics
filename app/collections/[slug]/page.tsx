import type { Metadata } from "next";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CollectionGridApi from "@/components/collection/CollectionGridApi";
import { fetchProducts, fetchCategories } from "@/lib/api";

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
      if (collectionProducts.length === 0) {
        collectionProducts = await fetchProducts({ limit: 50 });
      }
    }
  } catch {
    collectionProducts = [];
  }

  const description = `Explore our ${title} collection — ${collectionProducts.length} products`;

  return (
    <div className="min-h-screen bg-ivory">
      {/* ── Yellow branded header — same for all collections ── */}
      <section
        className="relative overflow-hidden pt-28 md:pt-32"
        style={{ background: "#CC0000" }}
      >
        {/* Subtle dot texture */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
          aria-hidden
        />
        {/* Corner brackets in yellow */}
        <span className="pointer-events-none absolute top-5 left-5 w-8 h-8 md:w-10 md:h-10" style={{ borderTop: "2px solid rgba(255,253,130,0.6)", borderLeft: "2px solid rgba(255,253,130,0.6)" }} aria-hidden />
        <span className="pointer-events-none absolute top-5 right-5 w-8 h-8 md:w-10 md:h-10" style={{ borderTop: "2px solid rgba(255,253,130,0.6)", borderRight: "2px solid rgba(255,253,130,0.6)" }} aria-hidden />
        <span className="pointer-events-none absolute bottom-5 left-5 w-8 h-8 md:w-10 md:h-10" style={{ borderBottom: "2px solid rgba(255,253,130,0.6)", borderLeft: "2px solid rgba(255,253,130,0.6)" }} aria-hidden />
        <span className="pointer-events-none absolute bottom-5 right-5 w-8 h-8 md:w-10 md:h-10" style={{ borderBottom: "2px solid rgba(255,253,130,0.6)", borderRight: "2px solid rgba(255,253,130,0.6)" }} aria-hidden />

        <div className="relative py-12 md:py-16 px-4 text-center">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-4 mb-3">
            <span className="w-10 h-px" style={{ backgroundColor: "#FFFD82" }} />
            <span className="font-inter text-[10px] uppercase tracking-[0.35em] font-bold" style={{ color: "#FFFD82" }}>
              {eyebrow}
            </span>
            <span className="w-10 h-px" style={{ backgroundColor: "#FFFD82" }} />
          </div>

          {/* Title */}
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-2" style={{ color: "#FFFD82" }}>
            {title}
          </h1>

          {/* Divider */}
          <div className="mx-auto my-3 w-14" style={{ height: "2px", backgroundColor: "rgba(255,253,130,0.5)" }} />

          {/* Description */}
          <p className="font-inter text-sm max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.9)" }}>
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
        <CollectionGridApi allProducts={collectionProducts} />
      </div>
    </div>
  );
}
