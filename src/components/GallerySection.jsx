import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import invitationData from "../data/invitationData";
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
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        padding: "80px 20px",
        fontFamily: "'Playfair Display', serif",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        transform: "translate3d(0,0,0)",
        backfaceVisibility: "hidden",
        perspective: "1000px",
        willChange: "transform",
        overflow: "hidden"
      }}
      className="scroll-section"
    >
      {/* Optimized Background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${invitationData.dateTimeImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1,
          transform: "translate3d(0,0,0)"
        }}
      />

      {/* Optimized Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.4)",
          zIndex: 0,
          transform: "translate3d(0,0,0)"
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "800px",
          width: "100%",
          transform: "translate3d(0,0,0)"
        }}
      >
        <h2 
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
        </h2>
        
        <p 
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
        </p>

        <div>
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
              transform: "translate3d(0,0,0)"
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
                  transition: 'transform 0.3s ease',
                  transform: "translate3d(0,0,0)",
                  willChange: "transform"
                }}
              >
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  transform: "translate3d(0,0,0)"
                }}>
                  <img
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      transform: "translate3d(0,0,0)"
                    }}
                    loading="lazy"
                  />
                  <div
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
                      fontFamily: "'Playfair Display', serif",
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      transform: "translate3d(0,0,0)",
                      padding: '20px',
                      textAlign: 'center',
                      textShadow: '0 1px 3px rgba(0,0,0,0.5)'
                    }}
                    className="gallery-caption"
                  >
                    {galleryCaptions[index] || "Our Memories"}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div 
          style={{
            textAlign: 'center',
            marginTop: '30px'
          }}
        >
          <p style={{
            fontSize: '0.9rem',
            color: 'rgba(255,255,255,0.8)',
            fontStyle: 'italic',
            textShadow: '0 1px 1px rgba(0,0,0,0.2)'
          }}>
            Swipe to see more of our story
          </p>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;