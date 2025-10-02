import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import invitationData from '../data/invitationData';

export default function IntroScreen({ onOpenInvitation, guestName: guestNameProp }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [guestName, setGuestName] = useState(guestNameProp || 'Nama Tamu');
  const [params] = useSearchParams();
  const audioRef = useRef(null);

  const fullParam = params.get('to') || '';

  // Fungsi untuk decode nama dari parameter
  const decodeGuestName = (param) => {
    if (!param) return 'Nama Tamu';
    const decoded = decodeURIComponent(param);
    const name = decoded
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    return name;
  };

  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.loop = true;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          document.addEventListener('click', function handler() {
            audioRef.current.play();
            document.removeEventListener('click', handler);
          });
        });
      }
    }
  };

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    let nameFromParam = decodeGuestName(fullParam);

    // Cek juga hash kalau query string kosong
    if (!nameFromParam || nameFromParam === 'Nama Tamu') {
      const hash = window.location.hash; // "#to=kevin"
      if (hash.startsWith("#to=")) {
        const hashName = hash.replace("#to=", "");
        nameFromParam = decodeGuestName(hashName);
      }
    }

    setGuestName(nameFromParam || 'Nama Tamu');
  }, [fullParam]);

  const capitalized = guestName
    .toLowerCase()
    .split(' ')
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');

  const handleOpenInvitation = () => {
    setIsLoading(true);
    playMusic();
    setTimeout(() => {
      onOpenInvitation();
    }, 2000);
  };

  return (
    <motion.div
      key="intro-content"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      style={{
        position: 'absolute',
        inset: 0,
        height: '100vh',
        backgroundImage: `url(${invitationData.cover})`,
        backgroundSize: 'cover',
        backgroundPosition: '-2% center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'center',
        color: 'white',
        padding: '0 20px',
        fontFamily: 'poppins',
        overflow: 'hidden',
        zIndex: 10
      }}
    >
      <audio ref={audioRef} src="/assets/music.mp3" preload="auto" />

      {/* Overlay gelap */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.35)',
          zIndex: 0
        }}
      />

      {/* Atas */}
      <div style={{ position: 'relative', zIndex: 1, marginTop: '30px' }}>
        <p style={{
          fontSize: isMobile ? '14px' : '16px',
          marginBottom: '6px',
          fontWeight: '300'
        }}>The Wedding of</p>
        <h1 style={{
          fontSize: isMobile ? '36px' : '48px',
          fontWeight: '600',
          letterSpacing: '1px',
          margin: '0',
          fontFamily: "'Playfair Display', serif",
          lineHeight: '1.2'
        }}>
          DIMAS<br />&amp; DAMAR
        </h1>
      </div>

      {/* Bawah */}
      <div style={{ position: 'relative', zIndex: 1, marginBottom: isMobile ? '80px' : '100px' }}>
        <h2 style={{
          fontSize: '14px',
          fontWeight: '300',
          margin: '0 0 5px',
          fontStyle: 'italic'
        }}>Dear</h2>
        <h2 style={{
          fontSize: '18px',
          fontWeight: '500',
          margin: '0 0 20px'
        }}>{capitalized}</h2>

        <motion.button
          onClick={handleOpenInvitation}
          disabled={isLoading}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: '12px 30px',
            borderRadius: '4px',
            border: '1px solid rgba(255,255,255,0.5)',
            background: 'rgba(255,255,255,0.1)',
            color: 'white',
            cursor: isLoading ? 'default' : 'pointer',
            fontSize: '13px',
            fontWeight: '500',
            minWidth: '180px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            backdropFilter: 'blur(4px)',
            opacity: isLoading ? 0.7 : 1
          }}
        >
          {isLoading ? (
            <div style={{
              display: 'inline-block',
              width: '18px',
              height: '18px',
              border: '2px solid rgba(255,255,255,0.3)',
              borderRadius: '50%',
              borderTopColor: 'white',
              animation: 'spin 1s linear infinite'
            }}></div>
          ) : 'OPEN INVITATION'}
        </motion.button>
      </div>

      <style>{`
        @keyframes spin { 
          to { transform: rotate(360deg); } 
        }
      `}</style>
    </motion.div>
  );
}
