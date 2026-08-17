import { Feedback } from '@/widgets';
import { About } from './_ui/About/About.component';
import { Banner } from './_ui/Banner/Banner.component';
import { News } from './_ui/News/News.component';

export default function AppPage() {
  return (
    <div className='flex flex-col gap-20'>
      <Banner />
      <About />
      <News />
      <Feedback />
    </div>
  );
}
