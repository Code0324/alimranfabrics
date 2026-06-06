import Link from "next/link";
import { embroideredCategoryProducts, printedCategoryProducts, mtjPrintedProducts, alkaramProducts } from "@/data/collectionProducts";
import ProductCardApi from "@/components/ui/ProductCardApi";

const PRODUCTS_WITH_IMAGES = [
  ...printedCategoryProducts,
  ...mtjPrintedProducts,
  ...alkaramProducts,
  ...embroideredCategoryProducts.slice(0, 8),
];

export default function NewArrivals() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* ── Section header ── */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="section-label mb-2">Just In</p>
            <h2 className="font-cormorant text-3xl md:text-4xl font-semibold text-charcoal">
              New Arrivals
            </h2>
          </div>
          <Link
            href="/collections/new-arrivals"
            className="hidden md:inline font-dm-sans text-xs uppercase tracking-[0.1em]
                       text-charcoal/50 hover:text-charcoal underline-offset-4 hover:underline transition-colors"
          >
            View All
          </Link>
        </div>

        {/* ── Product grid — 2 cols mobile / 4 cols desktop ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {PRODUCTS_WITH_IMAGES.map((product) => (
            <ProductCardApi key={product.id} product={product} />
          ))}
        </div>

        {/* ── Mobile view-all CTA ── */}
        <div className="text-center mt-10 md:hidden">
          <Link href="/collections/new-arrivals" className="btn-outline">
            View All New Arrivals
          </Link>
        </div>

        {/* ── Desktop centered CTA ── */}
        <div className="hidden md:flex justify-center mt-12">
          <Link href="/collections/new-arrivals" className="btn-outline">
            View All New Arrivals
          </Link>
        </div>
      </div>
    </section>
  );
}
