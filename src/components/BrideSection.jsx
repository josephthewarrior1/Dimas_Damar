import { motion } from "framer-motion";
import { FaInstagram } from "react-icons/fa";
import invitationData from "../data/invitationData";
import { containerVariants, slideUp } from "./animations";

const BrideSection = () => {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        color: "white",
        padding: "40px 20px",
        textAlign: "right",
        fontFamily: "'Playfair Display', serif",
        willChange: "transform",
        overflow: "hidden"
      }}
    >
      {/* Background Image */}
      <img
        src={invitationData.backgroundImageBride}
        alt="Bride background"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1
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

      <motion.div 
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: '500px'
        }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.p 
          variants={slideUp}
          style={{ 
            fontSize: '0.8rem', 
            marginBottom: '4px', 
            opacity: 0.8, 
            letterSpacing: '1.5px' 
          }}
        >
          BRIDE
        </motion.p>
        
        <motion.h2 
          variants={slideUp}
          style={{ 
            fontSize: '1.75rem', 
            margin: '0 0 12px', 
            fontWeight: '500', 
            letterSpacing: '1px' 
          }}
        >
          {invitationData.bride}
        </motion.h2>
        
        <motion.p 
          variants={slideUp}
          style={{ 
            fontSize: '0.8rem', 
            marginBottom: '4px', 
            letterSpacing: '1.5px', 
            opacity: 0.8 
          }}
        >
          DAUGHTER OF
        </motion.p>
        
        <motion.p 
          variants={slideUp}
          style={{ 
            marginBottom: '2px', 
            fontSize: '0.95rem' 
          }}
        >
          Mr. Robertus Santoso
        </motion.p>
        
        <motion.p 
          variants={slideUp}
          style={{ 
            marginBottom: '12px', 
            fontSize: '0.95rem' 
          }}
        >
          Mrs. Maria Wijaya
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
            marginLeft: 'auto'
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaInstagram style={{ width: '16px', height: '16px' }} />
          <span>@sherinangelina</span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default BrideSection;