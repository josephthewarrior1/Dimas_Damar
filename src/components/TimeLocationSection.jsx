import { motion } from "framer-motion";
import invitationData from "../data/invitationData";

// Consider moving these to a shared animation constants file
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

const TimeLocationSection = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundImage: `url(${invitationData.dateTimeImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "60px 20px",
        fontFamily: "'Helvetica Neue', sans-serif",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "left",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ duration: 1 }}
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.35)",
          zIndex: 0,
        }}
      />

      <motion.div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "700px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
        }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Date Section */}
        <motion.div variants={itemVariants}>
          <p style={{ fontSize: "0.8rem", letterSpacing: "2px", opacity: 0.9 }}>
            DAY, DATE, TIME
          </p>
          <h2 style={{ fontSize: "2rem", fontWeight: "600", margin: "10px 0" }}>
            SATURDAY,<br />19 JULY 2025
          </h2>
          <p style={{ fontSize: "1.1rem", marginBottom: "20px" }}>
            10.00 - 12.00 WIB
          </p>
          <motion.a
            href={invitationData.calendarLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "10px 24px",
              border: "1px solid white",
              borderRadius: "25px",
              fontSize: "0.9rem",
              textDecoration: "none",
              color: "white",
              transition: "all 0.3s ease",
            }}
            whileHover={{ 
              backgroundColor: "rgba(255,255,255,0.2)",
              scale: 1.05
            }}
            whileTap={{ scale: 0.95 }}
          >
            Add to Calendar
          </motion.a>
        </motion.div>

        {/* Place Section */}
        <motion.div variants={itemVariants}>
          <p style={{ fontSize: "0.8rem", letterSpacing: "2px", opacity: 0.9 }}>
            PLACE
          </p>
          <h3 style={{ 
            fontSize: "1.5rem", 
            fontWeight: "500", 
            lineHeight: 1.4, 
            marginBottom: "15px" 
          }}>
            {invitationData.locationAddress.split('\n')[0]}
          </h3>
          <p style={{ fontSize: "1rem", lineHeight: 1.6, opacity: 0.95 }}>
            {invitationData.locationAddress
              .split('\n')
              .slice(1)
              .map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
          </p>

          <motion.a
            href={invitationData.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              marginTop: "20px",
              padding: "10px 24px",
              border: "1px solid white",
              borderRadius: "25px",
              fontSize: "0.9rem",
              textDecoration: "none",
              color: "white",
              transition: "all 0.3s ease",
            }}
            whileHover={{ 
              backgroundColor: "rgba(255,255,255,0.2)",
              scale: 1.05
            }}
            whileTap={{ scale: 0.95 }}
          >
            Link Google Maps
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default TimeLocationSection;