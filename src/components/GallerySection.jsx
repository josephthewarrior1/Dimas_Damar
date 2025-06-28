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
        willChange: "transform",
        overflow: "hidden"
      }}
    >
      {/* Background Image */}
      <img
        src={invitationData.dateTimeImage}
        alt="Gallery background"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1
        }}
      />

      {/* Dark Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.4)",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "800px",
          width: "100%",
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
            letterSpacing: '2px'
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
            fontStyle: 'italic'
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
                  overflow: 'hidden',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                  transition: 'transform 0.3s ease'
                }}
              >
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%'
                }}>
                  <img
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center'
                    }}
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
                      transition: 'opacity 0.3s ease'
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
            fontStyle: 'italic'
          }}>
            Swipe to see more of our story
          </p>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;