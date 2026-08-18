'use client';

import { usePathname } from 'next/navigation';
import { links } from './List.data';
import Link from 'next/link';
import cn from 'classnames';

export const List = () => {
  const pathname = usePathname();

  const isSelected = (href: string) => {
    if (href === pathname) {
      return true;
    }
  };

  return (
    <ul className='flex gap-6.5 items-center'>
      {links.map((link, index) => (
        <li key={index}>
          <Link
            href={link.href}
            className={cn(
              'text-base active:text-main-green-hover hover:text-main-gray-hover leading-5.5 font-balkara transition-[0.3s]',
              isSelected(link.href) ? 'text-main-green' : 'text-black',
            )}
          >
            {link.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};
