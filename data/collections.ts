import { Collection } from "@/types";

export const collections: Collection[] = [
  {
    id: "1",
    name: "Embroidered",
    slug: "embroidered",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=75&fm=webp&auto=compress",
    description: "Masterpieces of thread and needle — our embroidered collection celebrates centuries of Pakistani artisanship.",
    productCount: 28,
  },
  {
    id: "2",
    name: "Jacquard",
    slug: "jacquard",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=75&fm=webp&auto=compress",
    description: "Where weaving becomes art — intricate self-patterned jacquard fabrics that shimmer with every step.",
    productCount: 16,
  },
  {
    id: "3",
    name: "Printed",
    slug: "printed",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=75&fm=webp&auto=compress",
    description: "Vibrant, modern, and expressive — our digital and block printed collections for the contemporary woman.",
    productCount: 34,
  },
  {
    id: "4",
    name: "Solid",
    slug: "solid",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=75&fm=webp&auto=compress",
    description: "Pure elegance in a single hue — our solid collection in rich seasonal tones for minimalist sophistication.",
    productCount: 22,
  },
];

export const getCollectionBySlug = (slug: string): Collection | undefined =>
  collections.find((c) => c.slug === slug);
