import HeroSection from '../components/home/HeroSection';
import ExplorationGrid from '../components/home/ExplorationGrid';
import CivilizationsCarousel from '../components/home/CivilizationsCarousel';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <ExplorationGrid />
      <CivilizationsCarousel />
    </>
  );
}

export default HomePage;
