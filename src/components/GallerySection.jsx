import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { useState, useEffect } from "react";
import invitationData from "../data/invitationData";
import { containerVariants, slideUp } from "./animations";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const GallerySection = () => {
  const [bgLoaded, setBgLoaded] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const galleryCaptions = [
    "First Meeting",
    "Our Engagement",
    "Special Moments",
    "Together",
    "Forever"
  ];

  // Preload background image
  useEffect(() => {
    const img = new Image();
    img.src = invitationData.dateTimeImage;
    img.onload = () => setBgLoaded(true);
  }, []);

  // Track gallery images loading
  const handleImageLoad = () => {
    setImagesLoaded(prev => prev + 1);
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      style={{
        position: "relative",
        minHeight: "100vh",
        minHeight: "-webkit-fill-available",
        padding: "80px 20px",
        fontFamily: "'Playfair Display', serif",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        overflow: "hidden",
        backgroundColor: "#f0e7db",
        backgroundImage: bgLoaded 
          ? `url(${invitationData.dateTimeImage})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: bgLoaded ? 1 : 0.99,
        transition: "opacity 0.8s ease, background 0.8s ease"
      }}
    >
      {/* Dark Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.4)",
          zIndex: 0,
        }}
      />

      <motion.div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "800px",
          width: "100%",
          opacity: bgLoaded ? 1 : 0,
          transform: bgLoaded ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease"
        }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2 
          variants={slideUp}
          style={{
            textAlign: 'center',
            fontSize: '2.5rem',
            marginBottom: '20px',
            fontFamily: "'Playfair Display', serif",
            color: 'white',
            fontWeight: 'normal',
            letterSpacing: '2px',
            textShadow: '0 2px 4px rgba(0,0,0,0.4)'
          }}
        >
          Our Precious Moments
        </motion.h2>
        
        <motion.p 
          variants={slideUp}
          style={{
            textAlign: 'center',
            fontSize: '1.1rem',
            marginBottom: '40px',
            color: 'rgba(255,255,255,0.9)',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
            fontStyle: 'italic',
            textShadow: '0 1px 2px rgba(0,0,0,0.3)'
          }}
        >
          A journey of love captured in time
        </motion.p>

        <motion.div variants={slideUp}>
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 15,
              stretch: 0,
              depth: 200,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true
            }}
            modules={[EffectCoverflow, Pagination]}
            className="mySwiper"
            style={{ 
              paddingBottom: '60px',
              paddingTop: '20px',
              opacity: imagesLoaded === invitationData.galleryImages.length ? 1 : 0,
              transition: 'opacity 0.6s ease'
            }}
          >
            {invitationData.galleryImages.map((image, index) => (
              <SwiperSlide
                key={index}
                style={{
                  width: '280px',
                  height: '420px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                  transition: 'transform 0.3s ease'
                }}
              >
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#f0e7db'
                }}>
                  <img
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    onLoad={handleImageLoad}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      opacity: imagesLoaded > index ? 1 : 0,
                      transition: 'opacity 0.6s ease'
                    }}
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'rgba(0,0,0,0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '1.2rem',
                      fontFamily: "'Playfair Display', serif"
                    }}
                  >
                    {galleryCaptions[index] || "Our Memories"}
                  </motion.div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        <motion.div 
          variants={slideUp}
          style={{
            textAlign: 'center',
            marginTop: '30px'
          }}
        >
          <p style={{
            fontSize: '0.9rem',
            color: 'rgba(255,255,255,0.8)',
            fontStyle: 'italic'
          }}>
            Swipe to see more of our story
          </p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default GallerySection;