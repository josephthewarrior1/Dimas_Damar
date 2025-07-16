import { useState, useEffect, useRef } from 'react';
import invitationData from "../data/invitationData";

const LoveStorySection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);

  // Sample love story data with images and text
  const loveStoryData = [
    {
      image: invitationData.galleryImages[0],
      title: "First Meeting",
      date: "June 2018",
      description: "We met at a mutual friend's birthday party and instantly connected."
    },
    {
      image: invitationData.galleryImages[1],
      title: "First Date",
      date: "July 2018",
      description: "Our first date at the beach watching the sunset together."
    },
    {
      image: invitationData.galleryImages[2],
      title: "Official Couple",
      date: "August 2018",
      description: "We made it official after a month of getting to know each other."
    },
    {
      image: invitationData.galleryImages[3],
      title: "Vacation Together",
      date: "December 2019",
      description: "Our first overseas trip to Bali, creating beautiful memories."
    },
    {
      image: invitationData.galleryImages[4],
      title: "The Proposal",
      date: "February 2024",
      description: "Nathan proposed during a romantic dinner by the lake."
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % loveStoryData.length);
      }, 5000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isAutoPlaying, loveStoryData.length]);

  // Handle touch events for swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setIsAutoPlaying(false);
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const difference = touchStartX.current - touchEndX.current;
    if (difference > 50) {
      // Swipe left - next slide
      setCurrentSlide(prev => (prev + 1) % loveStoryData.length);
    } else if (difference < -50) {
      // Swipe right - previous slide
      setCurrentSlide(prev => (prev - 1 + loveStoryData.length) % loveStoryData.length);
    }

    touchStartX.current = null;
    touchEndX.current = null;
    setIsAutoPlaying(true);
  };

  // Handle manual slide change
  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section 
      style={{
        position: "relative",
        padding: "60px 0",
        color: "#fff",
        fontFamily: "'Cormorant Garamond', serif",
        overflow: "hidden",
        backgroundImage: `url(${invitationData.backgroundImage})`, // Using backgroundImage from invitationData
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      {/* Dark overlay */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.7)",
        zIndex: 0
      }}></div>
      
      <div style={{ 
        maxWidth: "1200px", 
        margin: "0 auto", 
        padding: "0 20px",
        position: "relative",
        zIndex: 1
      }}>
        {/* Section Title */}
        <h2 
          style={{
            textAlign: "center",
            fontSize: "clamp(38px, 4vw, 50px)",
            fontWeight: 600,
            fontFamily: "'Cormorant Garamond', serif",  
            marginBottom: "40px",
            letterSpacing: "1px",
            position: "relative",
            color: "#fff"
          }}
        >
          Our Love Story
          <div style={{
            width: "60px",
            height: "2px",
            background: "#fff",
            margin: "15px auto 0",
            position: "relative"
          }}>
            <div style={{
              position: "absolute",
              top: "-3px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#fff"
            }}></div>
          </div>
        </h2>

        {/* Carousel Container */}
        <div 
          ref={carouselRef}
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "800px",
            margin: "0 auto",
            overflow: "hidden",
            borderRadius: "8px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Slides */}
          <div 
            style={{
              display: "flex",
              transition: "transform 0.5s ease",
              transform: `translateX(-${currentSlide * 100}%)`,
              height: "500px"
            }}
          >
            {loveStoryData.map((story, index) => (
              <div 
                key={index}
                style={{
                  minWidth: "100%",
                  position: "relative",
                  height: "100%"
                }}
              >
                {/* Story Image */}
                <div 
                  style={{
                    backgroundImage: `url(${story.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "100%",
                    height: "100%",
                    position: "relative"
                  }}
                >
                  {/* Story Content Overlay */}
                  <div 
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                      padding: "30px",
                      color: "white",
                      textAlign: "center"
                    }}
                  >
                    <h3 
                      style={{
                        fontSize: "clamp(22px, 3vw, 28px)",
                        marginBottom: "8px",
                        fontWeight: 600,
                        color: "#fff"
                      }}
                    >
                      {story.title}
                    </h3>
                    <p 
                      style={{
                        fontSize: "18px",
                        marginBottom: "12px",
                        fontStyle: "italic",
                        color: "rgba(255,255,255,0.9)"
                      }}
                    >
                      {story.date}
                    </p>
                    <p 
                      style={{
                        fontSize: "16px",
                        lineHeight: "1.6",
                        maxWidth: "600px",
                        margin: "0 auto",
                        color: "rgba(255,255,255,0.9)"
                      }}
                    >
                      {story.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={() => {
              setCurrentSlide(prev => (prev - 1 + loveStoryData.length) % loveStoryData.length);
              setIsAutoPlaying(false);
            }}
            style={{
              position: "absolute",
              top: "50%",
              left: "15px",
              transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.3)",
              border: "none",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              color: "white",
              fontSize: "20px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(5px)",
              zIndex: 10
            }}
          >
            &lt;
          </button>
          <button 
            onClick={() => {
              setCurrentSlide(prev => (prev + 1) % loveStoryData.length);
              setIsAutoPlaying(false);
            }}
            style={{
              position: "absolute",
              top: "50%",
              right: "15px",
              transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.3)",
              border: "none",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              color: "white",
              fontSize: "20px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(5px)",
              zIndex: 10
            }}
          >
            &gt;
          </button>
        </div>

        {/* Indicators */}
        <div 
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            gap: "10px"
          }}
        >
          {loveStoryData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                border: "none",
                background: currentSlide === index ? "#fff" : "rgba(255,255,255,0.5)",
                cursor: "pointer",
                transition: "background 0.3s ease"
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoveStorySection;