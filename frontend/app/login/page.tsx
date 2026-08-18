'use client';

import { Link } from '@/shared';
import { LoginForm } from './_ui/LoginForm.component';
import { Routes } from '@/shared/utils';
import { useAuthStore } from '@/shared/store/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const hydrated = useAuthStore((state) => state.hydrated);

  useEffect(() => {
    if (hydrated && token) {
      router.replace(Routes.Dashboard);
    }
  }, [hydrated, token, router]);

  return (
    <main className='flex flex-1 items-center justify-center px-4 py-10'>
      <div className='w-full max-w-105 rounded-xl bg-main-gray p-6 flex flex-col'>
        <h1 className='mb-6 text-[32px] leading-11 font-balkara text-black'>Вход в панель</h1>
        <LoginForm />
        <Link href={Routes.Home} className='mx-auto'>
          На главную
        </Link>
      </div>
    </main>
  );
}
