import { motion } from "framer-motion";
import { FaYoutube, FaVideo } from "react-icons/fa";
import invitationData from "../data/invitationData";
import { containerVariants, slideUp } from "./animations";

const LiveStreamingSection = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      style={{
        position: "relative",
        minHeight: "100vh",
        padding: "60px 20px",
        fontFamily: "'Helvetica Neue', sans-serif",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        willChange: "transform",
        overflow: "hidden"
      }}
    >
      {/* Background Image */}
      <img
        src={invitationData.backgroundImageLive}
        alt="Live streaming background"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "45% center",
          zIndex: -1
        }}
      />

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
          maxWidth: "800px",
          width: "100%",
        }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div variants={slideUp}>
          <p style={{ 
            fontSize: "1rem", 
            letterSpacing: "2px", 
            opacity: 0.9, 
            marginBottom: "8px" 
          }}>
            LIVE STREAMING
          </p>
          <h5 style={{ 
            fontSize: "0.6rem", 
            fontWeight: "600", 
            margin: "0 0 30px" 
          }}>
            Watch our live Holy Matrimony virtually via Zoom app or Youtube
          </h5>
        </motion.div>

        {/* Streaming Cards Container */}
        <motion.div 
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            marginTop: "40px"
          }}
          variants={slideUp}
        >
          {/* Zoom Card */}
          <motion.div
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(5px)",
              borderRadius: "15px",
              padding: "30px",
              textAlign: "center",
              border: "1px solid rgba(255,255,255,0.2)"
            }}
            whileHover={{ 
              y: -5, 
              boxShadow: "0 10px 25px rgba(0,0,0,0.2)" 
            }}
            transition={{ duration: 0.3 }}
          >
            <div style={{ marginBottom: "20px" }}>
              <FaVideo style={{ 
                width: "60px", 
                height: "60px", 
                marginBottom: "15px", 
                color: "#2D8CFF" 
              }} />
              <h3 style={{ 
                fontSize: "1.5rem", 
                fontWeight: "500", 
                margin: "0 0 10px" 
              }}>
                Zoom Meeting
              </h3>
              <p style={{ 
                fontSize: "0.9rem", 
                opacity: 0.9, 
                marginBottom: "20px" 
              }}>
                Join our intimate virtual gathering via Zoom
              </p>
            </div>
            <motion.a
              href={invitationData.zoomLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                padding: "12px 30px",
                backgroundColor: "#2D8CFF",
                borderRadius: "25px",
                fontSize: "0.95rem",
                textDecoration: "none",
                color: "white",
                fontWeight: "500",
              }}
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: "#1a7ae8" 
              }}
              whileTap={{ scale: 0.95 }}
            >
              Join Zoom Meeting
            </motion.a>
            {invitationData.zoomId && (
              <div style={{ 
                marginTop: "20px", 
                fontSize: "0.85rem" 
              }}>
                <p style={{ margin: "5px 0" }}>Meeting ID: {invitationData.zoomId}</p>
                <p style={{ margin: "5px 0" }}>Password: {invitationData.zoomPassword}</p>
              </div>
            )}
          </motion.div>

          {/* YouTube Card */}
          <motion.div
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(5px)",
              borderRadius: "15px",
              padding: "30px",
              textAlign: "center",
              border: "1px solid rgba(255,255,255,0.2)"
            }}
            whileHover={{ 
              y: -5, 
              boxShadow: "0 10px 25px rgba(0,0,0,0.2)" 
            }}
            transition={{ duration: 0.3 }}
          >
            <div style={{ marginBottom: "20px" }}>
              <FaYoutube style={{ 
                width: "60px", 
                height: "60px", 
                marginBottom: "15px", 
                color: "#FF0000" 
              }} />
              <h3 style={{ 
                fontSize: "1.5rem", 
                fontWeight: "500", 
                margin: "0 0 10px" 
              }}>
                YouTube Live
              </h3>
              <p style={{ 
                fontSize: "0.9rem", 
                opacity: 0.9, 
                marginBottom: "20px" 
              }}>
                Watch our live stream on YouTube
              </p>
            </div>
            <motion.a
              href={invitationData.youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                padding: "12px 30px",
                backgroundColor: "#FF0000",
                borderRadius: "25px",
                fontSize: "0.95rem",
                textDecoration: "none",
                color: "white",
                fontWeight: "500",
              }}
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: "#cc0000" 
              }}
              whileTap={{ scale: 0.95 }}
            >
              Watch on YouTube
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div 
          variants={slideUp}
          style={{
            marginTop: "50px",
            fontSize: "0.9rem",
            opacity: 0.8
          }}
        >
          <p>Streaming will begin 15 minutes before the ceremony</p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default LiveStreamingSection;