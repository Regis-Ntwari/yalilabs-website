import Hero from '../components/home/Hero';
import MissionSection from '../components/home/MissionSection';
import AltaSection from '../components/home/AltaSection';
import PartnersSection from '../components/home/PartnersSection';

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <MissionSection />
        <AltaSection />
        <PartnersSection />
      </main>
    </>
  );
}
