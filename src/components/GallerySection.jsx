import { useState, useEffect } from 'react';
import invitationData from '../data/invitationData';

const HorizontalGallery = () => {
  const photos = invitationData.galleryImages;
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Check if mobile device
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

  useEffect(() => {
    const galleryWidth = photos.length * 126;
    const scrollSpeed = 0.5;

    const interval = setInterval(() => {
      setScrollPosition((prev) => {
        const newPos = prev + scrollSpeed;
        return newPos >= galleryWidth ? 0 : newPos;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [photos.length]);

  const handleImageClick = (index) => {
    setCurrentImageIndex(index % photos.length);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const navigateImages = (direction) => {
    setCurrentImageIndex((prev) => {
      if (direction === 'prev') {
        return (prev - 1 + photos.length) % photos.length;
      } else {
        return (prev + 1) % photos.length;
      }
    });
  };

  const handleAddToCalendar = () => {
    window.open(invitationData.calendarLink, '_blank');
  };

  return (
    <section style={{
      width: '100%',
      overflow: 'hidden',
      padding: '40px 20px',
      backgroundColor: '#f9f5f0',
      backgroundImage: `url(${invitationData.backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      margin: '0 auto',
      textAlign: 'center',
      fontFamily: "'Cormorant Garamond', serif",
      boxSizing: 'border-box',
      position: 'relative'
    }}>
      
      {/* Bunga Ornament - Top Left */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '0px',
        zIndex: 1
      }}>
        <img 
          src={invitationData.bunga1} 
          alt="Bunga Ornamen" 
          style={{
            height: isMobile ? '70px' : '60px',
            width: 'auto',
            objectFit: 'contain',
            transform: 'rotate(-15deg)'
          }}
        />
      </div>

      {/* Bunga Ornament - Top Right */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '0px',
        zIndex: 1
      }}>
        <img 
          src={invitationData.bunga1} 
          alt="Bunga Ornamen" 
          style={{
            height: isMobile ? '70px' : '60px',
            width: 'auto',
            objectFit: 'contain',
            transform: 'rotate(-15deg)'
          }}
        />
      </div>

      {/* Save The Date Text */}
      <div style={{
        margin: '0 auto 30px',
        padding: '0 15px',
        maxWidth: '600px',
        position: 'relative',
        zIndex: 2
      }}>
        <h1
          style={{
            fontSize: isMobile ? '32px' : '42px',
            margin: "0 0 20px",
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: "1px",
            fontFamily: "'Great Vibes', cursive",
            color: "#000000",
          }}
        >
          Save The Date
        </h1>
        <p style={{
          fontSize: isMobile ? '1rem' : '1.1rem',
          color: '#000000',
          fontWeight: 300,
          margin: '0 0 20px',
          lineHeight: '1.6'
        }}>
          09 November 2025
        </p>
      </div>

      {/* Countdown Timer */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: isMobile ? '10px' : '15px',
          marginBottom: isMobile ? '30px' : '20px',
          flexWrap: 'wrap',
          position: 'relative',
          zIndex: 2
        }}
      >
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div
            key={unit}
            style={{
              textAlign: 'center',
              minWidth: isMobile ? '70px' : '75px'
            }}
          >
            <div
              style={{
                fontSize: isMobile ? '2rem' : '2.2rem',
                fontWeight: 500,
                lineHeight: 1,
                fontFamily: "'Cormorant Garamond', serif",
                color: '#000000'
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
                color: '#000000',
                fontFamily: "'Cormorant Garamond', serif"
              }}
            >
              {unit}
            </div>
          </div>
        ))}
      </div>

      {/* Save The Date Button */}
      <div style={{ 
        marginBottom: '30px',
        position: 'relative',
        zIndex: 2
      }}>
        <button
          style={{
            background: 'transparent',
            color: '#000000',
            border: '1px solid rgba(0,0,0,0.3)',
            padding: isMobile ? '12px 24px' : '10px 20px',
            borderRadius: '4px',
            fontSize: isMobile ? '1rem' : '1rem',
            letterSpacing: '1px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 500
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = 'rgba(0,0,0,0.1)';
            e.target.style.borderColor = 'rgba(0,0,0,0.5)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.borderColor = 'rgba(0,0,0,0.3)';
          }}
          onClick={handleAddToCalendar}
        >
          Save The Date
        </button>
      </div>

      {/* Gallery Container */}
      <div style={{
        width: '100%',
        overflow: 'hidden',
        padding: '0 10px',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{ 
          display: 'flex',
          width: 'max-content',
          transition: 'transform 0.1s ease-out',
          transform: `translateX(-${scrollPosition}px)`,
          padding: '10px 0'
        }}>
          {[...photos, ...photos].map((photo, i) => (
            <div 
              key={i} 
              style={{
                margin: '0 6px',
                cursor: 'pointer',
                transition: 'transform 0.2s ease'
              }}
              onClick={() => handleImageClick(i)}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <img 
                src={photo} 
                alt={`Gallery ${i + 1}`} 
                style={{
                  width: '120px',
                  height: '120px',
                  objectFit: 'cover',
                  borderRadius: '6px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                  border: '1px solid #eee',
                  flexShrink: 0
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }} onClick={closeModal}>
          <div style={{
            maxWidth: '90%',
            maxHeight: '90%',
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }} onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                navigateImages('prev');
              }}
              style={{
                position: 'absolute',
                left: '-25px',
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                fontSize: '20px',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1001
              }}
            >
              ❮
            </button>

            <img 
              src={photos[currentImageIndex]} 
              alt="Selected" 
              style={{
                maxWidth: '100%',
                maxHeight: '80vh',
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
              }}
            />

            <button 
              onClick={(e) => {
                e.stopPropagation();
                navigateImages('next');
              }}
              style={{
                position: 'absolute',
                right: '-25px',
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                fontSize: '20px',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1001
              }}
            >
              ❯
            </button>

            <button 
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                background: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                fontSize: '20px',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default HorizontalGallery;