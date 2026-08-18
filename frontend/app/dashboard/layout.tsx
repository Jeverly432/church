import localFont from 'next/font/local';
import { AuthGuard } from './_ui/AuthGuard.component';
import { DashboardHeader } from './_ui/DashboardHeader.component';
import { DashboardSidebar } from './_ui/DashboardSidebar.component';

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

export default function DashboardLayout({ children }: LayoutProps<'/'>) {
  return (
    <body className={`${balkara.variable} ${gardens.variable} min-h-full flex flex-col font-gardens h-full`}>
      <AuthGuard>
        <div className='flex min-h-full'>
          <DashboardSidebar />
          <div className='flex min-w-0 flex-1 flex-col'>
            <DashboardHeader />
            {children}
          </div>
        </div>
      </AuthGuard>
    </body>
  );
}
