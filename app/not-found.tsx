import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center px-4 pt-28">
      <div className="text-center max-w-md">
        <p
          className="font-inter text-xs uppercase tracking-[0.3em] font-bold mb-3"
          style={{ color: "#CC0000" }}
        >
          404 — Page Not Found
        </p>
        <h1 className="font-playfair text-5xl font-bold text-charcoal mb-4">
          Oops!
        </h1>
        <div className="w-14 mx-auto my-4" style={{ height: "2px", backgroundColor: "#CC0000" }} />
        <p className="font-inter text-charcoal/60 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            href="/"
            className="font-inter font-semibold text-sm uppercase tracking-wide px-6 py-3 transition hover:opacity-90"
            style={{ backgroundColor: "#FFE500", color: "#CC0000" }}
          >
            Back to Home
          </Link>
          <Link
            href="/collections/new-arrivals"
            className="font-inter font-semibold text-sm uppercase tracking-wide px-6 py-3 border border-charcoal text-charcoal hover:border-[#CC0000] hover:text-[#CC0000] transition"
          >
            Shop New Arrivals
          </Link>
        </div>
      </div>
    </div>
  );
}
