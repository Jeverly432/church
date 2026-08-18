export const Gallery = () => {
  return (
    <section className='pt-18.5 pb-20'>
      <div className='container'>
        <div className='flex flex-col gap-6'>
          <h2 className='text-[32px] leading-11 font-balkara text-black'>Фотогалерея</h2>
          <div className='flex flex-col gap-4'>
            <div className='grid h-67 grid-cols-[35fr_25fr_40fr] gap-4'>
              <div className='rounded-xl bg-main-gray' />
              <div className='rounded-xl bg-main-gray' />
              <div className='rounded-xl bg-main-gray' />
            </div>
            <div className='grid h-67 grid-cols-[18fr_64fr_18fr] gap-4'>
              <div className='rounded-xl bg-main-gray' />
              <div className='rounded-xl bg-main-gray' />
              <div className='rounded-xl bg-main-gray' />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
