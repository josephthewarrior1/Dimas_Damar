import { useState, useEffect } from 'react';
import invitationData from "../data/invitationData";

const HeroSection = ({ guestName }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = invitationData.backgroundImage2;
    img.onload = () => {
      setIsLoaded(true);
      setTimeout(() => setIsContentVisible(true), 300);
    };
    img.onerror = () => {
      setIsLoaded(true);
      setIsContentVisible(true);
    };
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
          ? `url(${invitationData.backgroundImage2})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        opacity: isLoaded ? 1 : 0.99,
        transition: "opacity 0.8s ease, background 0.8s ease",
        willChange: "opacity, background"
      }}
    >
      {/* Main Content Container - Fixed Structure */}
      <div 
        style={{ 
          padding: "0 20px",
          width: "100%",
          maxWidth: "500px",
          margin: "0 auto",
          opacity: isContentVisible ? 1 : 0,
          transform: isContentVisible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
          willChange: "opacity, transform",
          zIndex: 1,
          position: "relative",
          boxSizing: "border-box"
        }}
      >
        

        {/* Couple Name */}
        <h1
          style={{
            fontSize: "clamp(100px, 12vw, 120px)",
            margin: "60px 0 16px",
            fontWeight: 600,
            lineHeight: 1.2,
            letterSpacing: "0.5px",
            fontFamily: "'Great Vibes', cursive",
            color: "#ffffff",
            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px"
          }}
        >
          <span>Nathan</span>
          <span>Tia</span>
        </h1>

        {/* Wedding Date */}
        <p
          style={{ 
            fontSize: "clamp(20px, 4vw, 24px)",
            marginBottom: "24px",
            letterSpacing: "1px",
            textShadow: "0 1px 3px rgba(0,0,0,0.5)",
            fontStyle: "italic",
            fontWeight: 300
          }}
        >
          September 1, 2025
        </p>

        {/* Decorative Separator */}
        <div style={{
          width: "80px",
          height: "1px",
          background: "rgba(255,255,255,0.5)",
          margin: "24px auto",
          position: "relative"
        }}>
          <div style={{
            position: "absolute",
            top: "-3px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.8)"
          }}></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;