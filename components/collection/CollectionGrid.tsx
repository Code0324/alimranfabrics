"use client";

import { useState, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import FilterSidebar from "@/components/ui/FilterSidebar";
import { Product, FilterState, SortOption } from "@/types";

interface CollectionGridProps {
  allProducts: Product[];
}

export default function CollectionGrid({ allProducts }: CollectionGridProps) {
  const [sort, setSort] = useState<SortOption>("newest");
  const [filters, setFilters] = useState<FilterState>({
    sizes: [],
    colors: [],
    priceRange: [0, 1000],
    fabricTypes: [],
  });

  const filtered = useMemo(() => {
    let result = [...allProducts];

    if (filters.sizes.length > 0) {
      result = result.filter((p) => p.sizes.some((s) => filters.sizes.includes(s)));
    }
    if (filters.colors.length > 0) {
      result = result.filter((p) => p.colors.some((c) => filters.colors.includes(c.name)));
    }
    if (filters.fabricTypes.length > 0) {
      result = result.filter((p) => filters.fabricTypes.includes(p.fabric));
    }
    result = result.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    switch (sort) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "best-selling":
        result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
      default:
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  }, [allProducts, filters, sort]);

  const displayProducts = filtered.length > 0 ? filtered : allProducts;

  return (
    <div className="flex flex-col md:flex-row gap-8">

      {/* ── Desktop sidebar — rendered once, hidden on mobile via CSS inside FilterSidebar ── */}
      <FilterSidebar filters={filters} onChange={setFilters} />

      {/* ── Main content ── */}
      <div className="flex-1 min-w-0">

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            {/* Mobile filter trigger lives inside FilterSidebar (md:hidden) — no duplicate here */}
            <div className="flex items-center gap-2">
              <span
                className="font-inter font-bold text-sm px-3 py-1 rounded-sm"
                style={{ backgroundColor: "#CC0000", color: "#ffffff" }}
              >
                {displayProducts.length}
              </span>
              <span className="font-inter text-xs font-medium" style={{ color: "#0C1350" }}>
                Product{displayProducts.length !== 1 ? "s" : ""} Found
              </span>
            </div>
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2">
            <span className="font-inter text-xs text-charcoal/50 hidden sm:inline">Sort by:</span>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="appearance-none border border-charcoal/20 bg-white pl-3 pr-8 py-2 font-inter text-sm
                           focus:outline-none focus:border-gold transition-colors cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="best-selling">Best Selling</option>
              </select>
              <ChevronDown
                size={14}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-charcoal/50 pointer-events-none"
              />
            </div>
          </div>
        </div>

        {displayProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-playfair text-xl text-charcoal/50">No products match your filters.</p>
            <button
              onClick={() => setFilters({ sizes: [], colors: [], priceRange: [0, 1000], fabricTypes: [] })}
              className="btn-outline mt-4"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {displayProducts.length > 9 && (
          <div className="flex justify-center gap-2 mt-12">
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className="w-10 h-10 font-inter text-sm font-medium border transition-colors"
                style={
                  page === 1
                    ? { backgroundColor: "#CC0000", borderColor: "#CC0000", color: "#ffffff" }
                    : { borderColor: "rgba(44,44,44,0.2)", color: "#2C2C2C" }
                }
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
