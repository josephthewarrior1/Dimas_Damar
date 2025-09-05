import { motion } from "framer-motion";
import { FaInstagram } from "react-icons/fa";
import invitationData from "../data/invitationData";
import { useEffect, useState } from "react";

const BrideSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  useEffect(() => {
    // Preload the background image (same as HeroSection)
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
        minHeight: "100vh",
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
        willChange: "opacity",
        padding: "40px 20px"
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
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
        </motion.div>

        {/* Bride Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          style={{
            fontSize: "clamp(16px, 3vw, 20px)",
            fontWeight: 300,
            letterSpacing: "2px",
            marginBottom: "16px",
            textTransform: "uppercase",
            color: "#000000",
          }}
        >
          THE BRIDE
        </motion.h2>

        {/* Bride Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
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
          {invitationData.bride || "Yoanda Angela"}
        </motion.h1>

        {/* Bride Image Container - Diperbaiki untuk menghilangkan efek kotak */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          style={{
            width: "100%",
            maxWidth: "350px",
            height: "auto",
            margin: "0 auto 20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "transparent", // Pastikan background transparan
            border: "none", // Pastikan tidak ada border
            outline: "none", // Pastikan tidak ada outline
          }}
        >
          <img 
            src={invitationData.brideimages} 
            alt="Bride" 
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "400px",
              objectFit: "contain",
              display: "block", // Hindari space bawah pada gambar
              background: "transparent", // Pastikan background transparan
              border: "none", // Pastikan tidak ada border
              outline: "none", // Pastikan tidak ada outline
            }}
            onError={(e) => {
              // Fallback jika gambar gagal dimuat
              e.target.style.display = 'none';
            }}
          />
        </motion.div>

        {/* Parents Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          style={{
            marginBottom: "1.5rem",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "0.9rem",
              marginBottom: "0.5rem",
              letterSpacing: "2px",
              textTransform: "uppercase",
              opacity: 0.8,
              color: "#000000",
            }}
          >
            Daughter of
          </p>

          <div
            style={{
              display: "inline-block",
              borderLeft: "2px solid rgba(0,0,0,0.3)",
              paddingLeft: "1rem",
              textAlign: "left",
            }}
          >
            <p
              style={{
                margin: "0.5rem 0",
                fontSize: "1.1rem",
                fontWeight: "500",
                color: "#000000",
              }}
            >
              Mr. Robertus Santoso
            </p>
            <p
              style={{
                margin: "0.5rem 0",
                fontSize: "1.1rem",
                fontWeight: "500",
                color: "#000000",
              }}
            >
              Mrs. Maria Wijaya
            </p>
          </div>
        </motion.div>

        {/* Instagram Link */}
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          href="https://www.instagram.com/vinny.wijaya/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "1rem",
            backgroundColor: "rgba(0,0,0,0.05)",
            padding: "12px 24px",
            borderRadius: "30px",
            marginTop: "1rem",
            color: "#000000",
            textDecoration: "none",
            border: "1px solid rgba(0,0,0,0.1)",
            transition: "all 0.3s ease",
          }}
          whileHover={{
            scale: 1.05,
            backgroundColor: "rgba(0,0,0,0.1)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <FaInstagram style={{ width: "20px", height: "20px" }} />
          <span style={{ fontWeight: "500" }}>@Vinny.wijaya</span>
        </motion.a>
      </div>
    </section>
  );
};

export default BrideSection;