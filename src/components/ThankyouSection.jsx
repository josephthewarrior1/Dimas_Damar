import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import invitationData from "../data/invitationData";
import { containerVariants, slideUp } from "./animations";

const ThankYouSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice || window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    const img = new Image();
    img.src = invitationData.dateTimeImage;
    img.onload = () => setImageLoaded(true);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      style={{
        position: "relative",
        minHeight: "100vh",
        minHeight: "-webkit-fill-available",
        padding: "60px 20px",
        fontFamily: "'Cormorant Garamond', serif",
        color: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        overflow: "hidden",
        backgroundColor: "white",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: isMobile ? "scroll" : "fixed",
        transition: "opacity 0.8s ease",
        opacity: imageLoaded ? 1 : 0.9,
        backgroundRepeat: "no-repeat",
        transform: "translate3d(0,0,0)",
        backfaceVisibility: "hidden",
        perspective: "1000px"
      }}
    >
      {/* Floral Ornament - Top Left */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '120px',
        height: '120px',
        backgroundImage: `url(${invitationData.bunga})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left top',
      }}></div>

      {/* Floral Ornament - Top Right */}
      <div style={{
        position: 'absolute',
        top: '0',
        right: '0',
        width: '120px',
        height: '120px',
        backgroundImage: `url(${invitationData.bunga})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right top',
        transform: 'rotate(180deg)'
      }}></div>

      <motion.div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "600px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          alignItems: "center",
        }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div variants={slideUp}>
          <h2 style={{ 
            fontSize: "2rem",
            fontWeight: "500",
            marginBottom: "20px",
            letterSpacing: "1px",
            fontFamily: "'Playfair Display', serif",
          }}>
            Thank You
          </h2>
          
          <p style={{
            fontSize: "1rem",
            lineHeight: "1.6",
            marginBottom: "30px",
            maxWidth: "500px",
            fontWeight: 300
          }}>
            Atas kehadiran dan doa restunya, kami mengucapkan terima kasih yang sebesar-besarnya. Semoga kebahagiaan ini menjadi berkah bagi kita semua.
          </p>

          {/* Made by text */}
          <p style={{
            fontSize: "0.8rem",
            color: "rgba(0,0,0,0.6)",
            marginTop: "40px",
            fontStyle: "italic"
          }}>
            Made by Momento • All rights reserved
          </p>
          
          {/* Added icon below the text */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
        <div style={{
            width: "100px", // ✅ diperbesar dari 40px
            height: "100px", // ✅ diperbesar dari 40px
            backgroundImage: `url(${invitationData.icon})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            opacity: 0.7
        }} />
        </div>

        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default ThankYouSection;