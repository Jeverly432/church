import { Routes } from '@/shared/utils';

export const sitemapLinks = [
  { href: Routes.About, title: 'О Братстве' },
  { href: Routes.News, title: 'Новости' },
  { href: Routes.Leaders, title: 'Руководство' },
  { href: Routes.Docs, title: 'Документы' },
  { href: Routes.Donations, title: 'Реквизиты' },
  { href: Routes.Church, title: 'Храм святой мч. Лукии Сиракузской' },
  { href: Routes.Dashboard, title: 'Админка' },
];

export const contactLinks = [
  {
    href: 'tel:+79244439197',
    title: 'Телефон: 8 (924) 443-91-97',
  },
  {
    href: 'tel:+74162211197',
    title: 'Тел./факс: (4162) 21-11-97',
  },
  {
    href: 'mailto:bratstvo.an@mail.ru',
    title: 'bratstvo.an@mail.ru',
  },
  {
    href: 'https://yandex.ru/maps/?text=675000%2C%20Амурская%20обл.%2C%20г.%20Благовещенск%2C%20ул.%20Калинина%2C%20120',
    title: '675028, Амурская обл., г. Благовещенск, ул. Калинина, 120',
    external: true,
  },
];
