import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import invitationData from "../data/invitationData";
import { containerVariants, slideUp } from "./animations";

const ThankYouSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      setIsMobile(isMobileDevice || window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    if (invitationData.thanks) {
      const img = new Image();
      img.src = invitationData.thanks;
      img.onload = () => setImageLoaded(true);
    } else {
      setImageLoaded(true);
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
        minHeight: "150vh",
        minHeight: "-webkit-fill-available",
        padding: "140px 20px",
        fontFamily: "'Cormorant Garamond', serif",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      {/* Background Image */}
      {invitationData.thanks ? (
        <motion.img
          src={invitationData.thanks}
          alt="Background"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isMobile ? "100%" : "100%",
            height: isMobile ? "100%" : "100%",
            objectFit: "cover",
            objectPosition: "center",
            opacity: imageLoaded ? 1 : 0,
            transition: "opacity 0.8s ease",
            zIndex: 0,
            minWidth: "100%",
            minHeight: "100%",
            maxWidth: "none",
            ...(isMobile ? {} : {
              width: "100%",
              height: "auto",
              minHeight: "100%"
            })
          }}
          onLoad={() => setImageLoaded(true)}
        />
      ) : (
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "#f0f0f0",
            zIndex: 0,
          }}
        />
      )}

      {/* Overlay gelap seluruh layar */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.4)",
          zIndex: 1,
        }}
      />

      {/* Gradient hitam di bagian bawah */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "35%", // tinggi gradient bawah
          background: "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))",
          zIndex: 2,
        }}
      />

      {/* Konten Utama */}
      <motion.div
        style={{
          position: "relative",
          zIndex: 3,
          maxWidth: "700px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: "center",
          transform: "translateY(150px)",
          marginBottom: "60px", // jarak tambahan agar tidak nabrak footer
        }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div variants={slideUp}>
          <p
            style={{
              fontSize: isMobile ? "1rem" : "1.2rem",
              lineHeight: "1.6",
              marginBottom: "10px",
              fontWeight: 300,
              textShadow: "0 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            Our happiness will be complete with your presence and blessing in
            this celebration of love. Thank you for your kind wishes, prayers,
            love, and attention given.
          </p>

          <p
            style={{
              fontSize: isMobile ? "1rem" : "1.2rem",
              marginTop: "20px",
              fontWeight: 500,
              textShadow: "0 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            See you on our wedding day!
          </p>

          <h2
            style={{
              fontSize: isMobile ? "2rem" : "2.8rem",
              fontWeight: "600",
              fontFamily: "'Playfair Display', serif",
              marginTop: "10px",
              textShadow: "0 2px 8px rgba(0,0,0,0.7)",
              letterSpacing: "0.05em",
            }}
          >
            Dimas & Damar
          </h2>
        </motion.div>
      </motion.div>

      {/* Footer Powered by Momento */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          padding: "10px 0 20px",
          background: "rgba(0,0,0,0.6)",
          textAlign: "center",
          color: "white",
          fontSize: "0.75rem",
          letterSpacing: "0.5px",
          zIndex: 4,
        }}
      >
        Powered by Momento
      </div>
    </motion.section>
  );
};

export default ThankYouSection;
