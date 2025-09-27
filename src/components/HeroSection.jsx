import { useState, useEffect } from "react";
import invitationData from "../data/invitationData";

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    invitationData.weddingImage,
    invitationData.weddingImage1,
    invitationData.weddingImage2,
  ];

  // Cek device
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Ganti gambar tiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        backgroundImage: `url(${images[currentImageIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        overflow: "hidden",
        transition: "background-image 1s ease-in-out",
      }}
    >
      {/* Overlay gradient bawah */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "50%",
          background: "linear-gradient(to top, white 25%, transparent 100%)",
          zIndex: 1,
        }}
      />

      {/* Text kecil atas kanan */}
      <div
        style={{
          position: "absolute",
          top: isMobile ? "15px" : "30px",
          right: isMobile ? "15px" : "40px",
          zIndex: 3,
          textAlign: "right",
          maxWidth: isMobile ? "60%" : "40%",
        }}
      >
        <p
          style={{
            fontSize: isMobile ? "12px" : "18px",
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            color: "white",
            textShadow: "0 2px 6px rgba(0,0,0,0.5)",
            margin: 0,
          }}
        >
          You're Cordially Invited <br />
          to the Wedding of
        </p>
      </div>

      {/* Gambar tulisan pasangan */}
      <div
        style={{
          position: "absolute",
          bottom: isMobile ? "20px" : "40px",
          right: isMobile ? "20px" : "60px",
          zIndex: 3,
        }}
      >
        <img
          src={invitationData.tulisan}
          alt="Couple Names"
          style={{
            width: isMobile ? "220px" : "clamp(180px, 15vw, 250px)", // ukuran responsive desktop
            height: "auto",
            transition: "width 0.3s ease-in-out",
          }}
        />
      </div>
    </section>
  );
};

export default HeroSection;
