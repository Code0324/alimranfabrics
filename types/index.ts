export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  categorySlug: string;
  fabric: string;
  sizes: string[];
  colors: ProductColor[];
  description: string;
  careInstructions: string;
  isNew: boolean;
  isBestSeller: boolean;
  sku: string;
  collection?: string;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  productCount: number;
  description?: string;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  productCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: ProductColor;
}

export interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, size: string, color: ProductColor) => void;
  removeItem: (productId: string, size: string, colorName: string) => void;
  updateQuantity: (productId: string, size: string, colorName: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export interface WishlistContextType {
  wishlist: string[];
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  toggleWishlist: (productId: string) => void;
}

export type SortOption = "newest" | "price-low" | "price-high" | "best-selling";

export interface FilterState {
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
  fabricTypes: string[];
}
