import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import invitationData from "../data/invitationData";
import { containerVariants, slideUp } from "./animations";
import CountUp from 'react-countup';

const WeddingEventSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [startCount, setStartCount] = useState(false);
  const [daysLeft, setDaysLeft] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    setTimeout(() => setIsLoaded(true), 100);

    // Calculate days until November 9, 2025
    const calculateDaysLeft = () => {
      const weddingDate = new Date(2025, 10, 9); // 10 = November (0-indexed)
      const today = new Date();
      const diffTime = weddingDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysLeft(diffDays > 0 ? diffDays : 0);
    };

    calculateDaysLeft();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      style={{
        position: "relative",
        minHeight: "100vh",
        minHeight: "-webkit-fill-available",
        padding: "60px 20px",
        fontFamily: "'Cormorant Garamond', serif",
        color: "#000000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        overflow: "hidden",
        backgroundColor: "#f9f5f0",
        backgroundImage: isLoaded 
          ? `url(${invitationData.backgroundImage})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: isMobile ? "50% center" : "70% center",
        backgroundRepeat: "no-repeat",
        opacity: isLoaded ? 1 : 0.99,
        transition: "opacity 1s ease-in-out",
        willChange: "opacity",
      }}
    >

      {/* Top Left Ornament */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "90px",
        height: "auto",
        opacity: 0.8,
        transform: "rotate(180deg)"
      }}>
        <img 
          src={invitationData.ornamenImage1} 
          alt="Ornament" 
          style={{ 
            width: "100%", 
            height: "auto",
          }} 
        />
      </div>

      {/* Top Right Ornament */}
      <div style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "90px",
        height: "auto",
        opacity: 0.8,
      }}>
        <img 
          src={invitationData.ornamenImage1} 
          alt="Ornament" 
          style={{ 
            width: "100%", 
            height: "auto",
          }} 
        />
      </div>

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
        {/* Countdown Timer */}
        <motion.div 
          variants={slideUp}
          style={{
            marginBottom: "40px",
            position: "relative"
          }}
        >
          <div style={{
            fontSize: "5rem",
            fontWeight: "300",
            fontFamily: "'Playfair Display', serif",
            lineHeight: 1,
            color: "#000000",
            marginBottom: "10px"
          }}>
            {startCount && (
              <CountUp
                start={daysLeft + 10}
                end={daysLeft}
                duration={2.5}
                separator=""
                delay={0}
                style={{ fontFamily: "'Playfair Display', serif", color: "#000000" }}
              />
            )}
          </div>
          <p style={{
            fontSize: "1rem",
            letterSpacing: "2px",
            color: "#000000",
            marginBottom: "20px",
            opacity: 0.7
          }}>
            DAYS TO GO
          </p>
          <div style={{
            width: "100px",
            height: "1px",
            backgroundColor: "rgba(0,0,0,0.3)",
            margin: "0 auto"
          }} />
        </motion.div>

        <motion.div variants={slideUp}>
          <p style={{ fontSize: "1rem", lineHeight: 2, fontWeight: 300, opacity: 0.8, color: "#000000" }}>
            Together with joyful hearts and the grace of God, we cordially request the honor of your presence at our wedding celebration:
          </p>
        </motion.div>

        {/* Date */}
        <motion.div variants={slideUp}>
          <p style={{ fontSize: "0.9rem", letterSpacing: "2px", marginBottom: "5px", color: "#000000", opacity: 0.6 }}>
            DATE
          </p>
          <h2 style={{ 
            fontSize: "1.6rem", 
            fontWeight: "500", 
            margin: "10px 0",
            fontFamily: "'Playfair Display', serif",
            color: "#000000"
          }}>
            Sunday, 09 November 2025
          </h2>

          <div style={{ 
            height: "50px",
            width: "2px",
            backgroundColor: "rgba(0,0,0,0.3)",
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
                opacity: 0.8,
              }}
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            />
          </motion.div>
        </motion.div>

        {/* Holy Matrimony */}
        <motion.div variants={slideUp}>
          <p style={{ fontSize: "0.9rem", letterSpacing: "2px", marginBottom: "5px", color: "#000000", opacity: 0.6 }}>
            HOLY MATRIMONY
          </p>
          <p style={{ fontSize: "1.1rem", margin: "10px 0", color: "#000000" }}>
            10.00 WIB
          </p>
          <p style={{ fontSize: "1rem", lineHeight: 1.6, marginBottom: "10px", opacity: 0.8, color: "#000000" }}>
            {invitationData.locationAddress.split('\n')[0]}
          </p>
          <div style={{ 
            height: "50px", 
            width: "2px", 
            backgroundColor: "rgba(0,0,0,0.3)",
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
                opacity: 0.8,
              }}
              whileHover={{ rotate: -15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            />
          </motion.div>
        </motion.div>

        {/* Reception */}
        <motion.div variants={slideUp}>
          <p style={{ fontSize: "0.9rem", letterSpacing: "2px", marginBottom: "5px", color: "#000000", opacity: 0.6 }}>
            WEDDING RECEPTION
          </p>
          <p style={{ fontSize: "1.1rem", margin: "10px 0", color: "#000000" }}>
            12.00 WIB
          </p>
          <p style={{ fontSize: "1rem", lineHeight: 1.6, opacity: 0.8, color: "#000000" }}>
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
              backgroundColor: "transparent",
              border: "1px solid rgba(0,0,0,0.5)",
              borderRadius: "30px",
              fontSize: "0.9rem",
              textDecoration: "none",
              color: "#000000",
              transition: "all 0.3s ease",
              letterSpacing: "1px",
              fontFamily: "'Playfair Display', serif",
              fontWeight: "400"
            }}
            whileHover={{ 
              backgroundColor: "rgba(0,0,0,0.1)",
              scale: 1.05,
              borderColor: "rgba(0,0,0,0.8)"
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