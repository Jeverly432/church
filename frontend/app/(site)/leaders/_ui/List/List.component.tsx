import Image from 'next/image';
import { Arrow } from '@/shared/assets/icons';
import Link from 'next/link';
import { leaders } from './List.data';

export const List = () => {
  return (
    <section className='pt-10'>
      <div className='container'>
        <div>
          <h1 className='text-[46px] font-balkara text-black'>Руководство</h1>
          <ul className='flex flex-wrap gap-4 pt-8'>
            {leaders.map((leader) => (
              <li className='flex flex-col w-[calc(33%-7px)]' key={leader.id}>
                <Link className='group rounded-xl bg-main-gray gap-3 p-3 relative' href={leader.href}>
                  <div className='flex w-full h-67 overflow-hidden rounded-xl relative'>
                    <Image src={leader.image} alt={leader.name} className='object-cover' fill />
                  </div>
                  <div className='flex flex-col gap-2 pt-3'>
                    <h3 className='text-black text-[24px] leading-7.5'>{leader.name}</h3>
                    <span className='text-black text-[16px] leading-5.5'>{leader.title}</span>
                  </div>
                  <div className='absolute right-6.5 top-6.5 bg-main-green rounded-md w-9 h-9 flex items-center justify-center'>
                    <Arrow stroke='white' className='group-hover:rotate-45 transition-transform duration-300' />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
