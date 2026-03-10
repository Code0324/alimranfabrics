import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import { getNewArrivals } from "@/data/products";

export default function NewArrivals() {
  const products = getNewArrivals();

  return (
    <section className="py-16 md:py-24 px-4 bg-ivory">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-3">
            <span className="w-12 h-px bg-gold" />
            <span className="font-inter text-gold text-xs uppercase tracking-[0.3em]">Just In</span>
            <span className="w-12 h-px bg-gold" />
          </div>
          <h2 className="section-title mb-3 bg-transparent">New Arrivals</h2>
          <p className="font-inter text-charcoal/60 max-w-md mx-auto text-sm">
            Fresh from our ateliers — discover the latest pieces that blend tradition with contemporary style.
          </p>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
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
