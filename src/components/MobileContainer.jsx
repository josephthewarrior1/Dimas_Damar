export default function MobileContainer({ children }) {
    return (
      <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#9999', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '430px', backgroundColor: '#e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
          {children}
        </div>
      </div>
    );
  }