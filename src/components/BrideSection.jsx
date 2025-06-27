import { motion } from "framer-motion";
import { FaInstagram } from "react-icons/fa";
import invitationData from "../data/invitationData";

// Animation variants (remain unchanged)
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeInOut"
    }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const BrideSection = () => {
  return (
    <section // CHANGED: from motion.section to regular section
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundImage: `url(${invitationData.backgroundImageBride})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        color: "white",
        padding: "40px 20px",
        textAlign: "right",
        fontFamily: "'Playfair Display', serif"
      }}
    >
      {/* CHANGED: from motion.div to regular div */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(100,100,100,0.3))",
          zIndex: 0,
        }}
      />

      {/* THIS PART REMAINS EXACTLY THE SAME */}
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
          variants={itemVariants} 
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
          variants={itemVariants} 
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
          variants={itemVariants} 
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
          variants={itemVariants} 
          style={{ 
            marginBottom: '2px', 
            fontSize: '0.95rem' 
          }}
        >
          Mr. Robertus Santoso
        </motion.p>
        
        <motion.p 
          variants={itemVariants} 
          style={{ 
            marginBottom: '12px', 
            fontSize: '0.95rem' 
          }}
        >
          Mrs. Maria Wijaya
        </motion.p>

        <motion.div 
          variants={itemVariants}
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