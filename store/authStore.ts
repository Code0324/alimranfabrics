"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loginUser, registerUser, fetchMe, UserProfile } from "@/lib/api";

interface AuthState {
  token: string | null;
  user: UserProfile | null;
  isLoading: boolean;
  error: string | null;
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
        } catch {
          set({ token: null, user: null });
        }
      },
    }),
    { name: "al-imran-auth", partialize: (s) => ({ token: s.token }) }
  )
);
