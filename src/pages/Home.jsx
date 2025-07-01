import { useRef, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { preloadAllImages } from '../utils/imagePreloader';
import invitationData from '../data/invitationData';
import HeroSection from '../components/HeroSection';
import GroomSection from '../components/GroomSection';
import BrideSection from '../components/BrideSection';
import TimeLocationSection from '../components/TimeLocationSection';
import LiveStreamingSection from '../components/LiveStreamingSection';
import GallerySection from '../components/GallerySection';

export default function HomePage() {
  const homeRef = useRef(null);
  const [params] = useSearchParams();
  const [guestName, setGuestName] = useState("Tamu Undangan");
  const [loadingState, setLoadingState] = useState({
    isReady: false,
    progress: 0,
    error: null
  });

  useEffect(() => {
    // 1. Handle guest name from URL
    const nameFromUrl = params.get("to");
    if (nameFromUrl) {
      setGuestName(decodeURIComponent(nameFromUrl));
    }

    // 2. Preload all images with progress tracking
    const loadAssets = async () => {
      try {
        const allImages = [
          invitationData.backgroundImage2,
          invitationData.backgroundImageGroom,
          invitationData.backgroundImageBride,
          invitationData.dateTimeImage,
          invitationData.backgroundImageLive,
          ...invitationData.galleryImages
        ];

        const totalImages = allImages.length;
        let loadedCount = 0;

        await preloadAllImages(allImages, (url) => {
          loadedCount++;
          setLoadingState(prev => ({
            ...prev,
            progress: Math.round((loadedCount / totalImages) * 100)
          }));
        });

        setLoadingState({
          isReady: true,
          progress: 100,
          error: null
        });

      } catch (error) {
        console.error("Failed to preload images:", error);
        setLoadingState({
          isReady: true, // Continue even if some images fail
          progress: 100,
          error: "Some images may take longer to load"
        });
      }
    };

    loadAssets();

    // 3. Scroll to top
    if (homeRef.current) {
      homeRef.current.scrollTo(0, 0);
    }
  }, [params]);

  if (!loadingState.isReady) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0e7db',
        fontFamily: "'Playfair Display', serif",
        color: '#333'
      }}>
        <div style={{ 
          textAlign: 'center',
          width: '80%',
          maxWidth: '300px'
        }}>
          <p style={{ marginBottom: '20px' }}>Loading Wedding Invitation...</p>
          
          {/* Progress bar */}
          <div style={{
            height: '4px',
            backgroundColor: 'rgba(0,0,0,0.1)',
            borderRadius: '2px',
            marginBottom: '20px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${loadingState.progress}%`,
              height: '100%',
              backgroundColor: '#333',
              transition: 'width 0.3s ease'
            }} />
          </div>
          
          <p style={{ 
            fontSize: '0.8rem',
            opacity: 0.7,
            marginBottom: '20px'
          }}>
            {loadingState.progress}% loaded
          </p>
          
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid rgba(0,0,0,0.1)',
            borderTopColor: '#333',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }} />
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={homeRef}
      style={{
        scrollBehavior: 'smooth',
        overflowX: 'hidden',
        backgroundColor: '#f0e7db' // Fallback background
      }}
    >
      {loadingState.error && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '20px',
          fontSize: '0.8rem',
          zIndex: 1000
        }}>
          {loadingState.error}
        </div>
      )}
      
      <HeroSection guestName={guestName} />
<GroomSection />
<BrideSection />
<TimeLocationSection />
{/* <LiveStreamingSection /> */}
{/* <GallerySection /> */}

    </div>
  );
}