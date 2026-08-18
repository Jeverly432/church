import { FooterLogo, Socials, Telegram, Vk } from '@/shared/assets/icons';
import Link from 'next/link';
import { contactLinks, sitemapLinks } from './Footer.data';

const linkClassName = ' hover:text-main-green text-[16px] leading-5.5 text-white transition-all';

export const Footer = () => {
  return (
    <footer className='bg-main-green-dark pt-10 pb-6.5 mt-auto'>
      <div className='container'>
        <div className='flex flex-col'>
          <div className='flex justify-between items-start'>
            <div className='flex items-center gap-5'>
              <FooterLogo />
              <p className='max-w-56 w-full text-[14px] leading-4 text-white'>
                АООО «Братство православной молодежи святого благоверного князя Александра Невского»
              </p>
            </div>
            <ul className='flex justify-between max-w-190 w-full'>
              <li className='flex gap-3 flex-col'>
                <h3 className='text-[20px] leading-6 text-white'>Карта сайта</h3>
                <ul className='flex flex-col gap-2 max-w-42 w-full'>
                  {sitemapLinks.map((link) => (
                    <li key={link.href}>
                      <Link className={linkClassName} href={link.href}>
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className='flex gap-3 flex-col'>
                <h3 className='text-[20px] leading-6 text-white'>Карта сайта</h3>
                <ul className='flex flex-col gap-2 max-w-69.5 w-full'>
                  {contactLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        className={linkClassName}
                        href={link.href}
                        {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li className='flex gap-3 flex-col'>
                <h3 className='text-[20px] leading-6 text-white'>Соц. сети</h3>
                <ul className='flex gap-3'>
                  <li>
                    <a
                      className='text-main-green hover:text-main-green-hover transition-colors'
                      href='https://t.me/pravoslavnayamolodej'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <Telegram />
                    </a>
                  </li>
                  <li>
                    <a
                      className='text-main-green hover:text-main-green-hover transition-colors'
                      href='https://vk.ru/pravmolodezhamur'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <Vk />
                    </a>
                  </li>
                  <li>
                    <a
                      className='text-main-green hover:text-main-green-hover transition-colors'
                      href='https://www.tiktok.com/@useralexandernevsky?_r=1&_t=ZS-98xejToale5'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <Socials />
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
