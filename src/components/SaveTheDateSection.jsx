import { useState, useEffect } from 'react';
import invitationData from "../data/invitationData";

const SaveTheDateSection = ({ guestName }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile device (only used for background positioning)
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    // Preload the background image
    const loadImage = async () => {
      const img = new Image();
      img.src = invitationData.weddingImage;
      img.onload = () => {
        setIsLoaded(true);
        setTimeout(() => setIsContentVisible(true), 300);
      };
      img.onerror = () => {
        setIsLoaded(true);
        setIsContentVisible(true);
      };
    };

    loadImage();
  }, []);

  return (
    <section 
      style={{
        position: "relative",
        height: "100vh",
        minHeight: "-webkit-fill-available",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
        fontFamily: "'Cormorant Garamond', serif",
        overflow: "hidden",
        backgroundColor: "#f9f5f0",
        backgroundImage: isLoaded 
          ? `url(${invitationData.weddingImage})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: isMobile ? "58% center" : "70% center",
        backgroundRepeat: "no-repeat",
        opacity: isLoaded ? 1 : 0.99,
        transition: "opacity 1s ease-in-out",
        willChange: "opacity"
      }}
    >
      {/* Overlay */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        zIndex: 0,
      }}></div>

      {/* Main Content Container */}
      <div 
        style={{ 
          padding: "0 20px",
          width: "100%",
          maxWidth: "500px",
          margin: "300px auto 0",
          opacity: isContentVisible ? 1 : 0,
          transform: isContentVisible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
          willChange: "opacity, transform",
          zIndex: 1,
          position: "relative",
          boxSizing: "border-box"
        }}
      >
       

        {/* Save The Date Text */}
        <h1
          style={{
            fontSize: "90px",
            margin: "0 0 16px",
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: "1px",
            
            color: "#ffffff",
            textShadow: "0 2px 8px rgba(0,0,0,0.5)",
          }}
        >
          SAVE<br />THE<br />DATE
        </h1>

      </div>
    </section>
  );
};

export default SaveTheDateSection;