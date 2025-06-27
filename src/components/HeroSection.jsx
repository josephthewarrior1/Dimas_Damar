import { motion } from "framer-motion";
import invitationData from "../data/invitationData";
import { containerVariants, slideUp } from "./animations";

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
        willChange: "transform"
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ padding: "0 20px" }}
      >
        <motion.p
          variants={slideUp}
          style={{ fontSize: "clamp(14px, 3vw, 18px)", letterSpacing: "2px" }}
        >
          We invite you to our Holy Matrimony
        </motion.p>

        <motion.h1
          variants={slideUp}
          style={{ 
            fontSize: "clamp(28px, 7vw, 42px)", 
            margin: "12px 0",
            fontWeight: 400
          }}
        >
          {invitationData.coupleName}
        </motion.h1>

        <motion.p
          variants={slideUp}
          style={{ fontSize: "clamp(14px, 3vw, 16px)" }}
        >
          SATURDAY, 19 JULY 2025
        </motion.p>
      </motion.div>
    </section>
  );
};

export default HeroSection;