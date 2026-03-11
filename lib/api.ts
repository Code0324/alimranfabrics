/**
 * API client — connects to Railway backend in production,
 * falls back to localhost:8000 for local development.
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

// ─── Types matching the backend catalog response ───────────────────────────

export interface BackendProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice: number | null;
  images: string[];
  category: string;
  categorySlug: string;
  brand: string;
  brandSlug: string;
  fabric: string;
  stock: number;
  stockStatus: string;
  isFeatured: boolean;
  isBestSeller: boolean;
  isNew: boolean;
  isLimitedEdition: boolean;
  discountPercentage: number;
  tags: string;
}

export interface BackendCategory {
  id: string;
  name: string;
  slug: string;
  product_count: number;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: string;
  created_at: string;
}

// ─── Helpers ───────────────────────────────────────────────────────────────

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { detail?: string }).detail || `API error ${res.status}`);
  }
  return res.json() as Promise<T>;
}

// ─── Products / Catalog ─────────────────────────────────────────────────────

export async function fetchProducts(params?: {
  skip?: number;
  limit?: number;
  category_slug?: string;
  brand_slug?: string;
  featured?: boolean;
  new_arrival?: boolean;
}): Promise<BackendProduct[]> {
  const qs = new URLSearchParams();
  if (params?.skip !== undefined) qs.set("skip", String(params.skip));
  if (params?.limit !== undefined) qs.set("limit", String(params.limit));
  if (params?.category_slug) qs.set("category_slug", params.category_slug);
  if (params?.brand_slug) qs.set("brand_slug", params.brand_slug);
  if (params?.featured !== undefined) qs.set("featured", String(params.featured));
  if (params?.new_arrival !== undefined) qs.set("new_arrival", String(params.new_arrival));

  return apiFetch<BackendProduct[]>(`/catalog/products?${qs}`);
}

export async function fetchProduct(idOrSlug: string): Promise<BackendProduct> {
  return apiFetch<BackendProduct>(`/catalog/products/${idOrSlug}`);
}

export async function fetchProductCount(categorySlug?: string): Promise<number> {
  const qs = categorySlug ? `?category_slug=${categorySlug}` : "";
  const data = await apiFetch<{ count: number }>(`/catalog/products/count${qs}`);
  return data.count;
}

export async function fetchCategories(): Promise<BackendCategory[]> {
  return apiFetch<BackendCategory[]>("/catalog/categories");
}

// ─── Auth ──────────────────────────────────────────────────────────────────

export async function loginUser(email: string, password: string): Promise<LoginResponse> {
  return apiFetch<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function registerUser(data: {
  email: string;
  password: string;
  name: string;
}): Promise<UserProfile> {
  return apiFetch<UserProfile>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ ...data, role: "customer" }),
  });
}

export async function fetchMe(token: string): Promise<UserProfile> {
  return apiFetch<UserProfile>("/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// ─── Orders ────────────────────────────────────────────────────────────────

export interface OrderItem {
  product_id: string;
  quantity: number;
}

export interface CreateOrderPayload {
  items: OrderItem[];
  customer_name?: string;
  customer_phone?: string;
  shipping_address?: string;
  payment_method?: "cod" | "jazzcash" | "easypaisa" | "stripe";
  notes?: string;
}

export async function createOrder(payload: CreateOrderPayload, token: string) {
  return apiFetch("/orders", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  });
}
