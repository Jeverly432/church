import { About } from './_ui/About/About.component';
import { Banner } from './_ui/Banner/Banner.component';

export default function AppPage() {
  return (
    <div className='flex flex-col gap-20'>
      <Banner />
      <About />
    </div>
  );
}
