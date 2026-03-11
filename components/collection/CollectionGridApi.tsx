"use client";

import { useState, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import ProductCardApi from "@/components/ui/ProductCardApi";
import { BackendProduct } from "@/lib/api";

interface CollectionGridApiProps {
  allProducts: BackendProduct[];
}

type SortOption = "newest" | "price-low" | "price-high" | "best-selling";

export default function CollectionGridApi({ allProducts }: CollectionGridApiProps) {
  const [sort, setSort] = useState<SortOption>("newest");

  const sorted = useMemo(() => {
    const result = [...allProducts];
    switch (sort) {
      case "price-low":  return result.sort((a, b) => a.price - b.price);
      case "price-high": return result.sort((a, b) => b.price - a.price);
      case "best-selling": return result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
      default: return result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }
  }, [allProducts, sort]);

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span
            className="font-inter font-bold text-sm px-3 py-1 rounded-sm"
            style={{ backgroundColor: "#CC0000", color: "#ffffff" }}
          >
            {sorted.length}
          </span>
          <span className="font-inter text-xs font-medium" style={{ color: "#0C1350" }}>
            Product{sorted.length !== 1 ? "s" : ""} Found
          </span>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="font-inter text-xs text-charcoal/50 hidden sm:inline">Sort by:</span>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="appearance-none border border-charcoal/20 bg-white pl-3 pr-8 py-2 font-inter text-sm
                         focus:outline-none focus:border-[#CC0000] transition-colors cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="best-selling">Best Selling</option>
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-charcoal/50 pointer-events-none" />
          </div>
        </div>
      </div>

      {sorted.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-playfair text-xl text-charcoal/50">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {sorted.map((product) => (
            <ProductCardApi key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
