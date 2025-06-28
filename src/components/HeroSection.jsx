import { useState, useEffect } from 'react';
import invitationData from "../data/invitationData";

const HeroSection = ({ guestName }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Preload the background image
  useEffect(() => {
    const img = new Image();
    img.src = invitationData.backgroundImage2;
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setIsLoaded(true); // Fallback if image fails to load
  }, []);

  return (
    <section 
      style={{
        position: "relative",
        height: "100vh",
        minHeight: "-webkit-fill-available", // Fix mobile viewport height
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
        fontFamily: "'Playfair Display', serif",
        overflow: "hidden",
        backgroundColor: "#f0e7db", // Fallback color (match your theme)
        backgroundImage: isLoaded 
          ? `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${invitationData.backgroundImage2})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        opacity: isLoaded ? 1 : 0.99, // Prevents flash of unstyled content
        transition: "opacity 0.8s ease, background 0.8s ease",
        willChange: "opacity, background"
      }}
    >
      {/* Content Container */}
      <div 
        style={{ 
          padding: "0 20px", 
          width: "100%",
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
          willChange: "opacity, transform"
        }}
      >
        <p
          style={{ 
            fontSize: "clamp(14px, 3vw, 18px)", 
            letterSpacing: "2px",
            marginBottom: "10px",
            textShadow: "0 1px 3px rgba(0,0,0,0.3)"
          }}
        >
          We invite you to our Holy Matrimony
        </p>

        <h1
          style={{ 
            fontSize: "clamp(28px, 7vw, 42px)", 
            margin: "12px 0",
            fontWeight: 400,
            lineHeight: 1.2,
            textShadow: "0 2px 4px rgba(0,0,0,0.4)"
          }}
        >
          {invitationData.coupleName}
        </h1>

        <p
          style={{ 
            fontSize: "clamp(14px, 3vw, 16px)",
            marginBottom: "20px",
            textShadow: "0 1px 2px rgba(0,0,0,0.3)"
          }}
        >
          SATURDAY, 19 JULY 2025
        </p>

        {/* Guest Name Section */}
        <div
          style={{ 
            marginTop: "30px",
            padding: "15px 20px",
            backgroundColor: "rgba(255,255,255,0.1)",
            borderRadius: "10px",
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)", // Safari support
            maxWidth: "400px",
            marginLeft: "auto",
            marginRight: "auto",
            border: "1px solid rgba(255,255,255,0.2)"
          }}
        >
          <p style={{ 
            fontSize: "clamp(12px, 2.5vw, 14px)",
            marginBottom: "5px",
            opacity: 0.8
          }}>
            Special for:
          </p>
          <p style={{ 
            fontSize: "clamp(16px, 4vw, 20px)",
            fontWeight: 500
          }}>
            {guestName}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;