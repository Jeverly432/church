'use client';

import { Routes } from '@/shared/utils';
import cn from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const nav = [
  { href: Routes.DashboardNews, title: 'Новости' },
  { href: Routes.DashboardDocs, title: 'Документы' },
  { href: Routes.DashboardLeaders, title: 'Руководители' },
];

export const DashboardSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className='flex w-56 shrink-0 flex-col gap-6 border-r border-[#bfbfbf] px-5 py-6'>
      <Link href={Routes.Dashboard} className='text-[20px] leading-6 font-balkara text-black'>
        Панель
      </Link>
      <nav>
        <ul className='flex flex-col gap-2'>
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'block rounded-md px-3 py-2 text-[16px] leading-5.5 transition-colors',
                  pathname.startsWith(item.href) ? 'bg-main-green text-white' : 'text-black hover:bg-main-gray',
                )}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
