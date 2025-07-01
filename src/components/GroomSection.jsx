import { motion } from "framer-motion";
import { FaInstagram } from "react-icons/fa";
import { useState, useEffect } from "react";
import invitationData from "../data/invitationData";
import { containerVariants, slideUp } from "./animations";

const GroomSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = invitationData.backgroundImageGroom;
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        minHeight: "-webkit-fill-available",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-start",
        color: "white",
        padding: "40px 20px",
        textAlign: "left",
        fontFamily: "'Playfair Display', serif",
        overflow: "hidden",
        backgroundColor: "#f0e7db",
        backgroundImage: imageLoaded
          ? `linear-gradient(to top, rgba(0,0,0,0.7), rgba(100,100,100,0.3)), 
             url(${invitationData.backgroundImageGroom})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: imageLoaded ? 1 : 0.99,
        transition: "opacity 0.8s ease, background 0.8s ease"
      }}
    >
      <motion.div 
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: '500px',
          opacity: imageLoaded ? 1 : 0,
          transform: imageLoaded ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease"
        }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.p 
          variants={slideUp}
          style={{ 
            fontSize: '0.8rem', 
            marginBottom: '4px', 
            opacity: 0.8, 
            letterSpacing: '1.5px',
            textShadow: '0 1px 2px rgba(0,0,0,0.3)'
          }}
        >
          GROOM
        </motion.p>
        
        <motion.h2 
          variants={slideUp}
          style={{ 
            fontSize: '1.75rem', 
            margin: '0 0 12px', 
            fontWeight: '500', 
            letterSpacing: '1px',
            textShadow: '0 2px 3px rgba(0,0,0,0.4)'
          }}
        >
          {invitationData.groom}
        </motion.h2>
        
        <motion.p 
          variants={slideUp}
          style={{ 
            fontSize: '0.8rem', 
            marginBottom: '4px', 
            letterSpacing: '1.5px', 
            opacity: 0.8,
            textShadow: '0 1px 1px rgba(0,0,0,0.2)'
          }}
        >
          FIRST SON OF
        </motion.p>
        
        <motion.p 
          variants={slideUp}
          style={{ 
            marginBottom: '2px', 
            fontSize: '0.95rem',
            textShadow: '0 1px 1px rgba(0,0,0,0.2)'
          }}
        >
          Mr. Estukurnia Iman
        </motion.p>
        
        <motion.p 
          variants={slideUp}
          style={{ 
            marginBottom: '12px', 
            fontSize: '0.95rem',
            textShadow: '0 1px 1px rgba(0,0,0,0.2)'
          }}
        >
          Mrs. Lusy Tantirahaju
        </motion.p>

        <motion.div 
          variants={slideUp}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.85rem',
            backgroundColor: 'rgba(255,255,255,0.1)',
            padding: '6px 12px',
            borderRadius: '20px',
            width: 'fit-content',
            backdropFilter: 'blur(2px)',
            WebkitBackdropFilter: 'blur(2px)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaInstagram style={{ width: '16px', height: '16px' }} />
          <span>@teosaneryutanesy</span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default GroomSection;