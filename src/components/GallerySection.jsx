import { useState, useEffect } from 'react';
import invitationData from '../data/invitationData';

const HorizontalGallery = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Detect mobile
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Countdown logic
  useEffect(() => {
    const weddingDate = new Date(invitationData.eventDate);
    if (isNaN(weddingDate.getTime())) {
      console.error('Invalid wedding date:', invitationData.eventDate);
      return;
    }

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = weddingDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section style={{
      width: '100%',
      padding: '25px 15px',
      margin: '0 auto',
      textAlign: 'center',
      fontFamily: "'Cormorant Garamond', serif",
      boxSizing: 'border-box',
      position: 'relative',
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: isMobile ? 'auto' : 'auto',
      paddingBottom: isMobile ? '20px' : '30px'
    }}>
      {/* Countdown Image di kanan atas */}
      <div style={{
        position: 'absolute',
        top: isMobile ? '30px' : '10px',
        right: isMobile ? '15px' : '10px',
        width:'250px',
        maxWidth: '90%',
        zIndex: 2
      }}>
        <img
          src={invitationData.counting}
          alt="Countdown"
          style={{ 
            width: '100%', 
            height: 'auto', 
            display: 'block',
            filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.15))'
          }}
        />
      </div>

      {/* Countdown Timer */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: isMobile ? '15px' : '25px', // lebih lega
        marginTop: isMobile ? '70px' : '120px', // lebih ke bawah biar nggak nabrak gambar
        flexWrap: 'wrap',
        position: 'relative',
        zIndex: 1
      }}>
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} style={{ 
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: isMobile ? '3rem' : '5rem', // super gede
              fontWeight: 700,
              lineHeight: 1,
              fontFamily: "'Cormorant Garamond', serif",
              color: unit === 'seconds' ? 'red' : '#000' // seconds merah
            }}>
              {value.toString().padStart(2, '0')}
            </div>
            <div style={{
              fontSize: isMobile ? '1rem' : '1.2rem',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              marginTop: '5px',
              color: '#000',
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 500
            }}>
              {unit}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HorizontalGallery;
