import { FaInstagram } from "react-icons/fa";
import invitationData from "../data/invitationData";

const GroomSection = () => {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-start",
        color: "white",
        padding: "40px 20px",
        textAlign: "left",
        fontFamily: "'Playfair Display', serif",
        willChange: "transform",
        overflow: "hidden"
      }}
    >
      {/* Background Image */}
      <img
        src={invitationData.backgroundImageGroom}
        alt="Groom background"
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
          background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(100,100,100,0.3))",
          zIndex: 0,
        }}
      />

      <div 
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: '500px'
        }}
      >
        <p 
          style={{ 
            fontSize: '0.8rem', 
            marginBottom: '4px', 
            opacity: 0.8, 
            letterSpacing: '1.5px' 
          }}
        >
          GROOM
        </p>
        
        <h2 
          style={{ 
            fontSize: '1.75rem', 
            margin: '0 0 12px', 
            fontWeight: '500', 
            letterSpacing: '1px' 
          }}
        >
          {invitationData.groom}
        </h2>
        
        <p 
          style={{ 
            fontSize: '0.8rem', 
            marginBottom: '4px', 
            letterSpacing: '1.5px', 
            opacity: 0.8 
          }}
        >
          FIRST SON OF
        </p>
        
        <p 
          style={{ 
            marginBottom: '2px', 
            fontSize: '0.95rem' 
          }}
        >
          Mr. Estukurnia Iman
        </p>
        
        <p 
          style={{ 
            marginBottom: '12px', 
            fontSize: '0.95rem' 
          }}
        >
          Mrs. Lusy Tantirahaju
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
            backdropFilter: 'blur(2px)'
          }}
        >
          <FaInstagram style={{ width: '16px', height: '16px' }} />
          <span>@teosaneryutanesy</span>
        </div>
      </div>
    </section>
  );
};

export default GroomSection;