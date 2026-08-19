const MAP_SRC = process.env.NEXT_PUBLIC_MAP_WIDGET_URL;

export const Map = () => {
  return (
    <section>
      <div className='container'>
        <div className='flex gap-6'>
          <div className='flex flex-col gap-4.5 p-5 bg-main-gray rounded-xl w-full'>
            <h3 className='text-[32px] leading-11 text-black font-balkara'>Еженедельные встречи</h3>
            <div>
              <p className=' text-[24px] leading-7.5'>
                Каждый вторник <span className='text-main-green'>в 18:30,</span>
              </p>
              <p className=' text-[24px] leading-7.5'>
                по адресу: <span className='text-main-green'>Калинина, 120</span>
              </p>
            </div>
          </div>
          <div className='flex w-[67%] shrink-0'>
            {MAP_SRC ? (
              <div className='h-125 w-full overflow-hidden rounded-xl bg-main-gray'>
                <iframe
                  title='Карта: ул. Калинина, 120'
                  src={MAP_SRC}
                  className='h-full w-full border-0'
                  allowFullScreen
                />
              </div>
            ) : (
              <div className='flex h-105.5 items-center justify-center rounded-xl bg-main-gray text-main-gray-hover'>
                Карта скоро появится
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
