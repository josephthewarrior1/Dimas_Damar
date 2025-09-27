import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import invitationData from "../data/invitationData";

const GalleryWithScrollAnimation = () => {
  const photos = invitationData.galleryImages;
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const navigateImages = (direction) => {
    if (selectedImageIndex === null) return;
    if (direction === "prev") {
      setSelectedImageIndex((prev) => (prev - 1 + photos.length) % photos.length);
    } else {
      setSelectedImageIndex((prev) => (prev + 1) % photos.length);
    }
  };

  // Keyboard nav
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen) return;
      if (e.key === "ArrowLeft") navigateImages("prev");
      else if (e.key === "ArrowRight") navigateImages("next");
      else if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, selectedImageIndex]);

  return (
    <section
      style={{
        width: "100%",
        padding: "40px 20px",
        background: "#ffffff",
        margin: "0 auto",
        textAlign: "center",
        fontFamily: "'Playfair Display', serif",
        boxSizing: "border-box",
        color: "#000000",
      }}
    >
      {/* Header */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        style={{
          fontSize: "4rem",
          fontWeight: 500,
          marginBottom: "30px",
        }}
      >
        Gallery
      </motion.h2>

      {/* === Grid gallery (layout tidak diubah) === */}
      <motion.div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gridAutoRows: "200px",
          gap: "15px",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
          },
        }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {photos.map((photo, index) => {
          const isLarge = index % 5 === 0; // ukuran grid tetap
          const isTall = index % 7 === 0;

          return (
            <motion.img
              key={index}
              src={photo}
              alt={`Gallery ${index + 1}`}
              variants={{
                hidden: { opacity: 0, scale: 0.85, y: 20 },
                show: { opacity: 1, scale: 1, y: 0 },
              }}
              transition={{ type: "spring", stiffness: 60, damping: 15 }}
              whileHover={{ scale: 1.05 }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "12px",
                cursor: "pointer",
                gridColumn: isLarge ? "span 2" : "span 1",
                gridRow: isTall ? "span 2" : "span 1",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
              onClick={() => handleImageClick(index)}
            />
          );
        })}
      </motion.div>

      {/* Modal */}
      {isModalOpen && selectedImageIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.95)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImages("prev");
              }}
              style={navBtnStyle("left")}
            >
              ❮
            </button>

            <motion.img
              key={selectedImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={photos[selectedImageIndex]}
              alt="Selected"
              style={{
                maxWidth: "100%",
                maxHeight: "90vh",
                borderRadius: "10px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
              }}
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImages("next");
              }}
              style={navBtnStyle("right")}
            >
              ❯
            </button>

            <button
              onClick={closeModal}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "rgba(0,0,0,0.6)",
                border: "none",
                borderRadius: "50%",
                width: "35px",
                height: "35px",
                fontSize: "18px",
                color: "white",
                cursor: "pointer",
              }}
            >
              ×
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

const navBtnStyle = (side) => ({
  position: "absolute",
  [side]: "10px",
  background: "rgba(255,255,255,0.3)",
  border: "none",
  borderRadius: "50%",
  width: "40px",
  height: "40px",
  fontSize: "20px",
  color: "white",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1001,
});

export default GalleryWithScrollAnimation;
