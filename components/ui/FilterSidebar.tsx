"use client";

import { useState } from "react";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { FilterState } from "@/types";

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

const availableSizes = ["XS", "S", "M", "L", "XL", "XXL", "Unstitched", "One Size"];
const availableColors = ["White", "Black", "Emerald", "Gold", "Pink", "Blue", "Red", "Maroon", "Beige"];
const availableFabrics = ["Lawn", "Khaddar", "Cotton", "Linen", "Jacquard", "Organza", "Silk", "Cambric"];

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-ivory-dark pb-5 mb-5 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full mb-3"
      >
        <span className="font-inter text-xs font-semibold text-charcoal uppercase tracking-wider">{title}</span>
        <ChevronDown size={14} className={`text-charcoal/50 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div>{children}</div>}
    </div>
  );
}

export default function FilterSidebar({ filters, onChange }: FilterSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSize = (size: string) => {
    const sizes = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size];
    onChange({ ...filters, sizes });
  };

  const toggleColor = (color: string) => {
    const colors = filters.colors.includes(color)
      ? filters.colors.filter((c) => c !== color)
      : [...filters.colors, color];
    onChange({ ...filters, colors });
  };

  const toggleFabric = (fabric: string) => {
    const fabricTypes = filters.fabricTypes.includes(fabric)
      ? filters.fabricTypes.filter((f) => f !== fabric)
      : [...filters.fabricTypes, fabric];
    onChange({ ...filters, fabricTypes });
  };

  const hasActiveFilters =
    filters.sizes.length > 0 || filters.colors.length > 0 || filters.fabricTypes.length > 0;

  const clearAll = () => onChange({ sizes: [], colors: [], priceRange: [0, 1000], fabricTypes: [] });

  const activeCount = filters.sizes.length + filters.colors.length + filters.fabricTypes.length;

  const PanelContent = () => (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} style={{ color: "#C9A84C" }} />
          <span className="font-playfair font-semibold text-charcoal">Filters</span>
          {hasActiveFilters && (
            <span className="w-5 h-5 bg-navy text-ivory text-[10px] flex items-center justify-center rounded-full font-bold">
              {activeCount}
            </span>
          )}
        </div>
        {hasActiveFilters && (
          <button onClick={clearAll} className="font-inter text-xs text-charcoal/50 hover:text-red-500 transition-colors">
            Clear all
          </button>
        )}
      </div>

      {/* Size */}
      <FilterSection title="Size">
        <div className="flex flex-wrap gap-1.5">
          {availableSizes.map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={`px-3 py-1.5 font-inter text-xs border transition-all ${
                filters.sizes.includes(size)
                  ? "bg-navy border-navy text-ivory"
                  : "border-charcoal/20 text-charcoal hover:border-gold"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Color */}
      <FilterSection title="Color">
        <div className="flex flex-wrap gap-2">
          {availableColors.map((color) => (
            <button
              key={color}
              onClick={() => toggleColor(color)}
              className={`px-3 py-1.5 font-inter text-xs border transition-all ${
                filters.colors.includes(color)
                  ? "bg-navy border-navy text-ivory"
                  : "border-charcoal/20 text-charcoal hover:border-gold"
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range (USD)">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="font-inter text-[10px] text-charcoal/50 uppercase block mb-1">Min</label>
            <input
              type="number"
              value={filters.priceRange[0]}
              onChange={(e) => onChange({ ...filters, priceRange: [Number(e.target.value), filters.priceRange[1]] })}
              className="w-full border border-charcoal/20 px-3 py-2 font-inter text-sm focus:outline-none focus:border-gold"
              min={0}
              max={filters.priceRange[1]}
            />
          </div>
          <span className="text-charcoal/30 mt-5">—</span>
          <div className="flex-1">
            <label className="font-inter text-[10px] text-charcoal/50 uppercase block mb-1">Max</label>
            <input
              type="number"
              value={filters.priceRange[1]}
              onChange={(e) => onChange({ ...filters, priceRange: [filters.priceRange[0], Number(e.target.value)] })}
              className="w-full border border-charcoal/20 px-3 py-2 font-inter text-sm focus:outline-none focus:border-gold"
              min={filters.priceRange[0]}
            />
          </div>
        </div>
      </FilterSection>

      {/* Fabric */}
      <FilterSection title="Fabric Type">
        <div className="space-y-2">
          {availableFabrics.map((fabric) => (
            <label key={fabric} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.fabricTypes.includes(fabric)}
                onChange={() => toggleFabric(fabric)}
                className="w-3.5 h-3.5 accent-gold"
              />
              <span className="font-inter text-sm text-charcoal group-hover:text-gold transition-colors">
                {fabric}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>
    </div>
  );

  return (
    <>
      {/* ── Desktop sidebar (md and above only) ── */}
      <aside className="hidden md:block w-60 flex-shrink-0">
        <div className="bg-white shadow-card sticky top-28">
          <PanelContent />
        </div>
      </aside>

      {/* ── Mobile: trigger button (below md only) ── */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden inline-flex items-center gap-2 border border-charcoal/20 px-4 py-2.5 font-inter text-sm text-charcoal hover:border-gold transition-colors"
      >
        <SlidersHorizontal size={16} />
        Filters
        {hasActiveFilters && (
          <span className="w-5 h-5 bg-navy text-ivory text-[10px] flex items-center justify-center rounded-full font-bold">
            {activeCount}
          </span>
        )}
      </button>

      {/* ── Mobile drawer (fixed, below md only) ── */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-charcoal/40 z-40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 bg-white z-50 rounded-t-2xl max-h-[85vh] overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between p-4 border-b border-ivory-dark">
              <span className="font-playfair font-semibold text-charcoal">Filters</span>
              <button onClick={() => setMobileOpen(false)} className="p-1">
                <X size={18} />
              </button>
            </div>
            <PanelContent />
            <div className="p-4 border-t border-ivory-dark">
              <button onClick={() => setMobileOpen(false)} className="btn-primary w-full">
                Apply Filters
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
