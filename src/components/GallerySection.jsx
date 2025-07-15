import { useState, useEffect } from 'react';
import invitationData from '../data/invitationData';

const HorizontalGallery = () => {
  const photos = invitationData.galleryImages;
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const bibleVerse = {
    text: "Dan sekarang ketiga hal ini tetap: iman, pengharapan dan kasih, dan yang paling besar di antaranya ialah kasih.",
    reference: "1 Korintus 13:13"
  };

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

  return (
    <section style={{
      width: '100%',
      overflow: 'hidden',
      padding: '20px 20px 30px',
      backgroundColor: '#fafafa',
      margin: '0 auto',
      textAlign: 'center',
      fontFamily: '"Times New Roman", serif',
      boxSizing: 'border-box',
      maxWidth: '700px',
      position: 'relative'
    }}>
      {/* Bible Verse */}
      <div style={{
        margin: '0 auto 25px',
        padding: '0 15px',
        maxWidth: '600px'
      }}>
        <p style={{
          fontSize: '16px',
          lineHeight: '1.6',
          color: '#555',
          fontStyle: 'italic',
          margin: '0 0 10px'
        }}>
          "{bibleVerse.text}"
        </p>
        <p style={{
          fontSize: '14px',
          color: '#888',
          fontWeight: '500',
          margin: 0
        }}>
          - {bibleVerse.reference} -
        </p>
      </div>

      {/* Gallery Container */}
      <div style={{
        width: '100%',
        overflow: 'hidden',
        padding: '0 10px'
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