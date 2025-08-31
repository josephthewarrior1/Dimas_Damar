import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import invitationData from "../data/invitationData";
import { containerVariants, slideUp } from "./animations";

const ThankYouSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // cek device
    const checkIfMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      setIsMobile(isMobileDevice || window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    // preload background image
    if (invitationData.backgroundImage2) {
      const img = new Image();
      img.src = invitationData.backgroundImage2;
      img.onload = () => setImageLoaded(true);
    } else {
      setImageLoaded(true); // langsung true kalau gambar tidak ada
    }

    return () => window.removeEventListener("resize", checkIfMobile);
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
      }}
    >
      {/* Background Image */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: invitationData.thanks
            ? `url(${invitationData.thanks})`
            : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundPosition: "40% center",

          backgroundAttachment: isMobile ? "scroll" : "fixed",
          backgroundRepeat: "no-repeat",
          opacity: imageLoaded ? 1 : 0,
          transition: "opacity 0.8s ease",
        }}
      />

      {/* Konten Utama */}
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
          padding: "20px",
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          borderRadius: "12px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
        }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div variants={slideUp}>
          <h2
            style={{
              fontSize: isMobile ? "1.8rem" : "2.4rem",
              fontWeight: "500",
              marginBottom: "20px",
              letterSpacing: "1px",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Thank You
          </h2>

          <p
            style={{
              fontSize: isMobile ? "0.95rem" : "1.05rem",
              lineHeight: "1.6",
              marginBottom: "30px",
              maxWidth: "500px",
              fontWeight: 300,
            }}
          >
            Atas kehadiran dan doa restunya, kami mengucapkan terima kasih yang
            sebesar-besarnya. Semoga kebahagiaan ini menjadi berkah bagi kita
            semua.
          </p>

          {/* Made by text */}
          <p
            style={{
              fontSize: "0.8rem",
              color: "rgba(0,0,0,0.6)",
              marginTop: "40px",
              fontStyle: "italic",
            }}
          >
            Made by ClickNikah • All rights reserved
          </p>

          {/* Icon */}
          <motion.div
            whileHover={{ scale: 1.05, opacity: 0.9 }}
            transition={{ duration: 0.3 }}
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <div
              style={{
                width: "100px",
                height: "100px",
                backgroundImage: `url(${invitationData.icon})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                opacity: 0.75,
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default ThankYouSection;
