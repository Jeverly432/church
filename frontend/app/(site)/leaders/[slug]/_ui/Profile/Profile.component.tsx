import Image from 'next/image';
import type { Leader } from '../../../leaders.data';

export const Profile = ({ leader }: { leader: Leader }) => {
  return (
    <section className='pt-10'>
      <div className='container'>
        <div className='flex flex-col gap-6'>
          <h1 className='text-[32px] font-balkara text-black'>О руководителе</h1>
          <div className='flex gap-6 items-start'>
            <div className='flex flex-col gap-3'>
              <div className='relative w-118.5 h-118.5 overflow-hidden rounded-xl shrink-0'>
                <Image src={leader.image} alt={leader.name} className='object-cover' fill sizes='360px' />
              </div>
              <div className='flex flex-col gap-2'>
                <h2 className='text-black text-[24px] leading-7.5'>{leader.name}</h2>
                <span className='text-black text-[16px] leading-5.5'>{leader.title}</span>
              </div>
            </div>
            <div className='flex flex-col gap-3.5'>
              <h3 className='text-[24px] leading-6 text-black'>{leader.bioTitle}</h3>
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
