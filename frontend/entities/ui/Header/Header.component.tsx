import { Routes } from '@/shared/utils';
import { Logo } from '@shared/assets/icons';
import Link from 'next/link';
import { links } from './Header.data';

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
          <ul className='flex gap-6.5 items-center'>
            {links.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.href}
                  className='text-base active:text-main-green-hover hover:text-main-gray-hover leading-5.5 font-balkara transition-[0.3s] text-black'
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};
