import { Feedback } from '@/widgets';
import { About } from './_ui/About/About.component';
import { Banner } from './_ui/Banner/Banner.component';
import { News } from './_ui/News/News.component';
import { Map } from './_ui/Map/Map.component';

export default function AppPage() {
  return (
    <main className='flex flex-col gap-20'>
      <Banner />
      <About />
      <News />
      <Map />
      <Feedback />
    </main>
  );
}
