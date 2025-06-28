import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from 'react';

export default function IntroScreen({
  coupleName,
  backgroundImage,
  audioUrl,
  onOpenInvitation
}) {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const guestName = params.get("to") || "Tamu Undangan";
  const [isHovered, setIsHovered] = useState(false);

  const capitalized = guestName
    .toLowerCase()
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");

  useEffect(() => {
    const audio = document.getElementById("bg-audio");
    audio?.play().catch(() => {});
  }, []);

  const handleOpenInvitation = () => {
    onOpenInvitation();
    navigate(`/home?to=${encodeURIComponent(guestName)}`);
  };

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "75% center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "white",
        padding: "0 20px",
        fontFamily: "poppins",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          zIndex: 0,
        }}
      ></div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <h4 style={{ 
          letterSpacing: "2px", 
          fontWeight: "300",
          transform: "translateY(-90px)"
        }}>
          HOLY MATRIMONY OF
        </h4>
        
        <h1 style={{ 
          fontSize: "32px", 
          margin: "10px 0",
          transform: "translateY(-105px)"
        }}>
          {coupleName}
        </h1>
        
        <p style={{ 
          margin: "0 0 10px 0",
          fontSize: "14px",
          fontStyle: "italic"
        }}>
          Cordially invite to
        </p>

        <h2 style={{ 
          fontWeight: "500", 
          fontSize: "22px",
          margin: "0 0 5px 0"
        }}>
          {capitalized}
        </h2>

        <p style={{ 
          fontSize: "12px", 
          opacity: 0.8,
          margin: "0",
          fontStyle: "italic"
        }}>
          We apologize for any misspelled name / title
        </p>
        
        <button
          onClick={handleOpenInvitation}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            marginTop: "24px",
            padding: "10px 24px",
            borderRadius: "24px",
            border: "1px solid rgba(255,255,255,0.5)",
            background: isHovered ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.2)",
            color: "white",
            cursor: "pointer",
            fontSize: "16px",
            transition: "all 0.3s ease",
            transform: isHovered ? "scale(1.05)" : "scale(1)",
            fontWeight: "500",
            backdropFilter: "blur(4px)"
          }}
        >
          Open Invitation
        </button>
      </div>

      <audio id="bg-audio" src={audioUrl} loop autoPlay />
    </div>
  );
}