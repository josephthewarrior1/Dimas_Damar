import { useRef, useEffect, useState, Suspense, lazy } from 'react';
import { useSearchParams } from 'react-router-dom';
import HeroSection from '../components/HeroSection';

// Lazy load komponen lainnya
const GroomSection = lazy(() => import('../components/GroomSection'));
const BrideSection = lazy(() => import('../components/BrideSection'));
const TimeLocationSection = lazy(() => import('../components/TimeLocationSection'));
const LiveStreamingSection = lazy(() => import('../components/LiveStreamingSection'));
const GallerySection = lazy(() => import('../components/GallerySection'));

export default function HomePage() {
  const [params] = useSearchParams();
  const [guestName, setGuestName] = useState("Tamu Undangan");
  const homeRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const nameFromUrl = params.get("to");
    if (nameFromUrl) {
      setGuestName(decodeURIComponent(nameFromUrl));
    }
  }, [params]);

  useEffect(() => {
    const loadAssets = async () => {
      try {
        await Promise.all([
          loadImage(invitationData.backgroundImage2),
          loadImage(invitationData.backgroundImageGroom),
          loadImage(invitationData.backgroundImageBride)
        ]);
        setIsLoading(false);
        if (homeRef.current) {
          homeRef.current.scrollTo(0, 0);
        }
      } catch (error) {
        console.error("Failed to load assets", error);
        setIsLoading(false);
      }
    };

    loadAssets();

    let isScrolling = false;
    const handleScroll = () => {
      if (!isScrolling) {
        isScrolling = true;
        requestAnimationFrame(() => {
          isScrolling = false;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = resolve;
      img.onerror = reject;
    });
  };

  if (isLoading) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#f9f7f4',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999
      }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div
      ref={homeRef}
      style={{
        width: '100%',
        height: '100vh',
        overflowY: 'scroll',
        overflowX: 'hidden',
        scrollSnapType: 'y proximity',
        scrollBehavior: 'smooth',
        WebkitOverflowScrolling: 'touch'
      }}
    >
      <HeroSection guestName={guestName} />
      
      <Suspense fallback={null}>
        <GroomSection />
      </Suspense>

      <Suspense fallback={null}>
        <BrideSection />
      </Suspense>

      <Suspense fallback={null}>
        <TimeLocationSection />
      </Suspense>

      <Suspense fallback={null}>
        <LiveStreamingSection />
      </Suspense>

      <Suspense fallback={null}>
        <GallerySection />
      </Suspense>
    </div>
  );
}
