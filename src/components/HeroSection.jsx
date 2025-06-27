import { motion } from "framer-motion";
import invitationData from "../data/invitationData";

// Animation variants (you might want to move these to a separate file if reused)
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

const HeroSection = () => {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundImage: `url(${invitationData.backgroundImage2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        padding: "0 20px",
        textAlign: "center",
        fontFamily: "'Playfair Display', serif"
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 1 }}
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.25)",
          zIndex: 0,
        }}
      />

      <motion.div 
        style={{ position: "relative", zIndex: 1 }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p 
          variants={itemVariants} 
          style={{ 
            marginBottom: '24px', 
            fontSize: '1rem', 
            letterSpacing: '2px' 
          }}
        >
          We invite you to our Holy Matrimony<br />Event
        </motion.p>

        <motion.h1 
          variants={itemVariants}
          style={{ 
            fontSize: '2rem', 
            margin: '12px 0', 
            fontWeight: 'normal', 
            letterSpacing: '1px' 
          }}
        >
          {invitationData.coupleName}
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          style={{ 
            fontSize: '0.95rem', 
            marginTop: '10px', 
            letterSpacing: '1px' 
          }}
        >
          SATURDAY, 19 JULY 2025
        </motion.p>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;