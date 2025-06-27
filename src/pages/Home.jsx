import { useRef } from 'react';
import GallerySection from '../components/GallerySection';
import GroomSection from '../components/GroomSection';
import BrideSection from '../components/BrideSection';
import TimeLocationSection from '../components/TimeLocationSection';
import LiveStreamingSection from '../components/LiveStreamingSection';
import HeroSection from '../components/HeroSection';

export default function HomePage() {
  const homeRef = useRef(null);

  return (
    <div ref={homeRef}>
      <HeroSection />
      <GroomSection />
      <BrideSection />
      <TimeLocationSection />
      <LiveStreamingSection />
      <GallerySection />
    </div>
  );
}
