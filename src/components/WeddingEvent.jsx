import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import invitationData from "../data/invitationData";
import { containerVariants, slideUp } from "./animations";

const WeddingEventSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    setTimeout(() => setIsLoaded(true), 100);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      style={{
        position: "relative",
        minHeight: "100vh",
        minHeight: "-webkit-fill-available",
        padding: "60px 20px 0",
        fontFamily: "'Cormorant Garamond', serif",
        color: "#000000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        textAlign: "center",
        overflow: "hidden",
        backgroundColor: "#ffffff",
        opacity: isLoaded ? 1 : 0.99,
        transition: "opacity 1s ease-in-out",
        willChange: "opacity",
      }}
    >
      {/* Top Left Ornament */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "90px",
          height: "auto",
          opacity: 0.8,
          transform: "rotate(180deg)",
        }}
      >
        <img
          src={invitationData.ornamenImage1}
          alt="Ornament"
          style={{ width: "100%", height: "auto" }}
        />
      </div>

      {/* Top Right Ornament */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "90px",
          height: "auto",
          opacity: 0.8,
        }}
      >
        <img
          src={invitationData.ornamenImage1}
          alt="Ornament"
          style={{ width: "100%", height: "auto" }}
        />
      </div>

      <motion.div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "600px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Header */}
        <motion.div variants={slideUp}>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: 700,
              letterSpacing: "2px",
              marginBottom: "10px",
              color: "#000000",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            DETAILS
          </h1>
        </motion.div>

        {/* Date */}
        <motion.div variants={slideUp}>
          <p
            style={{
              fontSize: "0.9rem",
              letterSpacing: "2px",
              marginBottom: "5px",
              color: "#000000",
              opacity: 0.6,
            }}
          >
            DATE
          </p>
          <h2
            style={{
              fontSize: "1.6rem",
              fontWeight: "500",
              margin: "10px 0",
              fontFamily: "'Playfair Display', serif",
              color: "#000000",
            }}
          >
            Sabtu, 29 November 2025
          </h2>

          <div
            style={{
              height: "50px",
              width: "2px",
              backgroundColor: "rgba(0,0,0,0.3)",
              margin: "30px auto 0",
              opacity: 0.5,
            }}
          />

          <motion.div
            style={{ margin: "20px auto 0", width: "60px", height: "60px" }}
            variants={slideUp}
          >
            <motion.img
              src={invitationData.cincin}
              alt="Wedding Ring"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                opacity: 0.8,
              }}
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            />
          </motion.div>
        </motion.div>

        {/* Holy Matrimony */}
        <motion.div variants={slideUp}>
          <p
            style={{
              fontSize: "0.9rem",
              letterSpacing: "2px",
              marginBottom: "5px",
              color: "#000000",
              opacity: 0.6,
            }}
          >
            PEMBERKATAN
          </p>
          <p style={{ fontSize: "1.1rem", margin: "10px 0", color: "#000000" }}>
            10:00 - 12:00 WIB
          </p>

          <div
            style={{
              height: "50px",
              width: "2px",
              backgroundColor: "rgba(0,0,0,0.3)",
              margin: "30px auto 0",
              opacity: 0.5,
            }}
          />

          <motion.div
            style={{ margin: "20px auto 0", width: "60px", height: "60px" }}
            variants={slideUp}
          >
            <motion.img
              src={invitationData.gelas}
              alt="Wedding Glass"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                opacity: 0.8,
              }}
              whileHover={{ rotate: -15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            />
          </motion.div>
        </motion.div>

        {/* Reception */}
        <motion.div variants={slideUp}>
          <p
            style={{
              fontSize: "0.9rem",
              letterSpacing: "2px",
              marginBottom: "5px",
              color: "#000000",
              opacity: 0.6,
            }}
          >
            RESEPSI
          </p>
          <p style={{ fontSize: "1.1rem", margin: "10px 0", color: "#000000" }}>
            12:30 - 14:00 WIB
          </p>
        </motion.div>

        {/* Location Info */}
        <motion.div variants={slideUp} style={{ marginTop: "20px" }}>
          <p
            style={{
              fontSize: "1.1rem",
              fontWeight: 500,
              color: "#000000",
              marginBottom: "5px",
            }}
          >
            Gedung Abdi Praja Kecamatan Taman
          </p>
          <p
            style={{
              fontSize: "0.95rem",
              fontStyle: "italic",
              color: "#000000",
              opacity: 0.7,
              lineHeight: 1.5,
              marginBottom: "5px",
            }}
          >
            Jl. Taman Praja No.99, Pandean, Kec. Taman, <br />
            Kota Madiun, Jawa Timur 63137
          </p>
        </motion.div>

        {/* Button */}
        <motion.div variants={slideUp} style={{ marginTop: "30px" }}>
          <motion.a
            href={invitationData.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "12px 30px",
              backgroundColor: "transparent",
              border: "1px solid rgba(0,0,0,0.5)",
              borderRadius: "30px",
              fontSize: "0.9rem",
              textDecoration: "none",
              color: "#000000",
              transition: "all 0.3s ease",
              letterSpacing: "1px",
              fontFamily: "'Playfair Display', serif",
              fontWeight: "400",
            }}
            whileHover={{
              backgroundColor: "rgba(0,0,0,0.1)",
              scale: 1.05,
              borderColor: "rgba(0,0,0,0.8)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            See Location
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Wedding Image at Bottom */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "600px",
          marginTop: "50px",
          overflow: "hidden",
          borderBottomLeftRadius: "20px",
          borderBottomRightRadius: "20px",
        }}
      >
        {/* Fade Overlay on top of image */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "120px",
            background:
              "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)",
            zIndex: 2,
          }}
        />
        <img
          src={invitationData.weddingImage1}
          alt="Wedding"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            borderBottomLeftRadius: "20px",
            borderBottomRightRadius: "20px",
          }}
        />
      </div>
    </motion.section>
  );
};

export default WeddingEventSection;
