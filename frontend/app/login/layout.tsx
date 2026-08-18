import localFont from 'next/font/local';

const balkara = localFont({
  src: '../../shared/assets/fonts/BalkaraFreeCondensed/BalkaraFreeCondensed.woff2',
  variable: '--font-balkara-src',
  display: 'swap',
});

const gardens = localFont({
  src: '../../shared/assets/fonts/Gardens CM/GardensCM.woff2',
  variable: '--font-gardens-src',
  display: 'swap',
});

export default function LoginLayout({ children }: LayoutProps<'/'>) {
  return (
    <body className={`${balkara.variable} ${gardens.variable} min-h-full flex flex-col font-gardens`}>{children}</body>
  );
}
