export default function MobileContainer({ children }) {
  return (
    <div className="mobile-only-container" style={{ 
      width: '100%', 
      minHeight: '100vh', 
      backgroundColor: '#f9f7f4', 
      display: 'flex', 
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      {/* Mobile View (shown only on small screens) */}
      <div className="mobile-view" style={{ 
        width: '100%', 
        maxWidth: '430px', 
        minHeight: '100vh',
        backgroundColor: '#e5e7eb', 
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        display: 'block'
      }}>
        {children}
      </div>

      {/* Desktop Message (shown only on larger screens) */}
      <div className="desktop-message" style={{
        display: 'none',
        textAlign: 'center',
        padding: '20px',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <h2 style={{ 
          fontFamily: "'Playfair Display', serif",
          fontSize: '28px',
          marginBottom: '20px',
          color: '#333'
        }}>
          Mobile View Required
        </h2>
        <p style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: '16px',
          lineHeight: '1.6',
          color: '#555',
          marginBottom: '30px'
        }}>
          Our wedding invitation is designed to be viewed on mobile devices only.
          Please open this page on your smartphone or resize your browser window
          to a mobile size (under 430px width).
        </p>
        <div style={{
          width: '200px',
          height: '200px',
          margin: '0 auto',
          backgroundImage: 'url(https://cdn-icons-png.flaticon.com/512/2933/2933245.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          opacity: '0.7'
        }}></div>
      </div>

      <style jsx>{`
        @media (min-width: 769px) {
          .mobile-view {
            display: none !important;
          }
          .desktop-message {
            display: block !important;
          }
        }
        @media (max-width: 768px) {
          .mobile-only-container {
            background: #f9f7f4 !important;
          }
        }
      `}</style>
    </div>
  );
}