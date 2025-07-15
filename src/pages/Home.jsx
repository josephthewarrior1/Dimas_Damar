import { useRef, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import GallerySection from '../components/GallerySection';
import GroomSection from '../components/GroomSection';
import BrideSection from '../components/BrideSection';
import TimeLocationSection from '../components/TimeLocationSection';
import LiveStreamingSection from '../components/LiveStreamingSection';
import HeroSection from '../components/HeroSection';
import RsvpWishSection from '../components/RsvpWishSection';
import RsvpWishViaWhatsApp from '../components/RsvpWishViaWhatsApp';
import WeddingEventSection from '../components/WeddingEvent';

export default function HomePage() {
  const homeRef = useRef(null);
  const [params] = useSearchParams();
  const [guestName, setGuestName] = useState("Tamu Undangan");

  useEffect(() => {
    const nameFromUrl = params.get("to");
    if (nameFromUrl) {
      setGuestName(decodeURIComponent(nameFromUrl));
    }

    // Scroll to top when mounted
    if (homeRef.current) {
      homeRef.current.scrollTo(0, 0);
    }
  }, [params]);

  return (
    <div ref={homeRef}>
      <HeroSection guestName={guestName} />
      <GallerySection />
      <TimeLocationSection />
      <BrideSection />
      <GroomSection />
      <WeddingEventSection />
      <RsvpWishViaWhatsApp/>
      <RsvpWishSection/>
     
      
    </div>
  );
}