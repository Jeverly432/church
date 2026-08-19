'use client';

import { Arrow } from '@/shared/assets/icons';
import Link from 'next/link';
import { Routes } from '@/shared/utils';
import { useLeadersStore } from '@/shared/store/leaders';
import { useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const List = () => {
  const leaders = useLeadersStore((state) => state.leaders);
  const fetchLeaders = useLeadersStore((state) => state.fetchLeaders);
  const isLoading = useLeadersStore((state) => state.isLoading);
  const hasFetchedLeaders = useLeadersStore((state) => state.hasFetchedLeaders);

  useEffect(() => {
    void fetchLeaders();
  }, [fetchLeaders]);

  return (
    <section className='pt-10'>
      <div className='container'>
        <div>
          <h1 className='text-[46px] font-balkara text-black'>Руководство</h1>
          {!hasFetchedLeaders || isLoading ? (
            <ul className='flex flex-wrap gap-4 pt-8'>
              {Array.from({ length: 3 }).map((_, index) => (
                <li className='flex w-[calc(33%-7px)] flex-col' key={index}>
                  <div className='rounded-xl bg-main-gray p-3'>
                    <div className='h-67 w-full rounded-xl bg-white/50' />
                    <div className='mt-3 h-7 w-2/3 rounded bg-white/50' />
                    <div className='mt-2 h-5 w-1/2 rounded bg-white/50' />
                  </div>
                </li>
              ))}
            </ul>
          ) : leaders.length === 0 ? (
            <p className='pt-8 text-[16px] leading-5.5 text-main-gray-hover'>Пока нет руководителей</p>
          ) : (
            <ul className='flex flex-wrap gap-4 pt-8'>
              {leaders.map((leader) => (
                <li className='flex w-[calc(33%-7px)] flex-col' key={leader.id}>
                  <Link className='group relative gap-3 rounded-xl bg-main-gray p-3' href={Routes.Leader(leader.slug)}>
                    <div className='relative flex h-67 w-full overflow-hidden rounded-xl'>
                      {leader.portrait ? (
                        <img
                          src={`${API_URL}${leader.portrait}`}
                          alt={leader.name}
                          className='h-full w-full object-cover'
                        />
                      ) : (
                        <div className='h-full w-full bg-white/50' />
                      )}
                    </div>
                    <div className='flex flex-col gap-2 pt-3'>
                      <h3 className='text-[24px] leading-7.5 text-black transition-colors group-hover:text-main-green'>
                        {leader.name}
                      </h3>
                      <span className='text-[16px] leading-5.5 text-black'>{leader.title}</span>
                    </div>
                    <div className='absolute top-6.5 right-6.5 flex h-9 w-9 items-center justify-center rounded-md bg-main-green'>
                      <Arrow stroke='white' className='transition-transform duration-300 group-hover:rotate-45' />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};
