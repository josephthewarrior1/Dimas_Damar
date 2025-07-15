import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import invitationData from "../data/invitationData";
import { containerVariants, slideUp } from "./animations";

const TimeLocationSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Preload background image
    const img = new Image();
    img.src = invitationData.dateTimeImage;
    img.onload = () => setImageLoaded(true);

    const calculateTimeLeft = () => {
      const eventDate = new Date(invitationData.eventDate);
      const currentDate = new Date();
      const difference = eventDate - currentDate;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      style={{
        position: "relative",
        minHeight: "100vh",
        minHeight: "-webkit-fill-available",
        padding: "60px 20px",
        fontFamily: "'Cormorant Garamond', serif",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        overflow: "hidden",
        backgroundColor: "#000",
        backgroundImage: imageLoaded ? `url(${invitationData.dateTimeImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        transition: "opacity 0.8s ease",
        opacity: imageLoaded ? 1 : 0.9
      }}
    >
      {/* Dark Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
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
          alignItems: "center",
        }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Countdown Section */}
        <motion.div variants={slideUp}>
        <h2 style={{ 
        fontSize: "2.8rem", 
        fontWeight: "600", 
        marginBottom: "50px",
        letterSpacing: "2px",
        fontStyle: "normal",
        fontFamily: "'Playfair Display', serif",

        
      }}>
        Save The Date
      </h2>

          
          <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            gap: "10px",
            marginBottom: "40px",
            flexWrap: "wrap"
          }}>
            <div style={{ minWidth: "70px" }}>
              <div style={{ fontSize: "2rem", fontWeight: "500", fontFamily: "'Montserrat', sans-serif" }}>{timeLeft.days}</div>
              <div style={{ fontSize: "0.8rem", opacity: 0.8, letterSpacing: "1px" }}>DAYS</div>
            </div>
            <div style={{ minWidth: "70px" }}>
              <div style={{ fontSize: "2rem", fontWeight: "500", fontFamily: "'Montserrat', sans-serif" }}>{timeLeft.hours}</div>
              <div style={{ fontSize: "0.8rem", opacity: 0.8, letterSpacing: "1px" }}>HOURS</div>
            </div>
            <div style={{ minWidth: "70px" }}>
              <div style={{ fontSize: "2rem", fontWeight: "500", fontFamily: "'Montserrat', sans-serif" }}>{timeLeft.minutes}</div>
              <div style={{ fontSize: "0.8rem", opacity: 0.8, letterSpacing: "1px" }}>MINUTES</div>
            </div>
            <div style={{ minWidth: "70px" }}>
              <div style={{ fontSize: "2rem", fontWeight: "500", fontFamily: "'Montserrat', sans-serif" }}>{timeLeft.seconds}</div>
              <div style={{ fontSize: "0.8rem", opacity: 0.8, letterSpacing: "1px" }}>SECONDS</div>
            </div>
          </div>

          <motion.a
            href={invitationData.calendarLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "12px 30px",
              border: "1px solid white",
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
              backgroundColor: "rgba(255,255,255,0.2)",
              scale: 1.05
            }}
            whileTap={{ scale: 0.95 }}
          >
            Add to Calendar
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default TimeLocationSection;