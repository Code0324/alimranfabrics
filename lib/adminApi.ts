/**
 * Admin API client — uses the FastAPI backend directly.
 * Auth token is read from the Zustand persisted store.
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

function getAuthHeaders(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem('al-imran-auth');
    if (raw) {
      const parsed = JSON.parse(raw);
      const token = parsed?.state?.token;
      const userId = parsed?.state?.user?.id;
      const userRole = parsed?.state?.user?.role;
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;
      if (userId) headers['X-User-Id'] = userId;
      if (userRole) headers['X-User-Role'] = userRole;
      return headers;
    }
  } catch { /* ignore */ }
  return {};
}

async function adminFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
      ...options?.headers,
    },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { detail?: string }).detail || `API error ${res.status}`);
  }
  return res.json() as Promise<T>;
}

// ─── Products ─────────────────────────────────────────────────────────────────

export const productsAPI = {
  getAll: async (limit = 200) => {
    const data = await adminFetch<{ items?: unknown[]; [k: string]: unknown }>(
      `/products/?skip=0&limit=${limit}`
    );
    const items = (data as { items?: unknown[] }).items ?? data;
    return Array.isArray(items) ? items : [];
  },
  get: (id: string) => adminFetch(`/products/${id}`),
  create: (data: Record<string, unknown>) =>
    adminFetch('/products/', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: Record<string, unknown>) =>
    adminFetch(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) =>
    adminFetch(`/products/${id}`, { method: 'DELETE' }),
};

// ─── Orders ───────────────────────────────────────────────────────────────────

export const ordersAPI = {
  listAll: async (params: {
    limit?: number;
    page?: number;
    status?: string;
    payment_status?: string;
  } = {}) => {
    const qs = new URLSearchParams();
    if (params.limit)          qs.set('limit',          String(params.limit));
    if (params.page)           qs.set('page',           String(params.page));
    if (params.status)         qs.set('status',         params.status);
    if (params.payment_status) qs.set('payment_status', params.payment_status);
    const raw = await adminFetch<unknown>(`/orders?${qs}`);
    // Normalise: backend may return a plain array or a paginated { items, total, pages } object
    if (Array.isArray(raw)) {
      return { data: { items: raw, total: (raw as unknown[]).length, pages: 1 } };
    }
    return { data: raw };
  },
  get: (id: string) => adminFetch(`/orders/${id}`),
  updateStatus: (id: string, status: string) =>
    adminFetch(`/orders/${id}`, { method: 'PUT', body: JSON.stringify({ status }) }),
  verifyPayment: (id: string, payment_status: 'Paid' | 'Rejected') =>
    adminFetch(`/orders/${id}`, { method: 'PUT', body: JSON.stringify({ payment_status }) }),
};

// ─── Users ────────────────────────────────────────────────────────────────────

export const usersAPI = {
  list: async (skip = 0, limit = 500) => {
    const data = await adminFetch(`/users?skip=${skip}&limit=${limit}`);
    return { data };
  },
  get: (id: string) => adminFetch(`/users/${id}`),
};
