import { useRef, useEffect, useState, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import IntroScreen from '../components/IntroScreen';
import HeroSection from '../components/HeroSection';
import GreetingSection from '../components/GreetingSection';
import BrideSection from '../components/BrideSection';
import GroomSection from '../components/GroomSection';
import GallerySection from '../components/GallerySection';
import GalleryBigSection from '../components/GalleryBigSection';
import WeddingEventSection from '../components/WeddingEvent';
import TimeLocationSection from '../components/TimeLocationSection';
import LoveStorySection from '../components/LoveStorySection';
import RsvpFlow from '../components/RsvpFlowSection';
import ThankYouSection from '../components/ThankyouSection';
import GuestInvitationPage from '../components/GuessInvitation';
import { AudioContext } from '../routes'; // Import context

export default function HomePage() {
  const homeRef = useRef(null);
  const [params] = useSearchParams();
  const [guestName, setGuestName] = useState("Tamu Undangan");
  const [showContent, setShowContent] = useState(false);
  const { setIsAudioPlaying } = useContext(AudioContext); // Gunakan context

  useEffect(() => {
    const nameFromUrl = params.get("to");
    if (nameFromUrl) {
      setGuestName(decodeURIComponent(nameFromUrl));
    }
    if (homeRef.current) {
      homeRef.current.scrollTo(0, 0);
    }
  }, [params]);

  const handleOpenInvitation = () => {
    setShowContent(true);
    setIsAudioPlaying(true); // Mulai musik
  };

  return (
    <div
      ref={homeRef}
      style={{
        backgroundColor: "#000",
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh"
      }}
    >
      {/* Main Content - Only shown after button click */}
      {showContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <HeroSection guestName={guestName} />
          <GallerySection />
          <GroomSection />
          <BrideSection />
          
          <GalleryBigSection />
          <WeddingEventSection />
          <LoveStorySection />
          <RsvpFlow />
          <ThankYouSection />
          <GuestInvitationPage />
        </motion.div>
      )}

      {/* Intro Screen - Only shown initially */}
      <AnimatePresence>
        {!showContent && (
          <IntroScreen
            key="intro"
            onOpenInvitation={handleOpenInvitation}
            guestName={guestName}
          />
        )}
      </AnimatePresence>
    </div>
  );
}