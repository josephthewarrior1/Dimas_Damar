import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaInstagram } from "react-icons/fa";
import invitationData from "../data/invitationData";
import { containerVariants, slideUp } from "./animations";

const CombinedSections = ({ guestName }) => {
  const [brideImageLoaded, setBrideImageLoaded] = useState(false);
  const [dateTimeImageLoaded, setDateTimeImageLoaded] = useState(false);

  useEffect(() => {
    // Preload bride image
    const brideImg = new Image();
    brideImg.src = invitationData.backgroundImageBride;
    brideImg.onload = () => setBrideImageLoaded(true);

    // Preload date/time image
    const dateImg = new Image();
    dateImg.src = invitationData.dateTimeImage;
    dateImg.onload = () => setDateTimeImageLoaded(true);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section 
        style={{
          position: "relative",
          height: "100vh",
          minHeight: "-webkit-fill-available",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          fontFamily: "'Playfair Display', serif",
          overflow: "hidden",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${invitationData.backgroundImage2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          animation: 'fadeIn 1s ease-out'
        }}
      >
        {/* Content Container */}
        <div 
          style={{ 
            padding: "0 20px", 
            width: "100%",
            animation: 'slideUpFadeIn 0.8s ease-out'
          }}
        >
          <p
            style={{ 
              fontSize: "clamp(14px, 3vw, 18px)", 
              letterSpacing: "2px",
              marginBottom: "10px",
              textShadow: "0 1px 3px rgba(0,0,0,0.3)"
            }}
          >
            We invite you to our Holy Matrimony
          </p>

          <h1
            style={{ 
              fontSize: "clamp(28px, 7vw, 42px)", 
              margin: "12px 0",
              fontWeight: 400,
              lineHeight: 1.2,
              textShadow: "0 2px 4px rgba(0,0,0,0.4)"
            }}
          >
            {invitationData.coupleName}
          </h1>

          <p
            style={{ 
              fontSize: "clamp(14px, 3vw, 16px)",
              marginBottom: "20px",
              textShadow: "0 1px 2px rgba(0,0,0,0.3)"
            }}
          >
            SATURDAY, 19 JULY 2025
          </p>

          {/* Guest Name Section */}
          <div
            style={{ 
              marginTop: "30px",
              padding: "15px 20px",
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: "10px",
              backdropFilter: "blur(5px)",
              WebkitBackdropFilter: "blur(5px)",
              maxWidth: "400px",
              marginLeft: "auto",
              marginRight: "auto",
              border: "1px solid rgba(255,255,255,0.2)",
              animation: 'fadeIn 1s ease-out 0.3s forwards',
              opacity: 0
            }}
          >
            <p style={{ 
              fontSize: "clamp(12px, 2.5vw, 14px)",
              marginBottom: "5px",
              opacity: 0.8
            }}>
              Special for:
            </p>
            <p style={{ 
              fontSize: "clamp(16px, 4vw, 20px)",
              fontWeight: 500
            }}>
              {guestName}
            </p>
          </div>
        </div>

        {/* CSS Animations */}
        <style jsx>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUpFadeIn {
            from { 
              opacity: 0;
              transform: translateY(20px);
            }
            to { 
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </section>

      {/* Groom Section */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-start",
          color: "white",
          padding: "40px 20px",
          textAlign: "left",
          fontFamily: "'Playfair Display', serif",
          overflow: "hidden"
        }}
      >
        {/* Background Image Layer */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
            backgroundImage: `url(${invitationData.backgroundImageGroom})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        />

        {/* Overlay Layer */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
            background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(100,100,100,0.3))"
          }}
        />

        {/* Content */}
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
            GROOM
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
            {invitationData.groom}
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
            FIRST SON OF
          </motion.p>
          
          <motion.p 
            variants={slideUp}
            style={{ 
              marginBottom: '2px', 
              fontSize: '0.95rem' 
            }}
          >
            Mr. Estukurnia Iman
          </motion.p>
          
          <motion.p 
            variants={slideUp}
            style={{ 
              marginBottom: '12px', 
              fontSize: '0.95rem' 
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
              backdropFilter: 'blur(2px)'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaInstagram style={{ width: '16px', height: '16px' }} />
            <span>@teosaneryutanesy</span>
          </motion.div>
        </motion.div>
      </section>

      {/* Bride Section */}
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
          overflow: "hidden"
        }}
      >
        {/* Background Image Layer */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
            backgroundImage: brideImageLoaded
              ? `url(${invitationData.backgroundImageBride})`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: brideImageLoaded ? 1 : 0,
            transition: "opacity 0.8s ease"
          }}
        />

        {/* Overlay Layer */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
            background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(100,100,100,0.3))"
          }}
        />

        {/* Content */}
        <motion.div 
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: '500px',
            opacity: brideImageLoaded ? 1 : 0,
            transform: brideImageLoaded ? "translateY(0)" : "translateY(20px)",
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
              WebkitBackdropFilter: 'blur(2px)',
              border: '1px solid rgba(255,255,255,0.2)',
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

      {/* Time & Location Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        style={{
          position: "relative",
          minHeight: "100vh",
          minHeight: "-webkit-fill-available",
          padding: "60px 20px",
          fontFamily: "'Helvetica Neue', sans-serif",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "left",
          overflow: "hidden",
          backgroundColor: "#f0e7db",
          backgroundImage: dateTimeImageLoaded
            ? `url(${invitationData.dateTimeImage})`
            : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: dateTimeImageLoaded ? 1 : 0.99,
          transition: "opacity 0.8s ease, background 0.8s ease"
        }}
      >
        {/* Dark Overlay */}
        <div
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
            opacity: dateTimeImageLoaded ? 1 : 0,
            transform: dateTimeImageLoaded ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease"
          }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Date Section */}
          <motion.div variants={slideUp}>
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
          <motion.div variants={slideUp}>
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
    </>
  );
};

export default CombinedSections;