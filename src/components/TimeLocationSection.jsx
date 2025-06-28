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
        willChange: "transform",
        overflow: "hidden"
      }}
    >
      {/* Background Image */}
      <img
        src={invitationData.dateTimeImage}
        alt="Time and location background"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1
        }}
      />

      {/* Dark Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.35)",
          zIndex: 0,
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
        }}
      >
        {/* Date Section */}
        <div>
          <p style={{ fontSize: "0.8rem", letterSpacing: "2px", opacity: 0.9 }}>
            DAY, DATE, TIME
          </p>
          <h2 style={{ fontSize: "2rem", fontWeight: "600", margin: "10px 0" }}>
            SATURDAY,<br />19 JULY 2025
          </h2>
          <p style={{ fontSize: "1.1rem", marginBottom: "20px" }}>
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
            }}
          >
            Add to Calendar
          </a>
        </div>

        {/* Place Section */}
        <div>
          <p style={{ fontSize: "0.8rem", letterSpacing: "2px", opacity: 0.9 }}>
            PLACE
          </p>
          <h3 style={{ 
            fontSize: "1.5rem", 
            fontWeight: "500", 
            lineHeight: 1.4, 
            marginBottom: "15px" 
          }}>
            {invitationData.locationAddress.split('\n')[0]}
          </h3>
          <p style={{ fontSize: "1rem", lineHeight: 1.6, opacity: 0.95 }}>
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