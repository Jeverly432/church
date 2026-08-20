import type { ColumnsType } from 'antd/es/table';
import type { Leader } from '@/shared/store/leaders';
import NextLink from 'next/link';
import { Link } from '@/shared';
import { Routes } from '@/shared/utils';
import { API_URL } from '@/shared/api/client';

export const columns: ColumnsType<Leader> = [
  {
    key: 'leader',
    render: (_, item) => (
      <NextLink
        href={Routes.DashboardLeadersCurrent(item.slug)}
        className='flex items-center gap-4 px-4 py-3 text-black no-underline'
      >
        {item.portrait ? (
          <img src={`${API_URL}${item.portrait}`} alt='' className='h-14 w-14 rounded-lg object-cover' />
        ) : (
          <div className='h-14 w-14 rounded-lg bg-main-gray' />
        )}
        <div className='flex min-w-0 flex-col gap-1'>
          <span className='text-[12px] leading-5 text-main-gray-hover'>{item.title}</span>
          <span className='text-[20px] leading-6 text-black'>{item.name}</span>
        </div>
      </NextLink>
    ),
  },
  {
    key: 'open',
    width: 220,
    render: (_, item) => (
      <div className='flex h-full items-center justify-center px-4'>
        <Link href={Routes.Leader(item.slug)} variant='default'>
          Посмотреть на сайте
        </Link>
      </div>
    ),
  },
];
