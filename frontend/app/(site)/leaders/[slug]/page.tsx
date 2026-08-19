'use client';

import { Feedback } from '@/widgets';
import { useLeadersStore } from '@/shared/store/leaders';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { Gallery } from './_ui/Gallery/Gallery.component';
import { Profile } from './_ui/Profile/Profile.component';

export default function LeaderPage() {
  const params = useParams();
  const slug = String(params.slug);
  const currentLeader = useLeadersStore((state) => state.currentLeader);
  const getLeader = useLeadersStore((state) => state.getLeader);
  const isFetching = useLeadersStore((state) => state.isFetching);
  const fetchedId = useLeadersStore((state) => state.fetchedId);

  useEffect(() => {
    void getLeader(slug);
  }, [getLeader, slug]);

  const showLoader = isFetching || fetchedId !== slug;

  if (showLoader) {
    return (
      <section className='pt-10 pb-20'>
        <div className='container'>
          <div className='h-118.5 rounded-xl bg-main-gray' />
        </div>
      </section>
    );
  }

  if (!currentLeader) {
    return (
      <section className='pt-10 pb-20'>
        <div className='container'>
          <p className='text-[16px] leading-5.5 text-main-gray-hover'>Руководитель не найден</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <Profile leader={currentLeader} />
      <Gallery photos={currentLeader.photos} />
      <Feedback />
    </>
  );
}
