import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { db } from '../config/firebaseConfig';
import { ref, query, orderByChild, equalTo, onValue } from 'firebase/database';
import invitationData from '../data/invitationData';

export default function IntroScreen({ onOpenInvitation, guestName: guestNameProp }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [guestName, setGuestName] = useState(guestNameProp || "Tamu Undangan");
  const [params] = useSearchParams();
  const audioRef = useRef(null);

  const fullParam = params.get("to") || "";
  const [coupleId, guestCode] = fullParam.split('_');

  // Fungsi untuk memutar musik
  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.loop = true;
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Autoplay prevented:", error);
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
    if (!coupleId || !guestCode) return;
    const guestRef = query(
      ref(db, `couples/${coupleId}/guests`),
      orderByChild('code'),
      equalTo(guestCode)
    );
    const unsubscribe = onValue(guestRef, (snapshot) => {
      if (snapshot.exists()) {
        const guests = snapshot.val();
        const [_, guestData] = Object.entries(guests)[0];
        setGuestName(guestData.name || "Tamu Undangan");
      }
    });
    return () => unsubscribe();
  }, [coupleId, guestCode]);

  const capitalized = guestName
    .toLowerCase()
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");

  const handleOpenInvitation = () => {
    setIsLoading(true);
    setTimeout(() => {
      playMusic();
    }, 5000);
    setTimeout(() => onOpenInvitation(), 5000);
  };

  return (
    <motion.div
      key="intro-content"
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{
        position: "absolute",
        inset: 0,
        height: "100vh",
        backgroundImage: `url(${invitationData.backgroundImage2})`,
        backgroundSize: "cover",
        backgroundPosition: isMobile ? "50% center" : "50% center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "white",
        padding: "0 20px",
        fontFamily: "poppins",
        overflow: "hidden",
        zIndex: 10
      }}
    >
      {/* Elemen audio tersembunyi */}
      <audio ref={audioRef} src="/public/assets/music.mp3" preload="auto" />
      
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          zIndex: 0,
        }}
      />
      <div style={{ 
        position: "relative", 
        zIndex: 1, 
        maxWidth: "600px",
        transform: "translateY(80px)" // geser turun semua tulisan
      }}>
        <div style={{ marginBottom: "10px" }}>
          <h2 style={{
            fontSize: isMobile ? "200px" : "200px",
            fontWeight: "normal",
            margin: "0",
            fontFamily: "'wano-quin', cursive",
            lineHeight: "0.8"
          }}>
            JV
          </h2>
        </div>
        <div>
          <h2 style={{
            fontSize: "16px",
            fontWeight: "300",
            margin: "10px 0 5px",
            fontStyle: "italic"
          }}>
            Dear
          </h2>
          <h2 style={{
            fontSize: "20px",
            fontWeight: "500",
            margin: "0 0 15px"
          }}>
            {capitalized}
          </h2>
        </div>
        <motion.button
          onClick={handleOpenInvitation}
          disabled={isLoading}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: "10px 25px",
            borderRadius: "4px",
            border: "1px solid rgba(255,255,255,0.5)",
            background: "transparent",
            color: "white",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "15px auto 0",
            backdropFilter: "blur(4px)",
            minWidth: "180px",
            textTransform: "uppercase",
            letterSpacing: "1px",
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
              animation: 'spin 1s linear infinite',
            }}></div>
          ) : (
            'OPEN INVITATION'
          )}
        </motion.button>
      </div>
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </motion.div>
  );
}
