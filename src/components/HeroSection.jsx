import { useState, useEffect } from 'react';
import invitationData from "../data/invitationData";

const HeroSection = ({ guestName }) => {
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
        minheight: "100vh",
        minHeight: "-webkit-fill-available",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "black",
        textAlign: "center",
        fontFamily: "'Cormorant Garamond', serif",
        overflow: "hidden",
        backgroundColor: "#f9f5f0",
        backgroundImage: isLoaded 
          ? `url(${invitationData.backgroundImage})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: isMobile ? "50% center" : "70% center",
        backgroundRepeat: "no-repeat",
        opacity: isLoaded ? 1 : 0.99,
        transition: "opacity 1s ease-in-out",
        willChange: "opacity"
      }}
    >
      {/* Main Content Container */}
      <div 
        style={{ 
          padding: "0 20px",
          width: "100%",
          maxWidth: "500px",
          margin: isMobile ? "0 auto" : "0 auto",
          opacity: isContentVisible ? 1 : 0,
          transform: isContentVisible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
          willChange: "opacity, transform",
          zIndex: 1,
          position: "relative",
          boxSizing: "border-box"
        }}
      >
        {/* Bunga Ornament */}
        <div
          style={{
            marginBottom: "16px",
            display: "flex",
            justifyContent: "center"
          }}
        >
          <img 
            src={invitationData.bunga} 
            alt="Bunga Ornamen" 
            style={{
              height: "60px",
              width: "auto",
              objectFit: "contain"
            }}
          />
        </div>

        {/* Wedding Title */}
        <h2
          style={{
            fontSize: "clamp(16px, 3vw, 20px)",
            fontWeight: 300,
            letterSpacing: "2px",
            marginBottom: "16px",
            textTransform: "uppercase",
            color: "#000000",
          }}
        >
          THE WEDDING OF
        </h2>

        {/* Couple Name */}
        <h1
          style={{
            fontSize: "42px",
            margin: "0 0 20px",
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: "1px",
            fontFamily: "'Great Vibes', cursive",
            color: "#000000",
          }}
        >
          Joshia & Vinny
        </h1>

        {/* Wedding Image Box */}
        <div
          style={{
            width: "250px",
            height: "250px",
            margin: "0 auto 20px",
            overflow: "hidden",
          }}
        >
          <img 
            src={invitationData.weddingImage} 
            alt="Joshia & Vinny" 
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
        </div>

        {/* Bible Verse */}
        <p
          style={{ 
            fontSize: "16px",
            fontStyle: "italic",
            margin: "20px 0",
            lineHeight: 1.4,
            color: "#000000",
            fontWeight: 300,
            maxWidth: "300px",
            marginLeft: "auto",
            marginRight: "auto"
          }}
        >
          "Demikianlah mereka bukan lagi dua, melainkan satu. Karena itu, apa yang telah dipersatukan Allah, tidak boleh diceraikan manusia."
          <br/>
          <span style={{fontSize: "14px"}}>Matius 19:6</span>
        </p>
      </div>
    </section>
  );
};

export default HeroSection;