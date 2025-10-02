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

  // Timeline Love Story Data
  const loveStoryData = [
    {
      image: invitationData.loveImages[0],
      title: "Awal mula tahu dan kenal",
      date: "2017",
      description: "Pertemuan kami yang pertama kali, yaitu bermula pada saat kegiatan remaja SSOT di Semarang. Pada waktu itu, awalnya kami hanya sebagai peserta kegiatan SSOT dan hanya sebagai mahasiswi yang membantu pelayanan pada kegiatan tersebut. Namun tak pernah kami membayangkan hanya sebatas mengenal di ruang kegiatan pelayanan remaja di Semarang, Tuhan ternyata sedang mempersiapkan kisah-kisah indah yang tak pernah kami bayangkan.",
      imagePosition: "center 30%",
      backgroundSize: "cover"
    },
    {
      image: invitationData.loveImages[1],
      title: "Ketidaksengajaan bertemu",
      date: "2018",
      description: "Di tahun sebelumnya masing-masing dari kami sempat bertukar kontak telepon, namun komunikasi kami hanya sekadar memberikan informasi yang umum mengenai kehidupan menjadi mahasiswa di Kampus. Karena di tahun ini kami memiliki fokus kegiatan masing-masing, yaitu Dimas memasuki perkuliahan dan Damar sedang menempuh Pelatihan Sepenuh Waktu. Namun, mendekati di penghujung tahun tersebut kami tidak sengaja bertemu di Madiun ketika salah satu dari kami sedang libur kuliah dan yang lain sedang kegiatan Fieldwork. Setelah selesai, kami kembali pada kegiatan kami yang sebelumnya, dan setelah dari situlah kami tidak pernah lagi berkomunikasi selama kurang lebih dalam kurun waktu 4 tahun.",
      imagePosition: "center 40%",
      backgroundSize: "cover"
    },
    {
      image: invitationData.loveImages[2],
      title: "Tuhan kembali pertemukan",
      date: "2022",
      description: "Singkat cerita, setelah lost contact dalam kurun waktu kurang lebih 4 tahun, masing-masing dari kami sudah tidak mengetahui nomor telepon karena sudah berganti nomor. Walaupun demikian Tuhan melalui kedaulatan-Nya kembali mempertemukan kami pada bulan Juni 2022 saat pernikahan rekan fulltimer di Bandung. Kami kembali berkomunikasi mengenai transportasi kedatangan untuk menghadiri pernikahan tersebut. Dari situlah kami kembali memiliki nomor telepon satu sama lain. Tak menyangka hari yang singkat itu menjadi awal bagi kami untuk kembali berkomunikasi secara intens sampai sekarang.",
      imagePosition: "center 40%",
      backgroundSize: "cover"
    },
    {
      image: invitationData.loveImages[3],
      title: "Terpisah kembali",
      date: "2023",
      description: "Waktu 2 tahun yang telah berlalu begitu cepat tidak mudah bagi kami menjalani kisah ini. Kami bersyukur bahwa sampai pada akhir di tahun ini Tuhan tetap memberikan kasih dan kesetiaan-Nya serta tetap menjaga kami. Di momen inilah kami kembali membangun dan menjalin komunikasi yang intens melalui voice call dan video call yang menjadi teman setia dalam setiap tawa, cerita, dan doa. Melalui mengenal kembali satu sama lain, hati kami semakin yakin untuk melangkah maju bertemu keluarga, agar kami lebih dapat saling mengenal. Langkah sederhana ini menjadi momen penting dalam kisah kami.",
      imagePosition: "center center", // Posisi center untuk zoom out
      backgroundSize: "contain", // Zoom out - menampilkan seluruh gambar
      backgroundColor: "#f5f5f5" // Background color untuk fill area kosong
    },
    {
      image: invitationData.loveImages[5],
      title: "Saling mengenal",
      date: "2024",
      description: "Waktu 2 tahun yang telah berlalu begitu cepat tidak mudah bagi kami menjalani kisah ini. Kami bersyukur bahwa sampai pada akhir di tahun ini Tuhan tetap memberikan kasih dan kesetiaan-Nya serta tetap menjaga kami. Di momen inilah kami kembali membangun dan menjalin komunikasi yang intens melalui voice call dan video call yang menjadi teman setia dalam setiap tawa, cerita, dan doa. Melalui mengenal kembali satu sama lain, hati kami semakin yakin untuk melangkah maju bertemu keluarga, agar kami lebih dapat saling mengenal. Langkah sederhana ini menjadi momen penting dalam kisah kami.",
      imagePosition: "center center", // Posisi center untuk zoom out
      backgroundSize: "contain", // Zoom out - menampilkan seluruh gambar
      backgroundColor: "#f5f5f5" // Background color untuk fill area kosong
    },
    {
      image: invitationData.loveImages[4],
      title: "Melangkah dengan serius",
      date: "2025",
      description: "Waktu 2 tahun yang telah berlalu begitu cepat tidak mudah bagi kami menjalani kisah ini. Kami bersyukur bahwa sampai pada akhir di tahun ini Tuhan tetap memberikan kasih dan kesetiaan-Nya serta tetap menjaga kami. Di momen inilah kami kembali membangun dan menjalin komunikasi yang intens melalui voice call dan video call yang menjadi teman setia dalam setiap tawa, cerita, dan doa. Melalui mengenal kembali satu sama lain, hati kami semakin yakin untuk melangkah maju bertemu keluarga, agar kami lebih dapat saling mengenal. Langkah sederhana ini menjadi momen penting dalam kisah kami.",
      imagePosition: "center center", // Posisi center untuk zoom out
      backgroundSize: "contain", // Zoom out - menampilkan seluruh gambar
      backgroundColor: "#f5f5f5" // Background color untuk fill area kosong
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

  // Handle image click for navigation
  const handleImageClick = (e) => {
    const imageWidth = e.currentTarget.offsetWidth;
    const clickX = e.nativeEvent.offsetX;
    
    // Jika klik di bagian kiri gambar (40% kiri), navigasi ke sebelumnya
    if (clickX < imageWidth * 0.4) {
      navigateStories('prev');
    } 
    // Jika klik di bagian kanan gambar (40% kanan), navigasi ke selanjutnya
    else if (clickX > imageWidth * 0.6) {
      navigateStories('next');
    }
    // Jika klik di tengah (20% tengah), tidak melakukan apa-apa
    else {
      console.log('Clicked center of image');
    }
  };

  // Swipe gesture logic
  const x = useMotionValue(0);

  return (
    <section 
      style={{
        position: "relative",
        padding: "60px 0",
        color: "#fff",
        fontFamily: "'Cormorant Garamond', serif",
        overflow: "hidden",
        backgroundImage: `url(${invitationData.background})`,
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
            }}
            whileHover={{ scale: 1.05, background: "rgba(255,255,255,0.1)" }}
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
                    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                    backgroundColor: story.backgroundColor || "transparent" // Background color untuk kartu
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Story Image with custom positioning and size */}
                  <div 
                    style={{
                      backgroundImage: `url(${story.image})`,
                      backgroundSize: story.backgroundSize || "cover",
                      backgroundPosition: story.imagePosition || "center center",
                      backgroundRepeat: "no-repeat",
                      width: "100%",
                      height: "100%",
                      position: "relative",
                    }}
                  >
                    {/* Story Content Overlay */}
                    <div 
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: story.backgroundSize === "contain" 
                          ? "linear-gradient(to top, rgba(0,0,0,0.9), transparent)" 
                          : "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
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

                {/* Modal Content */}
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
                  {/* Story Image - Now with zoom out capability */}
                  <div 
                    onClick={handleImageClick}
                    style={{
                      backgroundImage: `url(${selectedStory.image})`,
                      backgroundSize: selectedStory.backgroundSize || "cover",
                      backgroundPosition: selectedStory.imagePosition || "center center",
                      backgroundRepeat: "no-repeat",
                      backgroundColor: selectedStory.backgroundColor || "transparent",
                      width: "100%",
                      height: isMobile ? "250px" : "350px",
                      position: "relative",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    {/* Navigation Hints Overlay */}
                    <div style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "20px",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                      background: selectedStory.backgroundSize === "contain" 
                        ? "linear-gradient(90deg, rgba(0,0,0,0.3) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.3) 100%)"
                        : "linear-gradient(90deg, rgba(0,0,0,0.2) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.2) 100%)",
                      pointerEvents: "none"
                    }}
                    className="image-navigation-overlay"
                    >
                      <div style={{
                        width: "40%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        color: "white",
                        fontSize: "24px",
                        fontWeight: "bold",
                        textShadow: "2px 2px 4px rgba(0,0,0,0.5)"
                      }}>
                        ‹
                      </div>
                      <div style={{
                        width: "40%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        color: "white",
                        fontSize: "24px",
                        fontWeight: "bold",
                        textShadow: "2px 2px 4px rgba(0,0,0,0.5)"
                      }}>
                        ›
                      </div>
                    </div>
                  </div>

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

      <style jsx>{`
        .image-navigation-overlay:hover {
          opacity: 1 !important;
        }
        
        @media (max-width: 768px) {
          .image-navigation-overlay {
            opacity: 0.3 !important;
          }
        }
      `}</style>
    </section>
  );
};

export default LoveStorySection;