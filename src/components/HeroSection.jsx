import invitationData from "../data/invitationData";

const HeroSection = ({ guestName }) => {
  return (
    <section 
      style={{
        position: "relative",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
        fontFamily: "'Playfair Display', serif",
        willChange: "transform",
        overflow: "hidden"
      }}
    >
      {/* Background Image */}
      <img
        src={invitationData.backgroundImage2}
        alt="Wedding background"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
          filter: "brightness(0.7)"
        }}
      />

      {/* Content */}
      <div style={{ padding: "0 20px", width: "100%" }}>
        <p
          style={{ 
            fontSize: "clamp(14px, 3vw, 18px)", 
            letterSpacing: "2px",
            marginBottom: "10px"
          }}
        >
          We invite you to our Holy Matrimony
        </p>

        <h1
          style={{ 
            fontSize: "clamp(28px, 7vw, 42px)", 
            margin: "12px 0",
            fontWeight: 400,
            lineHeight: 1.2
          }}
        >
          {invitationData.coupleName}
        </h1>

        <p
          style={{ 
            fontSize: "clamp(14px, 3vw, 16px)",
            marginBottom: "20px"
          }}
        >
          SATURDAY, 19 JULY 2025
        </p>

        {/* Guest Name Section */}
        <div
          style={{ 
            marginTop: "30px",
            padding: "15px 20px",
            backgroundColor: "rgba(255,255,255,0.1)",
            borderRadius: "10px",
            backdropFilter: "blur(5px)",
            maxWidth: "400px",
            marginLeft: "auto",
            marginRight: "auto"
          }}
        >
          <p style={{ 
            fontSize: "clamp(12px, 2.5vw, 14px)",
            marginBottom: "5px",
            opacity: 0.8
          }}>
            Special for:
          </p>
          <p style={{ 
            fontSize: "clamp(16px, 4vw, 20px)",
            fontWeight: 500
          }}>
            {guestName}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;