import type { Metadata } from "next";
import { fetchProducts } from "@/lib/api";
import CollectionGridApi from "@/components/collection/CollectionGridApi";
import Breadcrumb from "@/components/ui/Breadcrumb";

export const dynamic = "force-dynamic";

interface SearchPageProps {
  searchParams: { q?: string };
}

export function generateMetadata({ searchParams }: SearchPageProps): Metadata {
  const q = searchParams.q ?? "";
  return {
    title: q ? `Search results for "${q}" — Al Imran Fabrics` : "Search — Al Imran Fabrics",
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const q = (searchParams.q ?? "").trim().toLowerCase();

  let results: import("@/lib/api").BackendProduct[] = [];

  if (q) {
    try {
      const all = await fetchProducts({ limit: 100 });
      results = all.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
      );
    } catch {
      results = [];
    }
  }

  return (
    <div className="min-h-screen bg-ivory pt-28 md:pt-32">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: "Search" }]} />

        <div className="mt-6 mb-8">
          {q ? (
            <>
              <p className="font-inter text-xs uppercase tracking-[0.3em] font-bold mb-1" style={{ color: "#CC0000" }}>
                Search Results
              </p>
              <h1 className="font-playfair text-3xl font-bold text-charcoal">
                &ldquo;{searchParams.q}&rdquo;
              </h1>
            </>
          ) : (
            <h1 className="font-playfair text-3xl font-bold text-charcoal">Search</h1>
          )}
        </div>

        {!q ? (
          <div className="text-center py-20">
            <p className="font-inter text-charcoal/50">Enter a search term to find products.</p>
          </div>
        ) : (
          <CollectionGridApi allProducts={results} />
        )}
      </div>
    </div>
  );
}
