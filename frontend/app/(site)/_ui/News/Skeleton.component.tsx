import { Skeleton } from '@/shared';

export const NewsSkeleton = () => {
  return (
    <div className='flex flex-col gap-8'>
      <ul className='flex justify-between gap-6'>
        {Array.from({ length: 3 }).map((_, index) => (
          <li key={index} className='flex flex-1 flex-col gap-3.5'>
            <Skeleton className='h-70 w-full rounded-xl' />
            <div className='flex flex-col gap-3'>
              <div className='flex items-center gap-2.5'>
                <Skeleton className='h-5.5 w-16 rounded-sm' />
                <Skeleton className='h-3 w-14 rounded-sm' />
              </div>
              <div className='flex flex-col gap-2'>
                <Skeleton className='h-4 w-[40%] rounded-sm' />
                <Skeleton className='h-3 w-full rounded-sm mt-2.5' />
                <Skeleton className='h-3 w-4/5 rounded-sm' />
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Skeleton className='h-10 w-27.5 rounded-sm mx-auto' />
    </div>
  );
};
