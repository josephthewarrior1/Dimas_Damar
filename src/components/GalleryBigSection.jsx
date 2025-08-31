import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import invitationData from '../data/invitationData';

const GalleryWithScrollAnimation = () => {
  const photos = invitationData.galleryImages;
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const galleryRef = useRef(null);

  const bibleVerse = {
    text: "I found the one whom my soul loves.",
    reference: "Song of Solomon 3:4"
  };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const navigateImages = (direction) => {
    if (selectedImageIndex === null) return;
    
    if (direction === 'prev') {
      setSelectedImageIndex((prev) => (prev - 1 + photos.length) % photos.length);
    } else {
      setSelectedImageIndex((prev) => (prev + 1) % photos.length);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!isModalOpen) return;
    
    if (e.key === 'ArrowLeft') {
      navigateImages('prev');
    } else if (e.key === 'ArrowRight') {
      navigateImages('next');
    } else if (e.key === 'Escape') {
      closeModal();
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  // Effect for keyboard events
  useState(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <section style={{
      width: '100%',
      padding: '50px 20px',
      backgroundColor: '#000000',
      margin: '0 auto',
      textAlign: 'center',
      fontFamily: '"Cormorant Garamond", serif',
      boxSizing: 'border-box',
      position: 'relative',
      color: 'white',
      overflow: 'hidden'
    }}>
      {/* Header Text with Fade Up Animation */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        style={{
          marginBottom: '60px',
          padding: '40px 20px',
          position: 'relative',
        }}
      >
        {/* Ornament above the text */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.8, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={{
            width: '100%',
            height: '100px',
            backgroundImage: `url(${invitationData.ornamenImage})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            marginBottom: '30px',
          }}
        />

        <div style={{
          position: 'relative',
          zIndex: 2,
          marginBottom: '15px',
          color: "#BFA980",
        }}>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.8, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.3 }}
            style={{
              fontSize: '0.9rem',
              fontWeight: 400,
              letterSpacing: '1px',
              marginBottom: '4px',
              color: 'rgba(255,255,255,0.8)'
            }}
          >
            A PORTRAIT OF
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.4 }}
            style={{
              fontSize: '2.2rem',
              fontWeight: 400,
              letterSpacing: '1px',
              margin: 0,
              lineHeight: '1.1'
            }}
          >
            CHRIS & YOAN
          </motion.h2>
        </div>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.7, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.5 }}
          style={{
            fontSize: '1rem',
            fontStyle: 'italic',
            marginBottom: '20px',
            color: 'rgba(255,255,255,0.7)',
            position: 'relative',
            zIndex: 2
          }}
        >
          "{bibleVerse.text}"
        </motion.p>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.6, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.6 }}
          style={{
            fontSize: '0.8rem',
            color: 'rgba(255,255,255,0.6)',
            position: 'relative',
            zIndex: 2
          }}
        >
          {bibleVerse.reference}
        </motion.p>
      </motion.div>

      {/* Photo Gallery with Frame Effect */}
      <motion.div
        ref={galleryRef}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '30px',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px'
        }}
      >
        {photos.map((photo, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            style={{
              position: 'relative',
              cursor: 'pointer',
              perspective: '1000px'
            }}
            whileHover={{ 
              y: -10,
              transition: { duration: 0.3 }
            }}
            onClick={() => handleImageClick(index)}
          >
            {/* Photo Frame */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${invitationData.frame})`,
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
              zIndex: 3,
              pointerEvents: 'none'
            }} />
            
            {/* Image Container */}
            <div style={{
              padding: '20px',
              position: 'relative',
              zIndex: 2
            }}>
              <motion.img 
                src={photo} 
                alt={`Gallery image ${index + 1}`}
                style={{
                  width: '100%',
                  height: '280px',
                  objectFit: 'cover',
                  display: 'block',
                  borderRadius: '4px',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.3)'
                }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4 }}
              />
            </div>
            
            {/* Image Number */}
            <div style={{
              position: 'absolute',
              bottom: '15px',
              right: '15px',
              background: 'rgba(0,0,0,0.7)',
              color: 'white',
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.8rem',
              zIndex: 4
            }}>
              {index + 1}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Image Modal */}
      {isModalOpen && selectedImageIndex !== null && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }} 
          onClick={closeModal}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }} 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Navigation Buttons */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                navigateImages('prev');
              }}
              style={{
                position: 'absolute',
                left: '20px',
                background: 'rgba(191, 169, 128, 0.8)',
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

            <motion.img 
              key={selectedImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={photos[selectedImageIndex]} 
              alt="Selected" 
              style={{
                maxWidth: '100%',
                maxHeight: '90vh',
                borderRadius: '8px',
                boxShadow: '0 15px 40px rgba(0,0,0,0.5)'
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
                background: 'rgba(191, 169, 128, 0.8)',
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
                background: 'rgba(191, 169, 128, 0.8)',
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
            
            {/* Image Counter */}
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'white',
              background: 'rgba(0,0,0,0.7)',
              padding: '8px 20px',
              borderRadius: '20px',
              fontSize: '1rem'
            }}>
              {selectedImageIndex + 1} / {photos.length}
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default GalleryWithScrollAnimation;