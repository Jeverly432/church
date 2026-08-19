import type { ColumnsType } from 'antd/es/table';
import type { News } from '@/shared/store/news';
import NextLink from 'next/link';
import { Link } from '@/shared';
import { Routes } from '@/shared/utils';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const formatDate = (value?: string | null) => {
  if (!value) {
    return '';
  }

  const [year, month, day] = value.slice(0, 10).split('-');

  if (!day || !month || !year) {
    return value;
  }

  return `${day}.${month}.${year}`;
};

export const columns: ColumnsType<News> = [
  {
    key: 'news',
    render: (_, item) => {
      const photos = item.photos ?? [];
      const visible = photos.slice(0, 3);
      const extra = photos.length - visible.length;

      return (
        <NextLink
          href={Routes.DashboardNewsCurrent(String(item.id))}
          className='flex items-center gap-4 px-4 py-3 text-black no-underline'
        >
          <div className='flex min-w-0 flex-col gap-1'>
            <div className='flex items-center gap-2.5'>
              <span className='rounded-3xl bg-main-green-light px-1.5 text-[12px] leading-5 text-black'>
                {item.tag?.title}
              </span>
              <span className='text-[12px] leading-5 text-black'>{formatDate(item.date)}</span>
            </div>
            <span className='text-[20px] leading-6 text-black'>{item.title}</span>
          </div>
          <div className='flex shrink-0 gap-1 ml-10'>
            {visible.length
              ? visible.map((photo) => (
                  <img
                    key={photo.id}
                    src={`${API_URL}${photo.url}`}
                    alt=''
                    className='h-14 w-14 rounded-lg object-cover'
                  />
                ))
              : null}
            {extra > 0 ? (
              <span className='flex h-14 w-14 items-center justify-center rounded-lg bg-main-green-light text-[12px] leading-5 text-black'>
                +{extra}
              </span>
            ) : null}
          </div>
        </NextLink>
      );
    },
  },
  {
    key: 'open',
    width: 220,
    render: (_, item) => (
      <div className='flex h-full items-center justify-center px-4'>
        <Link href={Routes.NewsCurrent(String(item.id))} variant='default'>
          Перейти на новость
        </Link>
      </div>
    ),
  },
];
