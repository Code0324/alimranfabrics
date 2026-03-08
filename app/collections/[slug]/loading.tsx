export default function CollectionLoading() {
  return (
    <div className="pt-28 md:pt-32 min-h-screen bg-ivory">
      {/* Hero skeleton */}
      <div className="h-48 md:h-64 bg-charcoal/10 animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb skeleton */}
        <div className="flex justify-between mb-8">
          <div className="h-4 w-48 bg-charcoal/10 animate-pulse" />
          <div className="h-4 w-24 bg-charcoal/10 animate-pulse" />
        </div>

        <div className="flex gap-8">
          {/* Sidebar skeleton */}
          <div className="hidden md:block w-60 flex-shrink-0">
            <div className="bg-white shadow-card p-4 space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i}>
                  <div className="h-4 w-20 bg-charcoal/10 animate-pulse mb-3" />
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4].map((j) => (
                      <div key={j} className="h-8 w-12 bg-charcoal/10 animate-pulse" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grid skeleton */}
          <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="bg-white shadow-card overflow-hidden">
                <div className="aspect-[3/4] bg-charcoal/10 animate-pulse" />
                <div className="p-4 space-y-2">
                  <div className="h-3 w-16 bg-charcoal/10 animate-pulse" />
                  <div className="h-4 w-full bg-charcoal/10 animate-pulse" />
                  <div className="h-4 w-2/3 bg-charcoal/10 animate-pulse" />
                  <div className="h-5 w-16 bg-charcoal/10 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
