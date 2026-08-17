import { quality } from './About.data';

export const About = () => {
  return (
    <div>
      <div className='container'>
        <div className='flex flex-col gap-7'>
          <div className='flex flex-col gap-4.5'>
            <h2 className='max-w-220 text-[32px] leading-11 font-balkara'>
              Мы — Братство православной молодежи святого благоверного князя Александра Невского!
            </h2>
            <p className='max-w-202.5 text-[20px] leading-6'>
              Здесь ты встретишь тех, кто тебя поймет, станешь опорой тем, кто рядом, обретешь смысл жизни через веру и
              откроешь в себе силу для добрых дел!
            </p>
            <p className='text-[20px] leading-6'>Тебе к нам, если ты хочешь:</p>
          </div>
          <ul className='flex justify-between gap-6'>
            {quality.map((item, index) => (
              <li key={index} className='flex flex-col gap-8 bg-main-gray rounded-xl p-3 w-full'>
                {item.icon}
                <p className='text-[20px] leading-6'>{item.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
