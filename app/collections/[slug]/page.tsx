import type { Metadata } from "next";
import Link from "next/link";
import CollectionGridApi from "@/components/collection/CollectionGridApi";
import CollectionHeroBanner, { type BannerLine } from "@/components/CollectionHeroBanner";
import { fetchProducts, fetchCategories } from "@/lib/api";
import { getLocalProducts } from "@/data/collectionProducts";
import { ChevronRight } from "lucide-react";

interface CollectionPageProps {
  params: { slug: string };
}

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  try {
    const cats = await fetchCategories();
    return cats.map((c) => ({ slug: c.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const title = params.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title,
    description: `Explore Al Imran Fabrics ${title} collection`,
  };
}

// ── Banner config ──────────────────────────────────────────────────────────────

type BannerConfig = {
  image:    string;
  lines:    BannerLine[];
  textSide?: "left" | "right";
};

const BANNER_LINE = {
  label: (text: string): BannerLine => ({
    text,
    cls: "font-cormorant italic text-[13px] md:text-[15px] text-white/80 mb-1",
  }),
  title: (text: string, extraCls = ""): BannerLine => ({
    text,
    cls: `font-cormorant text-[52px] md:text-[75px] font-semibold text-white leading-none ${extraCls}`,
  }),
  sub: (text: string, style?: React.CSSProperties): BannerLine => ({
    text,
    cls: "font-dm-sans text-[12px] md:text-[14px] tracking-[0.2em] text-white/80 mt-2",
    style,
  }),
  script: (text: string): BannerLine => ({
    text,
    cls: "text-[20px] md:text-[26px] text-white/90 mt-2",
    style: { fontFamily: "'Dancing Script', cursive" },
  }),
};

const BANNERS: Record<string, BannerConfig> = {
  printed: {
    image: "/image/categories/cat-printed.jpg",
    lines: [
      BANNER_LINE.label("ready to wear"),
      BANNER_LINE.title("PRINTED"),
      BANNER_LINE.sub("Collection'26"),
    ],
  },
  embroidered: {
    image: "/image/categories/cat-embroidered.jpg",
    lines: [
      BANNER_LINE.label("luxury pret"),
      BANNER_LINE.title("EMBROIDERED"),
      BANNER_LINE.sub("Collection'26"),
    ],
  },
  jacquard: {
    image: "/image/categories/cat-luxury.jpg",
    lines: [
      BANNER_LINE.label("finest fabric"),
      BANNER_LINE.title("JACQUARD"),
      BANNER_LINE.sub("Collection'26"),
    ],
  },
  solid: {
    image: "/image/categories/cat-1-piece.jpg",
    lines: [
      BANNER_LINE.label("everyday essentials"),
      BANNER_LINE.title("SOLID"),
      BANNER_LINE.sub("Collection'26"),
    ],
  },
  stitched: {
    image: "/image/categories/cat-stitched.jpg",
    lines: [
      BANNER_LINE.label("ready to wear"),
      BANNER_LINE.title("STITCHED"),
      BANNER_LINE.sub("Collection'26"),
    ],
  },
  unstitched: {
    image: "/image/categories/cat-unstitched.jpg",
    lines: [
      BANNER_LINE.label("premium fabric"),
      BANNER_LINE.title("UNSTITCHED"),
      BANNER_LINE.sub("Collection'26"),
    ],
  },
  men: {
    image: "/image/men-banner-new.png",
    lines: [
      BANNER_LINE.label("men's collection"),
      BANNER_LINE.title("THE FINAL"),
      BANNER_LINE.title("STATEMENT"),
    ],
  },
  kids: {
    image: "/image/categories/cat-lawn.jpg",
    lines: [
      BANNER_LINE.label("kidswear"),
      BANNER_LINE.title("COLLECTION"),
      BANNER_LINE.script("Little Adventures are live now"),
    ],
  },
  "new-arrivals": {
    image: "/image/women-banner-new.webp",
    lines: [
      BANNER_LINE.label("just in"),
      BANNER_LINE.title("NEW"),
      BANNER_LINE.title("ARRIVALS"),
    ],
  },
  sale: {
    image: "/image/categories/cat-bridal.jpg",
    lines: [
      BANNER_LINE.label("limited time"),
      BANNER_LINE.title("SALE"),
      BANNER_LINE.sub("FLAT 40% OFF", { color: "#C9A96E" }),
    ],
  },
};

const DEFAULT_BANNER: BannerConfig = {
  image: "/image/categories/cat-embroidered.jpg",
  lines: [
    BANNER_LINE.label("explore"),
    BANNER_LINE.title("COLLECTION"),
    BANNER_LINE.sub("Al Imran Fabrics"),
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = params;
  const title = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  /* ── Fetch products (logic unchanged) ── */
  let collectionProducts: import("@/lib/api").BackendProduct[] = [];
  try {
    if (slug === "new-arrivals") {
      collectionProducts = getLocalProducts("new-arrivals");
    } else if (slug === "sale") {
      collectionProducts = await fetchProducts({ limit: 50 });
      collectionProducts = collectionProducts.filter((p) => p.discountPercentage > 0 || p.originalPrice);
    } else {
      collectionProducts = await fetchProducts({ category_slug: slug, limit: 50 });
    }
    if (collectionProducts.length === 0) collectionProducts = getLocalProducts(slug);
    if (collectionProducts.length === 0) collectionProducts = await fetchProducts({ limit: 50 });
  } catch {
    collectionProducts = getLocalProducts(slug);
  }

  const banner = BANNERS[slug] ?? DEFAULT_BANNER;

  return (
    <div className="min-h-screen bg-cream">

      {/* ── Half-height hero banner (full-width, behind fixed navbar) ── */}
      <CollectionHeroBanner
        image={banner.image}
        lines={banner.lines}
        textSide={banner.textSide}
        alt={title}
      />

      {/* ── Content below banner ── */}
      <div id="products" className="max-w-7xl mx-auto px-4 md:px-6 pt-6">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 font-dm-sans text-[11px] text-charcoal/40 uppercase tracking-[0.1em] mb-6">
          <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
          <ChevronRight size={11} />
          <Link href="/collections" className="hover:text-charcoal transition-colors">Collections</Link>
          <ChevronRight size={11} />
          <span className="text-charcoal">{title}</span>
        </nav>

        {/* Grid with filter/sort toolbar */}
        <CollectionGridApi allProducts={collectionProducts} />
      </div>
    </div>
  );
}
