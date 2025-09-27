import { useEffect } from "react";
import invitationData from "../data/invitationData";

const SaveTheDateSection = () => {
  useEffect(() => {
    // Inject CSS media query untuk berbagai ukuran layar
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
      @media (max-width: 375px) {
        .date-background {
          width: 140px !important;
          top: 50px !important;
          right: 15px !important;
        }
      }
      
      @media (max-width: 320px) {
        .date-background {
          width: 120px !important;
          top: 40px !important;
          right: 10px !important;
        }
      }
      
      /* Untuk layar yang lebih besar tetap normal */
      @media (min-width: 376px) {
        .date-background {
          width: 260px !important;
          top: 40px !important;
          right: 20px !important;
        }
      }
    `;
    document.head.appendChild(styleTag);
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        backgroundImage: `url(${invitationData.SaveTheDate})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Overlay gradient atas */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "25%",
          background: "linear-gradient(to bottom, white 40%, transparent 100%)",
          zIndex: 1,
        }}
      />

      {/* Garis elegan di atas */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: "2px",
          backgroundColor: "#aaa",
          borderRadius: "2px",
          zIndex: 2,
        }}
      />

      {/* Gambar tanggal di kanan atas */}
      <img
        src={invitationData.DateBackground}
        alt="Tanggal Pernikahan"
        className="date-background"
        style={{
          position: "absolute",
          top: "40px",
          right: "20px",
          width: "260px",
          height: "auto",
          zIndex: 3,
          // Default style untuk fallback
        }}
      />
    </section>
  );
};

export default SaveTheDateSection;