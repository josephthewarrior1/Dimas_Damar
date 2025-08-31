import { motion } from "framer-motion";
import { FaInstagram, FaHeart } from "react-icons/fa";
import invitationData from "../data/invitationData";
import { containerVariants, slideUp, fadeIn, slideInLeft } from "./animations";
import { useEffect, useState } from "react";

const BrideSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        padding: "40px 20px",
        textAlign: "center",
        fontFamily: "'Playfair Display', serif",
        willChange: "transform",
        overflow: "hidden",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    >
      {/* Background dengan efek blur */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -2,
          background: `url(${invitationData.backgroundImageBride}) center/cover no-repeat`,
          filter: "blur(2px)",
        }}
      />

      {/* Overlay gradient */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)",
          zIndex: -1,
        }}
      />

      {/* Ornamen bunga */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          fontSize: "5rem",
          color: "rgba(255,255,255,0.1)",
          zIndex: 0,
          rotate: "-15deg",
        }}
      >
        ❀
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.1, y: 0 }}
        transition={{ delay: 0.7, duration: 1 }}
        style={{
          position: "absolute",
          bottom: "15%",
          right: "5%",
          fontSize: "5rem",
          color: "rgba(255,255,255,0.1)",
          zIndex: 0,
          rotate: "15deg",
        }}
      >
        ❀
      </motion.div>

      {/* Konten utama, selalu column */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2rem",
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        {/* Foto mempelai - Animasi dari kiri */}
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            position: "relative",
            width: isMobile ? "280px" : "350px",
            height: isMobile ? "280px" : "350px",
            overflow: "hidden",
            zIndex: 1,
          }}
        >
          <img
            src={invitationData.brideimages}
            alt="Bride"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "1rem",
              textAlign: "center",
            }}
          >
          </div>
        </motion.div>

        {/* Teks deskripsi */}
        <motion.div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "600px",
            textAlign: "center",
          }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeIn}>
            <h2
              style={{
                fontSize: isMobile ? "2.5rem" : "3.5rem",
                margin: "0 0 1rem",
                fontWeight: "600",
                letterSpacing: "1px",
                lineHeight: "1.1",
                color: "white",
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                position: "relative",
                display: "inline-block",
              }}
            >
              {invitationData.bride || "SHERIN ANGELA"}
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2, type: "spring" }}
                style={{
                  position: "absolute",
                  right: "-30px",
                  top: "10px",
                  color: "#ff6b6b",
                  fontSize: "1.5rem",
                }}
              >
              </motion.span>
            </h2>
          </motion.div>

          <motion.div
            variants={slideUp}
            style={{
              marginBottom: "1.5rem",
              textAlign: "center",
              position: "relative",
            }}
          >
            <p
              style={{
                fontSize: "0.9rem",
                marginBottom: "0.5rem",
                letterSpacing: "2px",
                textTransform: "uppercase",
                opacity: 0.8,
              }}
            >
              Daughter of
            </p>

            <div
              style={{
                display: "inline-block",
                borderLeft: "2px solid rgba(255,255,255,0.3)",
                paddingLeft: "1rem",
                textAlign: "left",
              }}
            >
              <p
                style={{
                  margin: "0.5rem 0",
                  fontSize: "1.1rem",
                  fontWeight: "500",
                }}
              >
                Mr. Robertus Santoso
              </p>
              <p
                style={{
                  margin: "0.5rem 0",
                  fontSize: "1.1rem",
                  fontWeight: "500",
                }}
              >
                Mrs. Maria Wijaya
              </p>
            </div>
          </motion.div>

          <motion.a
            href="https://www.instagram.com/angelaylnd/"
            target="_blank"
            rel="noopener noreferrer"
            variants={slideUp}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "1rem",
              backgroundColor: "rgba(255,255,255,0.15)",
              padding: "12px 24px",
              borderRadius: "30px",
              backdropFilter: "blur(5px)",
              marginTop: "1rem",
              color: "white",
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.2)",
              transition: "all 0.3s ease",
            }}
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(255,255,255,0.25)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <FaInstagram style={{ width: "20px", height: "20px" }} />
            <span style={{ fontWeight: "500" }}>@Yoandangel</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default BrideSection;