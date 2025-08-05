import { motion } from "framer-motion";
import { FaInstagram } from "react-icons/fa";
import invitationData from "../data/invitationData";
import { containerVariants, slideUp } from "./animations";
import { useState, useEffect } from "react";

const GroomSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        padding: "40px 20px",
        textAlign: "center",
        fontFamily: "'Playfair Display', serif",
        willChange: "transform",
        overflow: "hidden",
      }}
    >
      {/* Main Background */}
      <img
        src={invitationData.backgroundImageGroom}
        alt="Groom background"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -2,
        }}
      />

<motion.img
      src={invitationData.backgroundImageGroom}
      alt="Groom center"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        type: "spring",
        stiffness: 50,
        damping: 12,
        delay: 0.3
      }}
      style={{
        position: "absolute",
        width: "370px",
        height: "370px",
        objectFit: "cover",
        objectPosition: "center 10%",
        borderRadius: "8px",
        border: "4px solid white",
        boxShadow: "0 6px 30px rgba(0,0,0,0.4)",
        zIndex: 1,
        top: "16%",
        transform: "translateX(-50%)",
      }}
    />

      {/* Dark Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(100,100,100,0.3))",
          zIndex: 0,
        }}
      />

      {/* TEXT CONTAINER - ONLY THIS PART IS CONDITIONAL */}
      <motion.div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "500px",
          marginTop: isMobile ? "370px" : "450px", // Only this line changes
        }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.p
          variants={slideUp}
          style={{
            fontSize: "1rem",
            marginBottom: "6px",
            opacity: 0.85,
            letterSpacing: "1.8px",
          }}
        >
          GROOM
        </motion.p>

        <motion.h2
          variants={slideUp}
          style={{
            fontSize: "2.25rem",
            margin: "0 0 16px",
            fontWeight: "600",
            letterSpacing: "1px",
          }}
        >
          {invitationData.groom || "TEOSANER YUTANESY IMAN"}
        </motion.h2>

        <motion.p
          variants={slideUp}
          style={{
            fontSize: "1rem",
            marginBottom: "6px",
            letterSpacing: "1.5px",
            opacity: 0.8,
          }}
        >
          SON OF
        </motion.p>

        <motion.div variants={slideUp} style={{ marginBottom: "12px", lineHeight: "1.4" }}>
          <p style={{ margin: "4px 0", fontSize: "1.05rem" }}>Mr. Andreas Yutanesy</p>
          <p style={{ margin: "4px 0", fontSize: "1.05rem" }}>Mrs. Elisabeth Noya</p>
        </motion.div>

        <motion.a
          href="https://www.instagram.com/teosaner" 
          target="_blank"
          rel="noopener noreferrer"
          variants={slideUp}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "1rem",
            backgroundColor: "rgba(255,255,255,0.2)",
            padding: "8px 16px",
            borderRadius: "24px",
            backdropFilter: "blur(4px)",
            marginTop: "12px",
            color: "white",
            textDecoration: "none",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaInstagram style={{ width: "18px", height: "18px" }} />
          <span style={{ fontWeight: "500" }}>NathanaelEriskon</span>
        </motion.a>
      </motion.div>
    </section>
  );
};

export default GroomSection;