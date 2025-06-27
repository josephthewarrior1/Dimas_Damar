import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import invitationData from "../data/invitationData";
import { containerVariants, slideUp } from "./animations";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const GallerySection = () => {
  const galleryCaptions = [
    "First Meeting",
    "Our Engagement",
    "Special Moments",
    "Together",
    "Forever"
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundImage: `url(${invitationData.dateTimeImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "80px 20px",
        fontFamily: "'Playfair Display', serif",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        willChange: "transform"
      }}
    >
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
            letterSpacing: '2px'
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
            fontStyle: 'italic'
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
              paddingTop: '20px'
            }}
          >
            {invitationData.galleryImages.map((image, index) => (
              <SwiperSlide
                key={index}
                style={{
                  width: '280px',
                  height: '420px',
                  borderRadius: '8px',
                  backgroundImage: `url(${image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease'
                }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  style={{
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