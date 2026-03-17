"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loginUser, registerUser, fetchMe, UserProfile } from "@/lib/api";

interface AuthState {
  token: string | null;
  user: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  _hasHydrated: boolean;
  setHasHydrated: (v: boolean) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loadUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isLoading: false,
      error: null,
      _hasHydrated: false,
      setHasHydrated: (v) => set({ _hasHydrated: v }),

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const res = await loginUser(email, password);
          set({ token: res.access_token });
          await get().loadUser();
        } catch (e) {
          set({ error: (e as Error).message });
          throw e;
        } finally {
          set({ isLoading: false });
        }
      },

      register: async (name, email, password) => {
        set({ isLoading: true, error: null });
        try {
          await registerUser({ name, email, password });
          await get().login(email, password);
        } catch (e) {
          set({ error: (e as Error).message });
          throw e;
        } finally {
          set({ isLoading: false });
        }
      },

      logout: () => set({ token: null, user: null, error: null }),

      // ✅ FIXED: set isLoading true/false so layout knows when fetch is in progress
      // ✅ FIXED: on network/500 errors, do NOT wipe token — only wipe on real 401/403
      loadUser: async () => {
        const token = get().token;
        if (!token) return;
        set({ isLoading: true }); // ✅ signal that fetch is in progress
        try {
          const user = await fetchMe(token);
          set({ user, isLoading: false }); // ✅ store user, stop loading
        } catch (e) {
          const msg = (e as Error).message ?? '';
          if (
            msg.includes('401') ||
            msg.includes('403') ||
            msg.toLowerCase().includes('unauthorized')
          ) {
            // Real auth failure → clear session
            set({ token: null, user: null, isLoading: false });
          } else {
            // Network error / Railway 500 / CORS → keep token, just stop loading
            // This prevents wrongly logging out the admin on a flaky connection
            set({ isLoading: false });
          }
        }
      },
    }),
    {
      name: "al-imran-auth",
      partialize: (s) => ({ token: s.token, user: s.user }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);