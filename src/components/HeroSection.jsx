import { motion } from "framer-motion";
import invitationData from "../data/invitationData";

const HeroSection = () => {
  return (
    <section 
      style={{
        position: "relative",
        height: "100vh",
        background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${invitationData.backgroundImage2}) center/cover no-repeat`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
        fontFamily: "'Playfair Display', serif",
        willChange: "transform" // Optimize for animation
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.15 }}
        style={{ padding: "0 20px" }}
      >
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{ fontSize: "clamp(14px, 3vw, 18px)", letterSpacing: "2px" }}
        >
          We invite you to our Holy Matrimony
        </motion.p>

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ 
            fontSize: "clamp(28px, 7vw, 42px)", 
            margin: "12px 0",
            fontWeight: 400
          }}
        >
          {invitationData.coupleName}
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ fontSize: "clamp(14px, 3vw, 16px)" }}
        >
          SATURDAY, 19 JULY 2025
        </motion.p>
      </motion.div>
    </section>
  );
};

export default HeroSection;