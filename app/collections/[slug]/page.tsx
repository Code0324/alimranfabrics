import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
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

export default function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = params;

  if (!VALID_SLUGS.includes(slug)) {
    notFound();
  }

  const category = getCategoryBySlug(slug);
  const collectionProducts = getProductsForSlug(slug);
  const title = category?.name || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const description = category?.description || `Explore our ${title} collection`;

  return (
    <div className="pt-28 md:pt-32 min-h-screen bg-ivory">
      {/* Collection hero banner */}
      {category?.image && (
        <div className="relative h-48 md:h-64 overflow-hidden">
          <Image
            src={category.image}
            alt={title}
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-charcoal/60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1 className="font-playfair text-3xl md:text-5xl font-bold text-ivory mb-2">{title}</h1>
            <p className="font-inter text-ivory/70 text-sm">{description}</p>
          </div>
        </div>
      )}

      {!category?.image && (
        <div className="bg-emerald py-12 px-4 text-center">
          <h1 className="font-playfair text-3xl md:text-5xl font-bold text-ivory mb-2">{title}</h1>
          <p className="font-inter text-ivory/70 text-sm">{description}</p>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: "Collections" },
              { label: title },
            ]}
          />
        </div>

        <CollectionGrid allProducts={collectionProducts} />
      </div>
    </div>
  );
}
