import { useEffect } from "react";
import invitationData from "../data/invitationData";

const SaveTheDateSection = () => {
  useEffect(() => {
    // Inject CSS media query untuk berbagai ukuran layar
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
      /* Default untuk mobile - gambar sedang */
      .date-background {
        width: 200px !important;
        top: 40px !important;
        right: 15px !important;
      }
      
      /* HP sangat kecil */
      @media (max-width: 320px) {
        .date-background {
          width: 160px !important;
          top: 30px !important;
          right: 10px !important;
        }
      }
      
      /* HP medium */
      @media (min-width: 321px) and (max-width: 375px) {
        .date-background {
          width: 180px !important;
          top: 35px !important;
          right: 12px !important;
        }
      }
      
      /* Tablet */
      @media (min-width: 376px) and (max-width: 768px) {
        .date-background {
          width: 220px !important;
          top: 50px !important;
          right: 25px !important;
        }
      }
      
      /* PC kecil */
      @media (min-width: 769px) and (max-width: 1024px) {
        .date-background {
          width: 180px !important;
          top: 60px !important;
          right: 40px !important;
        }
      }
      
      /* PC medium */
      @media (min-width: 1025px) and (max-width: 1440px) {
        .date-background {
          width: 150px !important;
          top: 70px !important;
          right: 60px !important;
        }
      }
      
      /* PC besar */
      @media (min-width: 1441px) {
        .date-background {
          width: 180px !important;
          top: 60px !important;
          right: 30px !important;
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
          right: "15px",
          width: "200px",
          height: "auto",
          zIndex: 3,
          transition: "all 0.3s ease-in-out",
        }}
      />
    </section>
  );
};

export default SaveTheDateSection;