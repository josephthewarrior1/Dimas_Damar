import { FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";
import invitationData from "../data/invitationData";

const GroomSection = () => {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        padding: "40px 20px",
        fontFamily: "'Times New Roman', serif",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          background: "#fff",
          borderRadius: "20px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          maxWidth: "400px",
          width: "100%",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        {/* Foto mempelai */}
        <img
          src={invitationData.groomimages}
          alt="Groom"
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
          }}
        />

        <div style={{ padding: "20px" }}>
          {/* Subtitle */}
          <p
            style={{
              fontSize: "14px",
              letterSpacing: "1px",
              textTransform: "uppercase",
              opacity: 0.8,
              marginBottom: "8px",
            }}
          >
            The Groom
          </p>

          {/* Nama */}
          <h1
            style={{
              fontSize: "28px",
              fontWeight: 600,
              margin: "0 0 8px",
            }}
          >
            {invitationData.groomName || "Dimas Bayu Nugroho"}
          </h1>

          {/* Info anak & orang tua */}
          <p
            style={{
              fontSize: "16px",
              marginBottom: "20px",
              opacity: 0.8,
              lineHeight: "1.6",
            }}
          >
            Anak ke-1 dari pasangan <br />
            {invitationData.groomFather || "Alm. Suparno"} &{" "}
            {invitationData.groomMother || "Ina Maria Kristanti"}
          </p>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/dimasksp/"
            target="_blank"
            rel="noopener noreferrer"
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
              transition: "all 0.3s ease",
            }}
          >
            <FaInstagram /> dimasksp
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default GroomSection;
