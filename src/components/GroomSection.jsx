import { FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import invitationData from "../data/invitationData";

const GroomSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -5, y: 60 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      y: 0,
      transition: {
        duration: 1.1,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <section
      ref={ref}
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff", // tetap putih seperti semula
        padding: "40px 20px",
        fontFamily: "'Times New Roman', serif",
      }}
    >
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        whileHover={{
          scale: 1.03,
          boxShadow: "0 12px 25px rgba(0,0,0,0.15)",
        }}
        style={{
          background: "#fff",
          borderRadius: "24px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          maxWidth: "400px",
          width: "100%",
          textAlign: "center",
          overflow: "hidden",
          transformOrigin: "center bottom",
          transition: "box-shadow 0.3s ease, transform 0.3s ease",
        }}
      >
        {/* Foto mempelai */}
        <motion.img
          src={invitationData.groomimages}
          alt="Groom"
          initial={{ scale: 1.1 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
            borderTopLeftRadius: "24px",
            borderTopRightRadius: "24px",
          }}
        />

        <div style={{ padding: "20px" }}>
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 0.8, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            style={{
              fontSize: "14px",
              letterSpacing: "1px",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            The Groom
          </motion.p>

          {/* Nama */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            style={{
              fontSize: "28px",
              fontWeight: 600,
              margin: "0 0 8px",
            }}
          >
            {invitationData.groomName || "Dimas Bayu Nugroho"}
          </motion.h1>

          {/* Info anak & orang tua */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 0.8, y: 0 } : {}}
            transition={{ delay: 0.8 }}
            style={{
              fontSize: "16px",
              marginBottom: "20px",
              lineHeight: "1.6",
            }}
          >
            Anak ke-1 dari pasangan <br />
            {invitationData.groomFather || "Alm. Suparno"} &{" "}
            {invitationData.groomMother || "Ina Maria Kristanti"}
          </motion.p>

          {/* Instagram */}
          <motion.a
            href="https://www.instagram.com/dimasksp/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1 }}
            whileHover={{
              scale: 1.05,
              backgroundColor: "#eaeaea",
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "14px",
              textDecoration: "none",
              color: "#000",
              background: "#f5f5f5",
              padding: "10px 18px",
              borderRadius: "30px",
            }}
          >
            <FaInstagram /> dimasksp
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};

export default GroomSection;
