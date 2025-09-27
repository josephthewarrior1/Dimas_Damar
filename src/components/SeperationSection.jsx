import { motion } from "framer-motion";
import invitationData from "../data/invitationData";

const SeperationSection = () => {
  return (
    <section
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        padding: "40px 20px",
      }}
    >
      <motion.img
        src={invitationData.seperation}
        alt="Seperation"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{
          width: "120px", // kecil aja bro
          height: "auto",
          display: "block",
        }}
      />
    </section>
  );
};

export default SeperationSection;
