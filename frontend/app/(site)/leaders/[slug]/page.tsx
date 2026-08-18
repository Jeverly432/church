import { notFound } from 'next/navigation';
import { Feedback } from '@/widgets';
import { getLeader, leaders } from '../leaders.data';
import { Gallery } from './_ui/Gallery/Gallery.component';
import { Profile } from './_ui/Profile/Profile.component';

export const generateStaticParams = () => {
  return leaders.map(({ slug }) => ({ slug }));
};

export default async function LeaderPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const leader = getLeader(slug);

  if (!leader) {
    notFound();
  }

  return (
    <>
      <Profile leader={leader} />
      <Gallery />
      <Feedback />
    </>
  );
}
