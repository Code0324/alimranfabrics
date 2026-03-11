import Link from "next/link";
import { fetchProducts } from "@/lib/api";
import ProductCardApi from "@/components/ui/ProductCardApi";

export default async function NewArrivals() {
  let products = [];
  try {
    products = await fetchProducts({ new_arrival: true, limit: 8 });
    // Fallback: if no new_arrival products, fetch featured
    if (products.length === 0) {
      products = await fetchProducts({ limit: 8 });
    }
  } catch {
    // Backend offline — render nothing gracefully
    return null;
  }

  if (products.length === 0) return null;

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
            Fresh from our ateliers — discover the latest pieces that blend tradition with contemporary style.
          </p>
        </div>

        {/* Product grid — 2 cols mobile, 4 cols desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
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
