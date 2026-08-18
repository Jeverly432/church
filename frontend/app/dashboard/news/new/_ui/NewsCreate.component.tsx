import Link from 'next/link';
import { Button, Input } from '@/shared';
import { Routes } from '@/shared/utils';

const photoSlots = Array.from({ length: 10 }, (_, index) => index);

export const NewsCreate = () => {
  return (
    <section className='flex flex-col gap-6 p-6'>
      <div className='flex items-center justify-between gap-4'>
        <h1 className='text-[32px] leading-11 font-balkara text-black'>Новая новость</h1>
        <Link href={Routes.DashboardNews}>
          <Button type='default'>К списку</Button>
        </Link>
      </div>
      <div className='flex flex-col gap-5 rounded-xl bg-main-gray p-5'>
        <div className='flex flex-col gap-1'>
          <span className='text-[14px] leading-5.5 text-black'>Заголовок</span>
          <Input placeholder='Название новости' />
        </div>
        <div className='flex flex-wrap gap-3'>
          <div className='flex min-w-50 flex-1 flex-col gap-1'>
            <span className='text-[14px] leading-5.5 text-black'>Тег</span>
            <Input placeholder='Культура' />
          </div>
          <div className='flex min-w-50 flex-1 flex-col gap-1'>
            <span className='text-[14px] leading-5.5 text-black'>Дата</span>
            <Input placeholder='12.07.26' />
          </div>
        </div>
        <div className='flex flex-col gap-1'>
          <span className='text-[14px] leading-5.5 text-black'>Текст</span>
          <Input.TextArea placeholder='Текст новости' rows={6} />
        </div>
        <div className='flex flex-col gap-3'>
          <span className='text-[14px] leading-5.5 text-black'>Фотографии</span>
          <ul className='flex flex-wrap gap-3'>
            {photoSlots.map((slot) => (
              <li
                key={slot}
                className='flex h-36 w-36 items-center justify-center rounded-xl bg-white text-[14px] leading-5 text-main-gray-hover'
              >
                Фото {slot + 1}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Button size='large'>Опубликовать</Button>
        </div>
      </div>
    </section>
  );
};
