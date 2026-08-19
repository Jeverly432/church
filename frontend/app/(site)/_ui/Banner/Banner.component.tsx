import { Link } from '@/shared';
import { Routes } from '@/shared/utils';
import banner from '@shared/assets/images/Home/banner.jpg';
import Image from 'next/image';

export const Banner = () => {
  return (
    <section className='pt-10'>
      <div className='container'>
        <div className='flex flex-col gap-5'>
          <div className='flex justify-between items-center'>
            <h1 className='text-[46px] font-balkara text-black'>Единство веры. Сила Братства!</h1>
            <Link href={Routes.About} variant='primary' size='large'>
              Подробнее о Братстве
            </Link>
          </div>
          <div className='relative flex w-full h-139.5 rounded-xl overflow-hidden'>
            <Image
              src={banner}
              alt='Единство веры. Сила Братства'
              fill
              sizes='(max-width: 1440px) 100vw, 1380px'
              className='object-cover'
              loading='eager'
            />
          </div>
        </div>
      </div>
    </section>
  );
};
