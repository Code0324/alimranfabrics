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

      loadUser: async () => {
        const token = get().token;
        if (!token) return;
        try {
          const user = await fetchMe(token);
          set({ user });
        } catch (e) {
          const msg = (e as Error).message ?? '';
          // Only log out on a real auth failure — not on 500 or network errors
          if (msg.includes('401') || msg.includes('403') || msg.toLowerCase().includes('unauthorized')) {
            set({ token: null, user: null });
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
