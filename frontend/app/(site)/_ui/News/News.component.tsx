'use client';

import { Link } from '@/shared';
import news from '@shared/assets/images/Home/news.webp';
import Image from 'next/image';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import { data } from './News.data';
import { NewsSkeleton } from './Skeleton.component';
import { Routes } from '@/shared/utils';

export const News = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <section>
        <div className='container'>
          <div className='flex flex-col gap-6'>
            <h2 className='max-w-220 text-[32px] leading-11 font-balkara text-black'>НОВОСТИ</h2>
            <div>
              {loading ? (
                <NewsSkeleton />
              ) : (
                <div className='flex flex-col gap-8'>
                  <ul className='flex justify-between gap-6'>
                    {data.map((item, index) => (
                      <li key={index}>
                        <NextLink href={item.link} className='group flex flex-col gap-3.5 w-full'>
                          <div className='relative h-70'>
                            <Image src={news} alt='news' fill sizes='' />
                          </div>
                          <div className='flex flex-col gap-3'>
                            <div className='flex items-center gap-2.5'>
                              <div className='bg-main-green-light rounded-3xl px-1.5 flex justify-center items-center text-[12px] leading-5'>
                                {item.tag}
                              </div>
                              <span className='text-[12px] leading-5'>{item.date}</span>
                            </div>
                            <div className='flex flex-col gap-2'>
                              <h3 className='text-[20px] leading-6 group-hover:text-main-green transition-colors text-black'>
                                {item.title}
                              </h3>
                              <p className='text-[16px] leading-5.5 text-black'>{item.desc}</p>
                            </div>
                          </div>
                        </NextLink>
                      </li>
                    ))}
                  </ul>
                  <Link className='mx-auto' href={Routes.News} variant='primary'>
                    Все новости
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
