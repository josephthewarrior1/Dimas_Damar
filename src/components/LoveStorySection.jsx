import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import invitationData from "../data/invitationData";

const LoveStorySection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showStories, setShowStories] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const constraintsRef = useRef(null);

  // Love story data with customized image positioning
  const loveStoryData = [
    {
      image: invitationData.galleryImages[0],
      title: "First Meeting",
      date: "June 2018",
      description: "We met at a mutual friend's birthday party and instantly connected.",
      imagePosition: "center 30%"
    },
    {
      image: invitationData.galleryImages[1],
      title: "First Date",
      date: "July 2018",
      description: "Our first date at the beach watching the sunset together.",
      imagePosition: "center 40%"
    },
    {
      image: invitationData.galleryImages[2],
      title: "Official Couple",
      date: "August 2018",
      description: "We made it official after a month of getting to know each other.",
      imagePosition: "center 40%"
    },
    {
      image: invitationData.galleryImages[3],
      title: "Vacation Together",
      date: "December 2019",
      description: "Our first overseas trip to Bali, creating beautiful memories.",
      imagePosition: "center 50%"
    },
    {
      image: invitationData.galleryImages[4],
      title: "The Proposal",
      date: "February 2024",
      description: "Nathan proposed during a romantic dinner by the lake.",
      imagePosition: "center 60%"
    }
  ];

  // Device detection
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const openModal = (story, index) => {
    setSelectedStory(story);
    setCurrentIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const toggleStories = () => {
    setShowStories(!showStories);
  };

  const navigateStories = (direction) => {
    let newIndex;
    if (direction === 'next') {
      newIndex = currentIndex === loveStoryData.length - 1 ? 0 : currentIndex + 1;
    } else {
      newIndex = currentIndex === 0 ? loveStoryData.length - 1 : currentIndex - 1;
    }
    setCurrentIndex(newIndex);
    setSelectedStory(loveStoryData[newIndex]);
  };

  // For swipe gestures
  const x = useMotionValue(0);
  const xInput = [-100, 0, 100];
  const background = useTransform(x, xInput, [
    "linear-gradient(90deg, #ff008c 0%, rgb(211, 9, 225) 100%)",
    "linear-gradient(90deg, #7700ff 0%, rgb(68, 0, 255) 100%)",
    "linear-gradient(90deg, rgb(230, 255, 0) 0%, rgb(3, 209, 0) 100%)"
  ]);
  const color = useTransform(x, xInput, [
    "rgb(211, 9, 225)",
    "rgb(68, 0, 255)",
    "rgb(3, 209, 0)"
  ]);
  const tickPath = useTransform(x, [10, 100], [0, 1]);
  const crossPathA = useTransform(x, [-10, -55], [0, 1]);
  const crossPathB = useTransform(x, [-50, -100], [0, 1]);

  return (
    <section 
      style={{
        position: "relative",
        padding: "60px 0",
        color: "#fff",
        fontFamily: "'Cormorant Garamond', serif",
        overflow: "hidden",
        backgroundImage: `url(${invitationData.backgroundImage2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
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

        {/* Show Stories Button */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <motion.button
            onClick={toggleStories}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              background: "transparent",
              border: "1px solid white",
              color: "white",
              padding: "12px 30px",
              fontSize: "16px",
              borderRadius: "30px",
              cursor: "pointer",
              fontFamily: "'Cormorant Garamond', serif",
              letterSpacing: "1px",
              transition: "all 0.3s ease",
              ':hover': {
                background: "rgba(255,255,255,0.1)"
              }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showStories ? "Hide Our Story" : "Show Our Story"}
          </motion.button>
        </div>

        {/* Story Cards Grid */}
        <AnimatePresence>
          {showStories && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
                gap: "20px",
                maxWidth: "1000px",
                margin: "0 auto",
                overflow: "hidden"
              }}
            >
              {loveStoryData.map((story, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => openModal(story, index)}
                  style={{
                    position: "relative",
                    height: isMobile ? "200px" : "250px",
                    borderRadius: "8px",
                    overflow: "hidden",
                    cursor: "pointer",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
                  }}
                  whileHover={{ scale: 1.03 }}
                >
                  {/* Story Image with custom positioning */}
                  <div 
                    style={{
                      backgroundImage: `url(${story.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: story.imagePosition || "center center",
                      width: "100%",
                      height: "100%",
                      position: "relative",
                      transition: "transform 0.3s ease"
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
                        padding: "20px",
                        color: "white",
                        textAlign: "center"
                      }}
                    >
                      <h3 
                        style={{
                          fontSize: "20px",
                          marginBottom: "5px",
                          fontWeight: 600,
                          color: "#fff"
                        }}
                      >
                        {story.title}
                      </h3>
                      <p 
                        style={{
                          fontSize: "14px",
                          marginBottom: "0",
                          fontStyle: "italic",
                          color: "rgba(255,255,255,0.9)"
                        }}
                      >
                        {story.date}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal */}
        <AnimatePresence>
          {isModalOpen && selectedStory && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.9)",
                zIndex: 100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
                backdropFilter: "blur(5px)"
              }}
              onClick={closeModal}
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                style={{
                  maxWidth: "800px",
                  width: "100%",
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  overflow: "hidden",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                  position: "relative",
                  maxHeight: "90vh",
                  overflowY: "auto"
                }}
                onClick={(e) => e.stopPropagation()}
                ref={constraintsRef}
              >
                {/* Close Button */}
                <button 
                  onClick={closeModal}
                  style={{
                    position: "absolute",
                    top: "15px",
                    right: "15px",
                    background: "rgba(0,0,0,0.5)",
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
                    zIndex: 10
                  }}
                >
                  &times;
                </button>

                {/* Navigation Arrows */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateStories('prev');
                  }}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "15px",
                    background: "rgba(0,0,0,0.5)",
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
                    zIndex: 10,
                    transform: "translateY(-50%)"
                  }}
                >
                  &lt;
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateStories('next');
                  }}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "15px",
                    background: "rgba(0,0,0,0.5)",
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
                    zIndex: 10,
                    transform: "translateY(-50%)"
                  }}
                >
                  &gt;
                </button>

                {/* Modal Content with swipeable container */}
                <motion.div
                  drag="x"
                  dragConstraints={constraintsRef}
                  onDragEnd={(event, info) => {
                    if (info.offset.x > 50) {
                      navigateStories('prev');
                    } else if (info.offset.x < -50) {
                      navigateStories('next');
                    }
                  }}
                  style={{ x }}
                >
                  {/* Story Image with the same positioning as in card */}
                  <div 
                    style={{
                      backgroundImage: `url(${selectedStory.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: selectedStory.imagePosition || "center center",
                      width: "100%",
                      height: isMobile ? "250px" : "350px",
                      position: "relative"
                    }}
                  />

                  {/* Story Details */}
                  <div style={{ padding: "30px", color: "#333" }}>
                    <h3 
                      style={{
                        fontSize: "28px",
                        marginBottom: "10px",
                        fontWeight: 600,
                        color: "#222",
                        fontFamily: "'Cormorant Garamond', serif"
                      }}
                    >
                      {selectedStory.title}
                    </h3>
                    <p 
                      style={{
                        fontSize: "18px",
                        marginBottom: "20px",
                        fontStyle: "italic",
                        color: "#666"
                      }}
                    >
                      {selectedStory.date}
                    </p>
                    <p 
                      style={{
                        fontSize: "16px",
                        lineHeight: "1.8",
                        color: "#555"
                      }}
                    >
                      {selectedStory.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default LoveStorySection;