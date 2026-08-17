import { Button } from '@/shared';
import { Routes } from '@/shared/utils';
import banner from '@shared/assets/images/Home/banner.webp';
import Image from 'next/image';

export const Banner = () => {
  return (
    <div className='pt-10 '>
      <div className='container'>
        <div className='flex flex-col gap-5'>
          <div className='flex justify-between items-center'>
            <h1 className='text-[46px] font-balkara'>Единство веры. Сила Братства!</h1>
            <Button size='large' href={Routes.About}>
              Подробнее о Братстве
            </Button>
          </div>
          <div className='relative flex w-full h-139.5 rounded-xl overflow-hidden'>
            <Image src={banner} alt='Единство веры. Сила Братства' fill className='object-cover' loading='eager' />
          </div>
        </div>
      </div>
    </div>
  );
};
