'use client';

import type { LeaderPhoto } from '@/shared/store/leaders';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const rowClass = ['grid h-67 grid-cols-[35fr_25fr_40fr] gap-4', 'grid h-67 grid-cols-[18fr_64fr_18fr] gap-4'];

export const Gallery = ({ photos }: { photos: LeaderPhoto[] }) => {
  const rows = Math.max(2, Math.ceil(photos.length / 3));

  return (
    <section className='pt-18.5 pb-20'>
      <div className='container'>
        <div className='flex flex-col gap-6'>
          <h2 className='text-[32px] leading-11 font-balkara text-black'>Фотогалерея</h2>
          <div className='flex flex-col gap-4'>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <div className={rowClass[rowIndex % 2]} key={rowIndex}>
                {Array.from({ length: 3 }).map((__, cellIndex) => {
                  const photo = photos[rowIndex * 3 + cellIndex];

                  return (
                    <div
                      className='overflow-hidden rounded-xl bg-main-gray'
                      key={photo?.id ?? `${rowIndex}-${cellIndex}`}
                    >
                      {photo ? (
                        <img src={`${API_URL}${photo.url}`} alt='' className='h-full w-full object-cover' />
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
