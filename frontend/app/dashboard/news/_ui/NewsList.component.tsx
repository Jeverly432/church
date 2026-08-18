import Link from 'next/link';
import { Button } from '@/shared';
import { Routes } from '@/shared/utils';
import { newsList } from './NewsList.data';

export const NewsList = () => {
  return (
    <section className='flex flex-col gap-6 p-6'>
      <div className='flex items-center justify-between gap-4'>
        <h1 className='text-[32px] leading-11 font-balkara text-black'>Новости</h1>
        <Link href={Routes.DashboardNewsCreate}>
          <Button>Добавить новость</Button>
        </Link>
      </div>
      <ul className='flex flex-col overflow-hidden rounded-xl border border-[#bfbfbf]'>
        {newsList.map((item) => (
          <li
            key={item.id}
            className='flex items-center justify-between gap-4 border-b border-[#bfbfbf] px-4 py-4 last:border-b-0'
          >
            <div className='flex flex-col gap-1'>
              <div className='flex items-center gap-2.5'>
                <span className='rounded-3xl bg-main-green-light px-1.5 text-[12px] leading-5'>{item.tag}</span>
                <span className='text-[12px] leading-5'>{item.date}</span>
              </div>
              <h2 className='text-[20px] leading-6 text-black'>{item.title}</h2>
            </div>
            <span className='text-[14px] leading-5 text-main-gray-hover'>Черновик вёрстки</span>
          </li>
        ))}
      </ul>
    </section>
  );
};
