'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiRequest } from '@/shared/api/client';

export type AuthUser = {
  id: number;
  email: string;
  role: string;
};

type AuthState = {
  token: string | null;
  user: AuthUser | null;
  hydrated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchMe: () => Promise<void>;
  setHydrated: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      hydrated: false,
      setHydrated: () => set({ hydrated: true }),
      login: async (email, password) => {
        const data = await apiRequest<{ token: string; user: AuthUser }>('/api/auth/login', {
          method: 'POST',
          body: { email, password },
        });

        set({ token: data.token, user: data.user });
      },
      logout: () => set({ token: null, user: null }),
      fetchMe: async () => {
        const token = get().token;

        if (!token) {
          return;
        }

        const data = await apiRequest<{ user: AuthUser }>('/api/auth/me', { token });
        set({ user: data.user });
      },
    }),
    {
      name: 'church-auth',
      partialize: (state) => ({ token: state.token, user: state.user }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);
