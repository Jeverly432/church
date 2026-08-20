'use client';

import type { Leader } from '@/shared/store/leaders';
import { API_URL } from '@/shared/api/client';

export const Profile = ({ leader }: { leader: Leader }) => {
  return (
    <section className='pt-10'>
      <div className='container'>
        <div className='flex flex-col gap-6'>
          <h1 className='text-[32px] font-balkara text-black'>О руководителе</h1>
          <div className='flex items-start gap-6'>
            <div className='flex flex-col gap-3'>
              <div className='relative h-118.5 w-118.5 shrink-0 overflow-hidden rounded-xl'>
                {leader.portrait ? (
                  <img src={`${API_URL}${leader.portrait}`} alt={leader.name} className='h-full w-full object-cover' />
                ) : (
                  <div className='h-full w-full bg-main-gray' />
                )}
              </div>
              <div className='flex flex-col gap-2'>
                <h2 className='text-[24px] leading-7.5 text-black'>{leader.name}</h2>
                <span className='text-[16px] leading-5.5 text-black'>{leader.title}</span>
              </div>
            </div>
            <div className='flex flex-col gap-3.5'>
              {leader.bioTitle ? <h3 className='text-[24px] leading-6 text-black'>{leader.bioTitle}</h3> : null}
              <ul className='flex flex-col gap-3'>
                {leader.bio.map((paragraph) => (
                  <li className='text-[16px] leading-5.5 text-black' key={paragraph}>
                    {paragraph}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
