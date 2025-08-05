import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import invitationData from "../data/invitationData";
import { containerVariants, slideUp } from "./animations";

const WeddingEventSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      style={{
        position: "relative",
        minHeight: "100vh",
        padding: "60px 20px",
        fontFamily: "'Cormorant Garamond', serif",
        color: "#2E2E2E",
        background: "linear-gradient(to bottom, #ffffff 0%, #f0f0f0 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        overflow: "hidden",
        transition: "opacity 0.8s ease",
      }}
    >
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
          transition: "opacity 0.6s ease, transform 0.6s ease"
        }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div variants={slideUp}>
          <p style={{ fontSize: "1rem", lineHeight: 2, fontWeight: 300, opacity: 0.9 }}>
            Together with joyful hearts and the grace of God, we cordially request the honor of your presence at our wedding celebration:
          </p>
        </motion.div>

        {/* Date */}
        <motion.div variants={slideUp}>
          <p style={{ fontSize: "0.9rem", letterSpacing: "2px", marginBottom: "5px", color: "#A0A0A0" }}>
            DATE
          </p>
          <h2 style={{ 
            fontSize: "1.6rem", 
            fontWeight: "500", 
            margin: "10px 0",
            fontFamily: "'Playfair Display', serif"
          }}>
            Monday, 1 September 2025
          </h2>

          <div style={{ 
            height: "50px",
            width: "2px",
            backgroundColor: "#C0C0C0",
            margin: "30px auto 0",
            opacity: 0.5
          }} />

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
                opacity: 0.8
              }}
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            />
          </motion.div>
        </motion.div>

        {/* Holy Matrimony */}
        <motion.div variants={slideUp}>
          <p style={{ fontSize: "0.9rem", letterSpacing: "2px", marginBottom: "5px", color: "#A0A0A0" }}>
            HOLY MATRIMONY
          </p>
          <p style={{ fontSize: "1.1rem", margin: "10px 0" }}>
            10.00 WIB
          </p>
          <p style={{ fontSize: "1rem", lineHeight: 1.6, marginBottom: "10px" }}>
            {invitationData.locationAddress.split('\n')[0]}
          </p>
          <div style={{ 
            height: "50px", 
            width: "2px", 
            backgroundColor: "#C0C0C0",
            margin: "30px auto 0",
            opacity: 0.5
          }} />
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
                opacity: 0.8
              }}
              whileHover={{ rotate: -15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            />
          </motion.div>
        </motion.div>

        {/* Reception */}
        <motion.div variants={slideUp}>
          <p style={{ fontSize: "0.9rem", letterSpacing: "2px", marginBottom: "5px", color: "#A0A0A0" }}>
            WEDDING RECEPTION
          </p>
          <p style={{ fontSize: "1.1rem", margin: "10px 0" }}>
            12.00 WIB
          </p>
          <p style={{ fontSize: "1rem", lineHeight: 1.6 }}>
            {invitationData.locationAddress.split('\n')[0]}
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
              backgroundColor: "#BFA980",
              border: "1px solid #BFA980",
              borderRadius: "30px",
              fontSize: "0.9rem",
              textDecoration: "none",
              color: "white",
              transition: "all 0.3s ease",
              letterSpacing: "1px",
              fontFamily: "'Playfair Display', serif",
              fontWeight: "400"
            }}
            whileHover={{ 
              backgroundColor: "#D4C2A6",
              scale: 1.05
            }}
            whileTap={{ scale: 0.95 }}
          >
            See Location
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default WeddingEventSection;
