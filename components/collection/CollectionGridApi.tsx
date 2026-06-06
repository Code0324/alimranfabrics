"use client";

import { useState, useMemo } from "react";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import ProductCardApi from "@/components/ui/ProductCardApi";
import { BackendProduct } from "@/lib/api";

interface CollectionGridApiProps {
  allProducts: BackendProduct[];
}

type SortOption = "newest" | "oldest" | "price-low" | "price-high" | "best-selling" | "a-z" | "z-a";

export default function CollectionGridApi({ allProducts }: CollectionGridApiProps) {
  const [sort,          setSort]          = useState<SortOption>("newest");
  const [filterOpen,   setFilterOpen]    = useState(false);
  const [maxPrice,     setMaxPrice]      = useState<number | null>(null);
  const [fabrics,      setFabrics]       = useState<string[]>([]);

  /* derive unique fabric types for filter panel */
  const allFabrics = useMemo(() => {
    const set = new Set<string>();
    allProducts.forEach((p) => { if (p.fabric) set.add(p.fabric); });
    return Array.from(set).sort();
  }, [allProducts]);

  const toggleFabric = (f: string) =>
    setFabrics((prev) => prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]);

  const sorted = useMemo(() => {
    let result = [...allProducts];
    if (fabrics.length > 0)
      result = result.filter((p) => p.fabric && fabrics.includes(p.fabric));
    if (maxPrice !== null)
      result = result.filter((p) => p.price <= maxPrice);
    switch (sort) {
      case "price-low":    return result.sort((a, b) => a.price - b.price);
      case "price-high":   return result.sort((a, b) => b.price - a.price);
      case "best-selling": return result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
      case "a-z":          return result.sort((a, b) => a.name.localeCompare(b.name));
      case "z-a":          return result.sort((a, b) => b.name.localeCompare(a.name));
      case "oldest":       return result.sort((a, b) => (a.isNew ? 1 : 0) - (b.isNew ? 1 : 0));
      default:             return result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }
  }, [allProducts, sort, fabrics, maxPrice]);

  const activeFilters = fabrics.length + (maxPrice !== null ? 1 : 0);

  return (
    <div>
      {/* ── Toolbar ── */}
      <div className="flex items-center justify-between py-4 border-b border-[#E8E4DE] mb-6">
        <div className="flex items-center gap-4">
          {/* Filter button */}
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 font-dm-sans text-[12px] uppercase tracking-[0.12em]
                       text-charcoal border border-[#E8E4DE] px-4 py-2 hover:border-charcoal transition-colors"
          >
            <SlidersHorizontal size={13} strokeWidth={1.5} />
            Filter
            {activeFilters > 0 && (
              <span className="bg-charcoal text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {activeFilters}
              </span>
            )}
          </button>

          {/* Product count */}
          <span className="font-dm-sans text-[12px] text-charcoal/45">
            {sorted.length} product{sorted.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-2">
          <span className="font-dm-sans text-[11px] text-charcoal/40 hidden sm:inline uppercase tracking-[0.1em]">
            Sort by
          </span>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="appearance-none bg-transparent border-0 border-b border-[#E8E4DE]
                         font-dm-sans text-[12px] text-charcoal pl-1 pr-6 py-1.5
                         focus:outline-none focus:border-charcoal cursor-pointer"
            >
              <option value="newest">Date, new to old</option>
              <option value="oldest">Date, old to new</option>
              <option value="best-selling">Best Selling</option>
              <option value="a-z">Alphabetically A–Z</option>
              <option value="z-a">Alphabetically Z–A</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <ChevronDown size={12} className="absolute right-0 top-1/2 -translate-y-1/2 text-charcoal/50 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        {/* ── Filter sidebar ── */}
        {filterOpen && (
          <aside className="w-56 flex-shrink-0 animate-fade-in">
            <div className="flex items-center justify-between mb-5">
              <span className="font-dm-sans text-[11px] uppercase tracking-[0.15em] text-charcoal font-medium">
                Filters
              </span>
              <button
                onClick={() => setFilterOpen(false)}
                className="text-charcoal/40 hover:text-charcoal transition-colors"
              >
                <X size={14} />
              </button>
            </div>

            {/* Fabric filter */}
            {allFabrics.length > 0 && (
              <div className="mb-6">
                <p className="font-dm-sans text-[11px] uppercase tracking-[0.12em] text-charcoal/55 mb-3">
                  Fabric
                </p>
                <div className="space-y-2">
                  {allFabrics.map((f) => (
                    <label key={f} className="flex items-center gap-2.5 cursor-pointer group">
                      <div
                        onClick={() => toggleFabric(f)}
                        className={`w-3.5 h-3.5 border flex-shrink-0 flex items-center justify-center cursor-pointer transition-colors
                          ${fabrics.includes(f) ? "bg-charcoal border-charcoal" : "border-[#E8E4DE] group-hover:border-charcoal"}`}
                      >
                        {fabrics.includes(f) && (
                          <svg viewBox="0 0 10 8" width="8" height="8" fill="none" stroke="white" strokeWidth="1.5">
                            <polyline points="1,4 4,7 9,1" />
                          </svg>
                        )}
                      </div>
                      <span
                        className="font-dm-sans text-[12px] text-charcoal/65 cursor-pointer"
                        onClick={() => toggleFabric(f)}
                      >
                        {f}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Max price filter */}
            <div className="mb-6">
              <p className="font-dm-sans text-[11px] uppercase tracking-[0.12em] text-charcoal/55 mb-3">
                Max Price
              </p>
              <div className="space-y-2">
                {[2000, 5000, 10000, 20000].map((p) => (
                  <label key={p} className="flex items-center gap-2.5 cursor-pointer group">
                    <div
                      onClick={() => setMaxPrice(maxPrice === p ? null : p)}
                      className={`w-3.5 h-3.5 border flex-shrink-0 flex items-center justify-center cursor-pointer transition-colors
                        ${maxPrice === p ? "bg-charcoal border-charcoal" : "border-[#E8E4DE] group-hover:border-charcoal"}`}
                    >
                      {maxPrice === p && (
                        <svg viewBox="0 0 10 8" width="8" height="8" fill="none" stroke="white" strokeWidth="1.5">
                          <polyline points="1,4 4,7 9,1" />
                        </svg>
                      )}
                    </div>
                    <span
                      className="font-dm-sans text-[12px] text-charcoal/65 cursor-pointer"
                      onClick={() => setMaxPrice(maxPrice === p ? null : p)}
                    >
                      Under PKR {p.toLocaleString()}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Clear filters */}
            {activeFilters > 0 && (
              <button
                onClick={() => { setFabrics([]); setMaxPrice(null); }}
                className="font-dm-sans text-[11px] uppercase tracking-[0.1em] text-charcoal/50
                           hover:text-charcoal underline underline-offset-4 transition-colors"
              >
                Clear All
              </button>
            )}
          </aside>
        )}

        {/* ── Product grid ── */}
        <div className="flex-1 min-w-0">
          {sorted.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-cormorant text-2xl text-charcoal/40 mb-2">No products found</p>
              <p className="font-dm-sans text-[13px] text-charcoal/40">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#E8E4DE]">
              {sorted.map((product) => (
                <div key={product.id} className="bg-cream">
                  <ProductCardApi product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
