import Hero from '@/components/sections/Hero';
import Courses from '@/components/sections/Courses';
import WomenEmpowerment from '@/components/sections/WomenEmpowerment';
import FounderSpotlight from '@/components/sections/FounderSpotlight';
import AlumniGallery from '@/components/sections/AlumniGallery';

export default function Home() {
  return (
    <main>
      <Hero />
      <Courses />
      <WomenEmpowerment />
      <FounderSpotlight />
      <AlumniGallery />
    </main>
  );
}