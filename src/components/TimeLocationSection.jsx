import invitationData from "../data/invitationData";

const TimeLocationSection = () => {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        padding: "60px 20px",
        fontFamily: "'Helvetica Neue', sans-serif",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "left",
        transform: "translate3d(0,0,0)",
        backfaceVisibility: "hidden",
        perspective: "1000px",
        willChange: "transform",
        overflow: "hidden"
      }}
      className="scroll-section"
    >
      {/* Optimized Background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${invitationData.dateTimeImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1,
          transform: "translate3d(0,0,0)"
        }}
      />

      {/* Optimized Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.35)",
          zIndex: 0,
          transform: "translate3d(0,0,0)"
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "700px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          transform: "translate3d(0,0,0)"
        }}
      >
        {/* Date Section */}
        <div>
          <p style={{ 
            fontSize: "0.8rem", 
            letterSpacing: "2px", 
            opacity: 0.9,
            textShadow: "0 1px 2px rgba(0,0,0,0.3)"
          }}>
            DAY, DATE, TIME
          </p>
          <h2 style={{ 
            fontSize: "2rem", 
            fontWeight: "600", 
            margin: "10px 0",
            textShadow: "0 2px 4px rgba(0,0,0,0.4)"
          }}>
            SATURDAY,<br />19 JULY 2025
          </h2>
          <p style={{ 
            fontSize: "1.1rem", 
            marginBottom: "20px",
            textShadow: "0 1px 2px rgba(0,0,0,0.3)"
          }}>
            10.00 - 12.00 WIB
          </p>
          <a
            href={invitationData.calendarLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "10px 24px",
              border: "1px solid white",
              borderRadius: "25px",
              fontSize: "0.9rem",
              textDecoration: "none",
              color: "white",
              transition: "all 0.3s ease",
              transform: "translate3d(0,0,0)",
              willChange: "transform",
              backdropFilter: "blur(2px)",
              backgroundColor: "rgba(255,255,255,0.1)"
            }}
          >
            Add to Calendar
          </a>
        </div>

        {/* Place Section */}
        <div>
          <p style={{ 
            fontSize: "0.8rem", 
            letterSpacing: "2px", 
            opacity: 0.9,
            textShadow: "0 1px 2px rgba(0,0,0,0.3)"
          }}>
            PLACE
          </p>
          <h3 style={{ 
            fontSize: "1.5rem", 
            fontWeight: "500", 
            lineHeight: 1.4, 
            marginBottom: "15px",
            textShadow: "0 2px 3px rgba(0,0,0,0.4)"
          }}>
            {invitationData.locationAddress.split('\n')[0]}
          </h3>
          <p style={{ 
            fontSize: "1rem", 
            lineHeight: 1.6, 
            opacity: 0.95,
            textShadow: "0 1px 2px rgba(0,0,0,0.2)"
          }}>
            {invitationData.locationAddress
              .split('\n')
              .slice(1)
              .map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
          </p>

          <a
            href={invitationData.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              marginTop: "20px",
              padding: "10px 24px",
              border: "1px solid white",
              borderRadius: "25px",
              fontSize: "0.9rem",
              textDecoration: "none",
              color: "white",
              transition: "all 0.3s ease",
              transform: "translate3d(0,0,0)",
              willChange: "transform",
              backdropFilter: "blur(2px)",
              backgroundColor: "rgba(255,255,255,0.1)"
            }}
          >
            Link Google Maps
          </a>
        </div>
      </div>
    </section>
  );
};

export default TimeLocationSection;