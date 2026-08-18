import { Routes } from '@/shared/utils';
import { Logo } from '@shared/assets/icons';
import Link from 'next/link';
import { List } from './List/List.component';

export const Header = () => {
  return (
    <header className='py-3'>
      <div className='container'>
        <div className='flex justify-between'>
          <div className='flex items-center gap-5'>
            <Link href={Routes.Home}>
              <Logo />
            </Link>
            <p className='max-w-54.5 text-sm w-full leading-4 text-black'>
              АООО «Братство православной молодежи святого благоверного князя Александра Невского»
            </p>
          </div>
          <List />
        </div>
      </div>
    </header>
  );
};
