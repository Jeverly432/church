import type { Metadata } from 'next';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import './globals.css';

export const metadata: Metadata = {
  title: 'Братство православной молодежи св. Александра Невского',
  description: 'Амурская областная общественная организация «Братство православной молодежи святого благоверного князя Александра Невского»',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang='en' className='h-full antialiased'>
      <AntdRegistry>{children}</AntdRegistry>
    </html>
  );
}
