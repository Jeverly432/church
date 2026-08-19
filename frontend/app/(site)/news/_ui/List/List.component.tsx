'use client';

import { Tag, useNewsStore } from '@/shared/store/news';
import { useEffect, useState } from 'react';
import cn from 'classnames';
import NextLink from 'next/link';
import Image from 'next/image';

export const List = () => {
  const [activeTag, setActiveTag] = useState<string>('all');
  const tags = useNewsStore((state) => state.tags);
  const news = useNewsStore((state) => state.news);
  const getTags = useNewsStore((state) => state.getTags);
  const getNews = useNewsStore((state) => state.getNews);

  useEffect(() => {
    getTags();
    getNews();
  }, [getTags, getNews]);

  const handleTagClick = (tag: Tag) => {
    setActiveTag(tag.id);
  };

  if (!tags || !news) return null;
  return (
    <section className='pt-10 pb-20'>
      <div className='container'>
        <div className='flex flex-col'>
          <h1 className='text-[46px] font-balkara text-black'>Новости</h1>
          <ul className='pt-10 flex gap-3'>
            {tags.map((tag) => (
              <li
                key={tag.id}
                className={cn(
                  'cursor-pointer py-1.5 px-5 rounded-full text-main-green transition-all border text-[14px] leading-5.5',
                  tag.id === activeTag && 'bg-main-green text-white',
                )}
                onClick={() => handleTagClick(tag)}
              >
                {tag.title}
              </li>
            ))}
          </ul>

          <ul>
            {news.map((item) => (
              <li key={item.id}>
                <NextLink href={String(item.id)} className='group flex flex-col gap-3.5 w-full text-black'>
                  <div className='relative h-70'>
                    <Image src={item.photos[0].url} alt='news' fill sizes='' />
                  </div>
                  <div className='flex flex-col gap-3'>
                    <div className='flex items-center gap-2.5'>
                      <div className='bg-main-green-light rounded-3xl px-1.5 flex justify-center items-center text-[12px] leading-5 text-black'>
                        {item.tag.title}
                      </div>
                      <span className='text-[12px] leading-5 text-black'>
                        {item.date ? item.date.slice(0, 10).split('-').reverse().join('.') : ''}
                      </span>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <h3 className='text-[20px] leading-6 group-hover:text-main-green transition-colors text-black'>
                        {item.title}
                      </h3>
                      <p className='text-[16px] leading-5.5 text-black'>{item.text}</p>
                    </div>
                  </div>
                </NextLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
