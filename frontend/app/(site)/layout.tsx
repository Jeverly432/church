export default function AppLayout({ children }: LayoutProps<'/'>) {
  return <body className='min-h-full flex flex-col'>{children}</body>;
}
