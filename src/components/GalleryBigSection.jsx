import { useState, useEffect, useRef } from 'react';
import invitationData from '../data/invitationData';

const HorizontalGallery = () => {
  const photos = invitationData.galleryImages;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const featuredImageRef = useRef(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const bibleVerse = {
    text: "I found the one whom my soul loves.",
    reference: "Song of Solomon 3:4"
  };

  // Handle touch events for swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      navigateImages('next');
    } else if (touchEnd - touchStart > 100) {
      navigateImages('prev');
    }
  };

  const handleImageClick = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const navigateImages = (direction) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentImageIndex((prev) => {
      if (direction === 'prev') {
        return (prev - 1 + photos.length) % photos.length;
      } else {
        return (prev + 1) % photos.length;
      }
    });
    
    setTimeout(() => setIsTransitioning(false), 300);
  };

  // Auto slide effect
  useEffect(() => {
    if (isModalOpen) return;
    
    const interval = setInterval(() => {
      navigateImages('next');
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isModalOpen, isTransitioning]);

  return (
    <section style={{
      width: '100%',
      padding: '50px 20px',
      backgroundColor: '#000000',
      margin: '-10px auto',
      textAlign: 'center',
      fontFamily: '"Cormorant Garamond", serif',
      boxSizing: 'border-box',
      position: 'relative',
      color: 'white'
    }}>
      {/* Header Text */}
      <div style={{
        marginBottom: '40px',
        padding: '40px 20px',
        position: 'relative',
        backgroundSize: 'auto 60%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundBlendMode: 'overlay',
      }}>
        {/* Ornament above the text */}
        <div style={{
          width: '100%',
          height: '100px',
          backgroundImage: `url(${invitationData.ornamenImage})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          marginBottom: '20px',
          opacity: 0.8
        }}></div>

        <div style={{
          position: 'relative',
          zIndex: 2,
          marginBottom: '10px',
          color: "#BFA980",
        }}>
          <p style={{
            fontSize: '0.9rem',
            fontWeight: 400,
            letterSpacing: '1px',
            marginBottom: '4px',
            color: 'rgba(255,255,255,0.8)'
          }}>
            A PORTRAIT OF
          </p>
          <h2 style={{
            fontSize: '2.2rem',
            fontWeight: 400,
            letterSpacing: '1px',
            margin: 0,
            lineHeight: '1.1'
          }}>
            ROMEO & JULIET
          </h2>
        </div>
        <p style={{
          fontSize: '1rem',
          fontStyle: 'italic',
          marginBottom: '20px',
          color: 'rgba(255,255,255,0.7)',
          position: 'relative',
          zIndex: 2
        }}>
          "{bibleVerse.text}"
        </p>
        <p style={{
          fontSize: '0.8rem',
          color: 'rgba(255,255,255,0.6)',
          position: 'relative',
          zIndex: 2
        }}>
          {bibleVerse.reference}
        </p>
      </div>

      {/* Rest of your component remains the same */}
      {/* Main Featured Image with Navigation */}
      <div style={{
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto 20px',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        position: 'relative'
      }}>
        {/* Left Navigation Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            navigateImages('prev');
          }}
          style={{
            position: 'absolute',
            left: '15px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(0,0,0,0.5)',
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
            zIndex: 10,
            transition: 'all 0.3s ease',
            ':hover': {
              background: 'rgba(0,0,0,0.7)',
              transform: 'translateY(-50%) scale(1.1)'
            }
          }}
          aria-label="Previous image"
        >
          ❮
        </button>

        {/* Featured Image */}
        <div 
          ref={featuredImageRef}
          style={{
            width: '100%',
            cursor: 'pointer',
            position: 'relative',
            height: '400px',
            overflow: 'hidden'
          }}
          onClick={handleImageClick}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img 
            src={photos[currentImageIndex]} 
            alt="Featured" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0,
              transition: 'opacity 0.3s ease',
              opacity: isTransitioning ? 0.7 : 1
            }}
          />
        </div>

        {/* Right Navigation Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            navigateImages('next');
          }}
          style={{
            position: 'absolute',
            right: '15px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(0,0,0,0.5)',
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
            zIndex: 10,
            transition: 'all 0.3s ease',
            ':hover': {
              background: 'rgba(0,0,0,0.7)',
              transform: 'translateY(-50%) scale(1.1)'
            }
          }}
          aria-label="Next image"
        >
          ❯
        </button>
      </div>

      {/* Thumbnail Gallery */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        overflowX: 'auto',
        padding: '10px 0',
        gap: '8px',
        maxWidth: '600px',
        margin: '0 auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        '&::-webkit-scrollbar': {
          display: 'none'
        }
      }}>
        {photos.map((photo, i) => (
          <div 
            key={i} 
            style={{
              flex: '0 0 auto',
              width: '60px',
              height: '60px',
              borderRadius: '4px',
              overflow: 'hidden',
              cursor: 'pointer',
              border: i === currentImageIndex ? '2px solid #847346' : '1px solid rgba(255,255,255,0.2)',
              opacity: i === currentImageIndex ? 1 : 0.7,
              transition: 'all 0.2s ease'
            }}
            onClick={() => {
              if (!isTransitioning) {
                setCurrentImageIndex(i);
              }
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = i === currentImageIndex ? '1' : '0.7'}
          >
            <img 
              src={photo} 
              alt={`Thumbnail ${i + 1}`} 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
          </div>
        ))}
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
                left: '20px',
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                fontSize: '24px',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1001
              }}
              aria-label="Previous image"
            >
              ❮
            </button>

            <img 
              src={photos[currentImageIndex]} 
              alt="Selected" 
              style={{
                maxWidth: '100%',
                maxHeight: '90vh',
                borderRadius: '8px',
                boxShadow: '0 4px 30px rgba(0,0,0,0.5)'
              }}
            />

            <button 
              onClick={(e) => {
                e.stopPropagation();
                navigateImages('next');
              }}
              style={{
                position: 'absolute',
                right: '20px',
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                fontSize: '24px',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1001
              }}
              aria-label="Next image"
            >
              ❯
            </button>

            <button 
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
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
              aria-label="Close gallery"
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