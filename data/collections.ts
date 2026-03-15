import { Collection } from "@/types";

export const collections: Collection[] = [
  {
    id: "1",
    name: "Printed",
    slug: "printed",
    image: "/image/categories/cat-printed.jpg",
    description: "Vibrant, modern, and expressive — our digital and block printed collections for the contemporary woman.",
    productCount: 34,
  },
  {
    id: "2",
    name: "Embroidered",
    slug: "embroidered",
    image: "/image/categories/cat-embroidered.jpg",
    description: "Masterpieces of thread and needle — our embroidered collection celebrates centuries of Pakistani artisanship.",
    productCount: 28,
  },
  {
    id: "3",
    name: "Jacquard",
    slug: "jacquard",
    image: "/image/categories/cat-luxury.jpg",
    description: "Where weaving becomes art — intricate self-patterned jacquard fabrics that shimmer with every step.",
    productCount: 16,
  },
  {
    id: "4",
    name: "Solid",
    slug: "solid",
    image: "/image/categories/cat-stitched.jpg",
    description: "Pure elegance in a single hue — our solid collection in rich seasonal tones for minimalist sophistication.",
    productCount: 22,
  },
];

export const getCollectionBySlug = (slug: string): Collection | undefined =>
  collections.find((c) => c.slug === slug);
