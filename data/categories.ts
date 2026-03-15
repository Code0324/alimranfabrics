import { Category } from "@/types";

export const categories: Category[] = [
  {
    id: "1",
    name: "Event Ready",
    slug: "event-ready",
    image: "/image/categories/cat-luxury.jpg",
    productCount: 24,
    description: "Elegance for every special occasion",
  },
  {
    id: "2",
    name: "Work Wear",
    slug: "work-wear",
    image: "/image/categories/cat-stitched.jpg",
    productCount: 18,
    description: "Professional style for the modern woman",
  },
  {
    id: "3",
    name: "Daily Wear",
    slug: "daily-wear",
    image: "/image/categories/cat-printed.jpg",
    productCount: 32,
    description: "Everyday comfort meets style",
  },
  {
    id: "4",
    name: "Embroidered",
    slug: "embroidered",
    image: "/image/categories/cat-embroidered.jpg",
    productCount: 28,
    description: "Stitched Embroidered 2 pcs",
  },
  {
    id: "5",
    name: "Printed",
    slug: "printed",
    image: "/image/categories/cat-printed.jpg",
    productCount: 20,
    description: "Printed unstitched collections",
  },
  {
    id: "6",
    name: "Shalwar Kameez",
    slug: "shalwar-kameez",
    image: "/image/categories/cat-men-stitched.jpg",
    productCount: 22,
    description: "Classic men's traditional wear",
  },
  {
    id: "7",
    name: "Kurta Pajama",
    slug: "kurta-pajama",
    image: "/image/categories/cat-men-kurta.jpg",
    productCount: 15,
    description: "Refined style for the modern man",
  },
  {
    id: "8",
    name: "Kids",
    slug: "kids",
    image: "/image/categories/cat-stitched.jpg",
    productCount: 20,
    description: "Little ones deserve elegance too",
  },
];

export const getCategoryBySlug = (slug: string): Category | undefined =>
  categories.find((c) => c.slug === slug);
