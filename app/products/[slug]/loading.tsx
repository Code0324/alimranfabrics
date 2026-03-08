export default function ProductLoading() {
  return (
    <div className="pt-28 md:pt-32 bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb skeleton */}
        <div className="h-4 w-64 bg-charcoal/10 animate-pulse mb-8" />

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          {/* Image gallery skeleton */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-20 h-24 bg-charcoal/10 animate-pulse" />
              ))}
            </div>
            <div className="flex-1 aspect-[3/4] bg-charcoal/10 animate-pulse" />
          </div>

          {/* Product info skeleton */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="h-5 w-12 bg-charcoal/10 animate-pulse" />
              <div className="h-5 w-20 bg-charcoal/10 animate-pulse" />
            </div>
            <div className="h-8 w-3/4 bg-charcoal/10 animate-pulse" />
            <div className="h-8 w-1/2 bg-charcoal/10 animate-pulse" />
            <div className="h-10 w-24 bg-charcoal/10 animate-pulse" />

            <div className="space-y-2 pt-4">
              <div className="h-4 w-full bg-charcoal/10 animate-pulse" />
              <div className="h-4 w-full bg-charcoal/10 animate-pulse" />
              <div className="h-4 w-2/3 bg-charcoal/10 animate-pulse" />
            </div>

            <div className="flex gap-2 pt-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-10 h-10 bg-charcoal/10 animate-pulse" />
              ))}
            </div>

            <div className="space-y-3 pt-4">
              <div className="h-12 w-full bg-charcoal/10 animate-pulse" />
              <div className="h-12 w-full bg-charcoal/10 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
