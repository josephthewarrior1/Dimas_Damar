import { FaInstagram } from "react-icons/fa";
import invitationData from "../data/invitationData";

const BrideSection = () => {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        color: "white",
        padding: "40px 20px",
        textAlign: "right",
        fontFamily: "'Playfair Display', serif",
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
          backgroundImage: `url(${invitationData.backgroundImageBride})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1,
          transform: "translate3d(0,0,0)",
          willChange: "transform"
        }}
      />

      {/* Optimized Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(100,100,100,0.3))",
          zIndex: 0,
          transform: "translate3d(0,0,0)"
        }}
      />

      <div 
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: '500px',
          transform: "translate3d(0,0,0)",
          willChange: "transform"
        }}
      >
        <p 
          style={{ 
            fontSize: '0.8rem', 
            marginBottom: '4px', 
            opacity: 0.8, 
            letterSpacing: '1.5px',
            textShadow: '0 1px 2px rgba(0,0,0,0.3)'
          }}
        >
          BRIDE
        </p>
        
        <h2 
          style={{ 
            fontSize: '1.75rem', 
            margin: '0 0 12px', 
            fontWeight: '500', 
            letterSpacing: '1px',
            textShadow: '0 2px 4px rgba(0,0,0,0.4)'
          }}
        >
          {invitationData.bride}
        </h2>
        
        <p 
          style={{ 
            fontSize: '0.8rem', 
            marginBottom: '4px', 
            letterSpacing: '1.5px', 
            opacity: 0.8,
            textShadow: '0 1px 2px rgba(0,0,0,0.2)'
          }}
        >
          DAUGHTER OF
        </p>
        
        <p 
          style={{ 
            marginBottom: '2px', 
            fontSize: '0.95rem',
            textShadow: '0 1px 2px rgba(0,0,0,0.2)'
          }}
        >
          Mr. Robertus Santoso
        </p>
        
        <p 
          style={{ 
            marginBottom: '12px', 
            fontSize: '0.95rem',
            textShadow: '0 1px 2px rgba(0,0,0,0.2)'
          }}
        >
          Mrs. Maria Wijaya
        </p>

        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.85rem',
            backgroundColor: 'rgba(255,255,255,0.1)',
            padding: '6px 12px',
            borderRadius: '20px',
            width: 'fit-content',
            backdropFilter: 'blur(2px)',
            marginLeft: 'auto',
            border: '1px solid rgba(255,255,255,0.15)',
            transform: "translate3d(0,0,0)",
            willChange: "transform"
          }}
        >
          <FaInstagram style={{ width: '16px', height: '16px' }} />
          <span>@sherinangelina</span>
        </div>
      </div>
    </section>
  );
};

export default BrideSection;