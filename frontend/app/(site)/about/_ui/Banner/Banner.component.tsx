import { list } from './Banner.data';
import Image from 'next/image';
import banner from '@shared/assets/images/About/banner.webp';

export const Banner = () => {
  return (
    <section className='pt-10 pb-20'>
      <div className='container'>
        <div className='flex gap-12.5'>
          <div className='flex flex-col gap-5'>
            <div className='flex flex-col gap-3'>
              <h1 className='text-[46px] font-balkara text-black'>историческая справка</h1>
              <p className='w-full max-w-148.5 text-[20px] leading-6'>
                Дата основания: 7 июля 2002 года (в день празднования Рождества Иоанна Предтечи).
              </p>
            </div>
            <ul className='flex flex-col gap-5'>
              {list.map((item, index) => (
                <li className='flex flex-col gap-2' key={index}>
                  <h2 className='text-[24px] leading-6 text-black'>{item.title}</h2>
                  <p className='text-[16px] leading-5.5 text-black text-justify'>{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className='relative flex max-w-138.5 w-full shrink-0 overflow-hidden rounded-xl'>
            <Image src={banner} alt='banner' fill />
          </div>
        </div>
      </div>
    </section>
  );
};
