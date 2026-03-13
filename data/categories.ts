import { Category } from "@/types";

export const categories: Category[] = [
  {
    id: "1",
    name: "Formal Wear",
    slug: "formal",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80",
    productCount: 24,
    description: "Elegance for every formal occasion",
  },
  {
    id: "2",
    name: "Casual",
    slug: "casual",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&q=80",
    productCount: 32,
    description: "Everyday comfort meets style",
  },
  {
    id: "3",
    name: "Unstitched",
    slug: "unstitched",
    image: "https://images.unsplash.com/photo-1558171813-0ebd2dc6d440?w=600&q=80",
    productCount: 18,
    description: "Tailored to your perfection",
  },
  {
    id: "4",
    name: "Khaddar",
    slug: "khaddar",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80",
    productCount: 15,
    description: "Warm winter luxury",
  },
  {
    id: "5",
    name: "Embroidered",
    slug: "embroidered",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=80",
    productCount: 28,
    description: "Stitched Embroiderd 2 pcs",
  },
  {
    id: "6",
    name: "Kids",
    slug: "kids",
    image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600&q=80",
    productCount: 20,
    description: "Little ones deserve elegance too",
  },
  {
    id: "7",
    name: "Men",
    slug: "men",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    productCount: 22,
    description: "Refined style for the modern man",
  },
  {
    id: "8",
    name: "Women",
    slug: "women",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=80",
    productCount: 45,
    description: "Timeless feminine grace",
  },
];

export const getCategoryBySlug = (slug: string): Category | undefined =>
  categories.find((c) => c.slug === slug);
