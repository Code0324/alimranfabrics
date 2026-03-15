import Link from "next/link";
import { embroideredCategoryProducts, printedCategoryProducts, mtjPrintedProducts, alkaramProducts } from "@/data/collectionProducts";
import ProductCardApi from "@/components/ui/ProductCardApi";

// Real-image products: Nishat printed + MTJ + Al-Karam + first 8 embroidered
const PRODUCTS_WITH_IMAGES = [
  ...printedCategoryProducts,
  ...mtjPrintedProducts,
  ...alkaramProducts,
  ...embroideredCategoryProducts.slice(0, 8),
];

export default function NewArrivals() {
  return (
    <section className="py-16 md:py-24 px-4 bg-ivory">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-3">
            <span className="w-12 h-px" style={{ backgroundColor: "#CC0000" }} />
            <span className="font-inter text-xs uppercase tracking-[0.3em] font-bold" style={{ color: "#CC0000" }}>Just In</span>
            <span className="w-12 h-px" style={{ backgroundColor: "#CC0000" }} />
          </div>
          <h2 className="section-title mb-3 bg-transparent">New Arrivals</h2>
          <p className="font-inter text-charcoal/60 max-w-md mx-auto text-sm">
            Fresh printed unstitched & embroidered 2-piece collections — tradition meets contemporary style.
          </p>
        </div>

        {/* Product grid — 2 cols mobile, 4 cols desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {PRODUCTS_WITH_IMAGES.map((product) => (
            <ProductCardApi key={product.id} product={product} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link href="/collections/new-arrivals" className="btn-outline">
            View All New Arrivals
          </Link>
        </div>
      </div>
    </section>
  );
}
