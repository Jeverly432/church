'use client';

import { Button, Link } from '@/shared';
import { useAuthStore } from '@/shared/store/auth';
import { Routes } from '@/shared/utils';
import { useRouter } from 'next/navigation';

export const DashboardHeader = () => {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const onLogout = () => {
    logout();
    router.replace(Routes.Login);
  };

  return (
    <header className='flex items-center justify-between border-b border-[#bfbfbf] px-6 py-4'>
      <p className='text-[20px] leading-5 text-black '>{user?.email}</p>

      <div className='flex items-center gap-4'>
        <Link href={Routes.Home}>На главную</Link>
        <Button danger type='default' onClick={onLogout}>
          Выйти
        </Button>
      </div>
    </header>
  );
};
