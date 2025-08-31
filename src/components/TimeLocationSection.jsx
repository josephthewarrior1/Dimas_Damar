import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import invitationData from '../data/invitationData';

const TimeSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Check mobile view
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Calculate time remaining
  useEffect(() => {
    const weddingDate = new Date(invitationData.eventDate);
    const isValidDate = !isNaN(weddingDate.getTime());

    if (!isValidDate) {
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
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAddToCalendar = () => {
    window.open(invitationData.calendarLink, '_blank');
  };

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Cormorant Garamond', serif",
        color: 'white',
        overflow: 'hidden'
      }}
    >
      {/* Background Image */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${invitationData.backgroundImage2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0
        }}
      />

      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1
        }}
      />

      {/* Main Content */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: '800px',
          padding: isMobile ? '20px' : '30px',
          textAlign: 'center'
        }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Gambar tengah dengan animasi fade in on scroll */}
        <motion.div
          style={{
            width: isMobile ? '150px' : '160px',
            height: isMobile ? '150px' : '160px',
            margin: isMobile ? '0 auto 30px' : '0 auto 20px',
            borderRadius: '5px',
            overflow: 'hidden',
            boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
            border: '1px solid rgba(255,255,255,0.2)',
            position: 'relative'
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <img
            src={invitationData.timeImage}
            alt="Couple"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: 'scale(1.2)',
              transformOrigin: 'center'
            }}
          />
        </motion.div>

        {/* Title - Modified to two lines */}
        <motion.div
          style={{
            marginBottom: isMobile ? '10px' : '8px'
          }}
          initial={{ y: -20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div style={{
            fontSize: isMobile ? '1rem' : '1rem',
            fontWeight: 300,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.7)',
            fontFamily: "'Cormorant Garamond', serif",
            lineHeight: '1.5'
          }}>
            Countdown to
          </div>
          <div style={{
            fontSize: isMobile ? '1rem' : '1rem',
            fontWeight: 300,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.7)',
            fontFamily: "'Cormorant Garamond', serif",
            lineHeight: '1.5'
          }}>
            our wedding
          </div>
        </motion.div>

        {/* Countdown Timer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: isMobile ? '10px' : '15px',
            marginBottom: isMobile ? '30px' : '20px',
            flexWrap: 'wrap'
          }}
        >
          {Object.entries(timeLeft).map(([unit, value], index) => (
            <motion.div
              key={unit}
              style={{
                textAlign: 'center',
                minWidth: isMobile ? '70px' : '75px'
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + (index * 0.1) }}
            >
              <div
                style={{
                  fontSize: isMobile ? '2rem' : '2.2rem',
                  fontWeight: 500,
                  lineHeight: 1,
                  fontFamily: "'Cormorant Garamond', serif"
                }}
              >
                {value.toString().padStart(2, '0')}
              </div>
              <div
                style={{
                  fontSize: isMobile ? '0.7rem' : '0.65rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginTop: '5px',
                  color: 'rgba(255,255,255,0.7)',
                  fontFamily: "'Cormorant Garamond', serif"
                }}
              >
                {unit}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Remind Me Button */}
        <motion.button
          style={{
            background: 'transparent',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.3)',
            padding: isMobile ? '10px 20px' : '8px 16px',
            borderRadius: '4px',
            fontSize: isMobile ? '1rem' : '1rem',
            letterSpacing: '1px',
            cursor: 'pointer',
            marginBottom: isMobile ? '25px' : '20px',
            transition: 'all 0.3s ease',
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 500
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          whileHover={{ 
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderColor: 'rgba(255,255,255,0.5)'
          }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddToCalendar}
        >
          Save The Date
        </motion.button>
      </motion.div>
    </section>
  );
};

export default TimeSection;