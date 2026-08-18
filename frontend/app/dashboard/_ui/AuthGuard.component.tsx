'use client';

import { useAuthStore } from '@/shared/store/auth';
import { Routes } from '@/shared/utils';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { token, hydrated, fetchMe, logout } = useAuthStore();

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    if (!token) {
      router.replace(Routes.Login);
      return;
    }

    fetchMe().catch(() => {
      logout();
      router.replace(Routes.Login);
    });
  }, [hydrated, token, fetchMe, logout, router]);

  if (!hydrated || !token) {
    return null;
  }

  return children;
};
