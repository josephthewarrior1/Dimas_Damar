import { FaYoutube, FaVideo } from "react-icons/fa";
import invitationData from "../data/invitationData";

const LiveStreamingSection = () => {
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
        textAlign: "center",
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
          backgroundImage: `url(${invitationData.backgroundImageLive})`,
          backgroundSize: "cover",
          backgroundPosition: "45% center",
          zIndex: -1,
          transform: "translate3d(0,0,0)"
        }}
      />

      {/* Optimized Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 0,
          transform: "translate3d(0,0,0)"
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "800px",
          width: "100%",
          transform: "translate3d(0,0,0)"
        }}
      >
        <div>
          <p style={{ 
            fontSize: "1rem", 
            letterSpacing: "2px", 
            opacity: 0.9, 
            marginBottom: "8px",
            textShadow: "0 1px 2px rgba(0,0,0,0.3)"
          }}>
            LIVE STREAMING
          </p>
          <h5 style={{ 
            fontSize: "0.6rem", 
            fontWeight: "600", 
            margin: "0 0 30px",
            textShadow: "0 1px 1px rgba(0,0,0,0.2)"
          }}>
            Watch our live Holy Matrimony virtually via Zoom app or Youtube
          </h5>
        </div>

        {/* Streaming Cards Container */}
        <div 
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            marginTop: "40px"
          }}
        >
          {/* Zoom Card */}
          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(5px)",
              borderRadius: "15px",
              padding: "30px",
              textAlign: "center",
              border: "1px solid rgba(255,255,255,0.2)",
              transform: "translate3d(0,0,0)",
              willChange: "transform"
            }}
          >
            <div style={{ marginBottom: "20px" }}>
              <FaVideo style={{ 
                width: "60px", 
                height: "60px", 
                marginBottom: "15px", 
                color: "#2D8CFF",
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
              }} />
              <h3 style={{ 
                fontSize: "1.5rem", 
                fontWeight: "500", 
                margin: "0 0 10px",
                textShadow: "0 2px 3px rgba(0,0,0,0.4)"
              }}>
                Zoom Meeting
              </h3>
              <p style={{ 
                fontSize: "0.9rem", 
                opacity: 0.9, 
                marginBottom: "20px",
                textShadow: "0 1px 2px rgba(0,0,0,0.2)"
              }}>
                Join our intimate virtual gathering via Zoom
              </p>
            </div>
            <a
              href={invitationData.zoomLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                padding: "12px 30px",
                backgroundColor: "#2D8CFF",
                borderRadius: "25px",
                fontSize: "0.95rem",
                textDecoration: "none",
                color: "white",
                fontWeight: "500",
                transition: "all 0.3s ease",
                transform: "translate3d(0,0,0)",
                willChange: "transform",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
              }}
            >
              Join Zoom Meeting
            </a>
            {invitationData.zoomId && (
              <div style={{ 
                marginTop: "20px", 
                fontSize: "0.85rem",
                textShadow: "0 1px 1px rgba(0,0,0,0.2)"
              }}>
                <p style={{ margin: "5px 0" }}>Meeting ID: {invitationData.zoomId}</p>
                <p style={{ margin: "5px 0" }}>Password: {invitationData.zoomPassword}</p>
              </div>
            )}
          </div>

          {/* YouTube Card */}
          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(5px)",
              borderRadius: "15px",
              padding: "30px",
              textAlign: "center",
              border: "1px solid rgba(255,255,255,0.2)",
              transform: "translate3d(0,0,0)",
              willChange: "transform"
            }}
          >
            <div style={{ marginBottom: "20px" }}>
              <FaYoutube style={{ 
                width: "60px", 
                height: "60px", 
                marginBottom: "15px", 
                color: "#FF0000",
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
              }} />
              <h3 style={{ 
                fontSize: "1.5rem", 
                fontWeight: "500", 
                margin: "0 0 10px",
                textShadow: "0 2px 3px rgba(0,0,0,0.4)"
              }}>
                YouTube Live
              </h3>
              <p style={{ 
                fontSize: "0.9rem", 
                opacity: 0.9, 
                marginBottom: "20px",
                textShadow: "0 1px 2px rgba(0,0,0,0.2)"
              }}>
                Watch our live stream on YouTube
              </p>
            </div>
            <a
              href={invitationData.youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                padding: "12px 30px",
                backgroundColor: "#FF0000",
                borderRadius: "25px",
                fontSize: "0.95rem",
                textDecoration: "none",
                color: "white",
                fontWeight: "500",
                transition: "all 0.3s ease",
                transform: "translate3d(0,0,0)",
                willChange: "transform",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
              }}
            >
              Watch on YouTube
            </a>
          </div>
        </div>

        {/* Countdown Timer */}
        <div 
          style={{
            marginTop: "50px",
            fontSize: "0.9rem",
            opacity: 0.8,
            textShadow: "0 1px 1px rgba(0,0,0,0.2)"
          }}
        >
          <p>Streaming will begin 15 minutes before the ceremony</p>
        </div>
      </div>
    </section>
  );
};

export default LiveStreamingSection;