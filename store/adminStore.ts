import { create } from 'zustand';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  title?: string;
  duration?: number;
}

export interface AdminSettings {
  storeName: string;
  storePhone: string;
  whatsappNumber: string;
  lowStockThreshold: number;
  currency: string;
  timezone: string;
  autoWhatsApp: boolean;
  emailNotifications: boolean;
}

const DEFAULT_SETTINGS: AdminSettings = {
  storeName: 'AL Imran Fabrics',
  storePhone: '+92 300 0000000',
  whatsappNumber: '+923000000000',
  lowStockThreshold: 5,
  currency: 'PKR',
  timezone: 'Asia/Karachi',
  autoWhatsApp: true,
  emailNotifications: false,
};

interface AdminStore {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
  settings: AdminSettings;
  updateSettings: (partial: Partial<AdminSettings>) => void;
  resetSettings: () => void;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

let toastCounter = 0;

export const useAdminStore = create<AdminStore>((set, get) => ({
  toasts: [],
  addToast: (toast) => {
    const id = String(++toastCounter);
    set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }));
  },
  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
  clearToasts: () => set({ toasts: [] }),

  settings: (() => {
    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem('al-imran-admin-settings');
        if (raw) return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
      } catch { /* ignore */ }
    }
    return DEFAULT_SETTINGS;
  })(),

  updateSettings: (partial) => {
    const next = { ...get().settings, ...partial };
    set({ settings: next });
    if (typeof window !== 'undefined') {
      localStorage.setItem('al-imran-admin-settings', JSON.stringify(next));
    }
  },

  resetSettings: () => {
    set({ settings: DEFAULT_SETTINGS });
    if (typeof window !== 'undefined') {
      localStorage.removeItem('al-imran-admin-settings');
    }
  },

  sidebarOpen: true,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));

export function useToast() {
  const { addToast } = useAdminStore();
  return {
    success: (message: string, title?: string) => addToast({ type: 'success', message, title }),
    error: (message: string, title?: string) => addToast({ type: 'error', message, title }),
    warning: (message: string, title?: string) => addToast({ type: 'warning', message, title }),
    info: (message: string, title?: string) => addToast({ type: 'info', message, title }),
  };
}
