import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const GreetingSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      style={{
        backgroundColor: "#000",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "3rem 2rem",
        fontFamily: "'Cormorant Garamond', serif",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div style={{ 
        maxWidth: "600px", 
        margin: "0 auto",
        width: "100%"
      }}>
        {/* RJ with special font - now matching IntroScreen */}
        <h1 
          style={{
            fontFamily: "'wano-quin', cursive",
            fontSize: isMobile ? "7rem" : "10rem",
            margin: "0",
            lineHeight: "0.85",
            transform: isMobile ? "translateY(0)" : "translateY(0)",
            fontWeight: "normal",
            letterSpacing: "1px"
          }}
        >
          RJ
        </h1>
        
        {/* Wedding Ceremony */}
        <h2 style={{
          fontSize: "1.2rem",
          letterSpacing: "3px",
          margin: "1rem 0",
          fontWeight: "normal",
          fontStyle: "italic"
        }}>
          WEDDING CEREMONY
        </h2>
        
        {/* Divider - made more subtle */}
        <div style={{
          width: "80px",
          height: "1px",
          backgroundColor: "rgba(255,255,255,0.3)",
          margin: "1.5rem auto",
          opacity: 0.7
        }}></div>
        
        {/* Greeting */}
        <p style={{
          fontSize: "1rem",
          lineHeight: "1.8",
          margin: "1rem 0",
          opacity: 0.9,
          fontWeight: 300
        }}>
          Shallom Bpk/Ibu
          <br /><br />
          By the grace of Jesus Christ, We are pleased <br />
          to announce our wedding to you, <br />
          our family and friends;
        </p>
      </div>
    </motion.section>
  );
};

export default GreetingSection;