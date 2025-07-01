import { useRef, useEffect, useState, lazy, Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaInstagram, FaYoutube, FaVideo } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import invitationData from '../data/invitationData';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// Animasi
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function WeddingPage() {
  const homeRef = useRef(null);
  const [params] = useSearchParams();
  const [guestName, setGuestName] = useState("Tamu Undangan");
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    // Handle guest name from URL
    const nameFromUrl = params.get("to");
    if (nameFromUrl) {
      setGuestName(decodeURIComponent(nameFromUrl));
    }

    // Preload images
    const preloadImages = async () => {
      const allImages = [
        invitationData.backgroundImage2,
        invitationData.backgroundImageGroom,
        invitationData.backgroundImageBride,
        invitationData.dateTimeImage,
        invitationData.backgroundImageLive,
        ...invitationData.galleryImages
      ];

      const promises = allImages.map(url => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = url;
          img.onload = resolve;
          img.onerror = resolve;
        });
      });

      await Promise.all(promises);
      setIsAppReady(true);
    };

    preloadImages();

    // Scroll to top
    homeRef.current?.scrollTo(0, 0);
  }, [params]);

  if (!isAppReady) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Memuat Undangan...</p>
      </div>
    );
  }

  return (
    <div ref={homeRef} className="wedding-container">
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <p className="invitation-text">We invite you to our Holy Matrimony</p>
          <h1>{invitationData.coupleName}</h1>
          <p className="wedding-date">SATURDAY, 19 JULY 2025</p>
          <div className="guest-card">
            <p className="special-for">Special for:</p>
            <p className="guest-name">{guestName}</p>
          </div>
        </div>
      </section>

      {/* Groom Section */}
      <section className="profile-section groom">
        <div className="profile-content left-align">
          <motion.p variants={slideUp}>GROOM</motion.p>
          <motion.h2 variants={slideUp}>{invitationData.groom}</motion.h2>
          <motion.p variants={slideUp}>FIRST SON OF</motion.p>
          <motion.p variants={slideUp}>Mr. Estukurnia Iman</motion.p>
          <motion.p variants={slideUp}>Mrs. Lusy Tantirahaju</motion.p>
          <motion.div variants={slideUp} className="social-link">
            <FaInstagram />
            <span>@teosaneryutanesy</span>
          </motion.div>
        </div>
      </section>

      {/* Bride Section */}
      <section className="profile-section bride">
        <div className="profile-content right-align">
          <motion.p variants={slideUp}>BRIDE</motion.p>
          <motion.h2 variants={slideUp}>{invitationData.bride}</motion.h2>
          <motion.p variants={slideUp}>DAUGHTER OF</motion.p>
          <motion.p variants={slideUp}>Mr. Robertus Santoso</motion.p>
          <motion.p variants={slideUp}>Mrs. Maria Wijaya</motion.p>
          <motion.div variants={slideUp} className="social-link">
            <FaInstagram />
            <span>@sherinangelina</span>
          </motion.div>
        </div>
      </section>

      {/* Live Streaming Section */}
      <section className="streaming-section">
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible">
          <motion.div variants={slideUp}>
            <p>LIVE STREAMING</p>
            <h5>Watch our live Holy Matrimony virtually via Zoom app or Youtube</h5>
          </motion.div>

          <div className="streaming-cards">
            {/* Zoom Card */}
            <motion.div variants={slideUp} className="stream-card">
              <FaVideo className="stream-icon zoom"/>
              <h3>Zoom Meeting</h3>
              <p>Join our intimate virtual gathering via Zoom</p>
              <a href={invitationData.zoomLink} className="stream-button zoom">
                Join Zoom Meeting
              </a>
            </motion.div>

            {/* YouTube Card */}
            <motion.div variants={slideUp} className="stream-card">
              <FaYoutube className="stream-icon youtube"/>
              <h3>YouTube Live</h3>
              <p>Watch our live stream on YouTube</p>
              <a href={invitationData.youtubeLink} className="stream-button youtube">
                Watch on YouTube
              </a>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section">
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible">
          <motion.h2 variants={slideUp}>Our Precious Moments</motion.h2>
          <motion.p variants={slideUp}>A journey of love captured in time</motion.p>
          
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
            pagination={true}
            modules={[EffectCoverflow, Pagination]}
            className="gallery-swiper"
          >
            {invitationData.galleryImages.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="gallery-item">
                  <img 
                    src={image} 
                    alt={`Gallery ${index + 1}`} 
                    loading="lazy"
                  />
                  <div className="image-caption">
                    {["First Meeting", "Our Engagement", "Special Moments", "Together", "Forever"][index] || "Our Memories"}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </section>

      <style jsx global>{`
        /* Global Styles */
        .wedding-container {
          scroll-behavior: smooth;
          overflow-x: hidden;
          background-color: #f0e7db;
        }
        
        .loading-screen {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          font-family: 'Playfair Display', serif;
        }
        
        .spinner {
          width: 50px;
          height: 50px;
          border: 3px solid rgba(0,0,0,0.1);
          border-top-color: #333;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 20px;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        /* Hero Section */
        .hero-section {
          position: relative;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: white;
          background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${invitationData.backgroundImage2});
          background-size: cover;
          background-position: center;
        }
        
        /* Profile Sections */
        .profile-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: flex-end;
          padding: 40px 20px;
          color: white;
          font-family: 'Playfair Display', serif;
        }
        
        .groom {
          justify-content: flex-start;
          text-align: left;
          background-image: url(${invitationData.backgroundImageGroom});
        }
        
        .bride {
          justify-content: flex-end;
          text-align: right;
          background-image: url(${invitationData.backgroundImageBride});
        }
        
        /* Streaming Section */
        .streaming-section {
          position: relative;
          min-height: 100vh;
          padding: 60px 20px;
          background-image: url(${invitationData.backgroundImageLive});
          background-size: cover;
        }
        
        /* Gallery Section */
        .gallery-section {
          position: relative;
          min-height: 100vh;
          padding: 80px 20px;
          background-image: url(${invitationData.dateTimeImage});
          background-size: cover;
        }
      `}</style>
    </div>
  );
}