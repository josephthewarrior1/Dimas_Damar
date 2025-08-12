import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "../config/firebaseConfig";
import { ref, query, orderByChild, equalTo, onValue } from "firebase/database";
import invitationData from "../data/invitationData";

const RsvpWishViaWhatsApp = () => {
  const [params] = useSearchParams();
  const fullParam = params.get("to") || "";
  const [coupleId, guestCode] = fullParam.split('_');
  
  const [guestName, setGuestName] = useState("Tamu Undangan");
  const [attending, setAttending] = useState(null);
  const [pax, setPax] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const whatsappNumber = "628119660089";

  useEffect(() => {
    if (!coupleId || !guestCode) {
      setError("Link undangan tidak valid");
      return;
    }

    const guestRef = query(
      ref(db, `couples/${coupleId}/guests`),
      orderByChild('code'),
      equalTo(guestCode)
    );

    const unsubscribe = onValue(guestRef, (snapshot) => {
      if (snapshot.exists()) {
        const guests = snapshot.val();
        const [_, guestData] = Object.entries(guests)[0];
        setGuestName(guestData.name || "Tamu Undangan");
        setError(null);
      } else {
        setError("Tamu tidak ditemukan");
      }
    });

    return () => unsubscribe();
  }, [coupleId, guestCode]);

  const handlePaxChange = (e) => {
    let value = e.target.value;
    if (value === "" || /^[1-5]$/.test(value)) {
      setPax(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (attending === null) {
      setError("Please select your attendance status");
      return;
    }

    if (attending === "yes" && !pax) {
      setError("Please select number of guests");
      return;
    }

    setError(null);
    setIsSubmitted(true);
    setShowConfetti(true);

    // Prepare WhatsApp message
    const statusText = attending === "yes" 
      ? `Hadir (${pax} orang)` 
      : "Tidak Hadir";
    
    const message = `Halo, saya *${guestName}* ingin RSVP:\n\nStatus: ${statusText}\n\nTerima kasih 🙏🏻`;

    // Auto redirect after animation
    setTimeout(() => {
      const url = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;
      window.location.href = url;
    }, 3000);
  };

  const Confetti = () => {
    return (
      <div className="confetti-container">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="confetti"
            initial={{ 
              x: Math.random() * 100 - 50,
              y: -10,
              rotate: 0,
              opacity: 1
            }}
            animate={{
              y: [0, window.innerHeight],
              x: [0, Math.random() * 200 - 100],
              rotate: [0, Math.random() * 360],
              opacity: [1, 0]
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              ease: "linear",
              repeat: Infinity,
              repeatDelay: Math.random() * 5
            }}
            style={{
              position: "absolute",
              width: "8px",
              height: "8px",
              backgroundColor: [
                "#BFA980",
                "#fff",
                "#e0c097",
                "#f8f8f8"
              ][Math.floor(Math.random() * 4)],
              borderRadius: "50%",
              zIndex: 10
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <section
      style={{
        position: "relative",
        minHeight: "50vh",
        overflow: "hidden",
        fontFamily: "'Cormorant Garamond', serif",
        color: "#fff",
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px"
      }}
    >
      {showConfetti && <Confetti />}

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url('https://www.transparenttextures.com/patterns/concrete-wall.png')",
          opacity: 0.05,
          zIndex: 0
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "500px",
          background: "rgba(20, 20, 20, 0.8)",
          borderRadius: "16px",
          padding: "30px 20px", // Reduced padding here
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
          border: "1px solid rgba(191, 169, 128, 0.3)"
        }}
      >
        <AnimatePresence>
          {!isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div style={{ textAlign: "center", marginBottom: "30px" }}> {/* Reduced margin */}
                <motion.h2
                  style={{
                    fontSize: "2.2rem", // Slightly smaller font
                    fontWeight: 400,
                    fontFamily: "'Playfair Display', serif",
                    marginBottom: "10px", // Reduced margin
                    color: "#BFA980",
                    letterSpacing: "1px"
                  }}
                >
                  RSVP
                </motion.h2>
                <motion.p
                  style={{
                    fontSize: "1rem", // Slightly smaller font
                    lineHeight: 1.6,
                    fontWeight: 300,
                    opacity: 0.9,
                    color: "#ddd"
                  }}
                >
                  We sincerely hope you can join us on our special day
                </motion.p>
              </div>

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "20px" }}> {/* Reduced margin */}
                  <label 
                    style={{
                      display: "block",
                      marginBottom: "8px", // Reduced margin
                      fontSize: "0.95rem", // Slightly smaller font
                      color: "#BFA980",
                      letterSpacing: "0.5px"
                    }}
                  >
                    Your Name
                  </label>
                  <div
                    style={{
                      padding: "12px", // Reduced padding
                      borderRadius: "8px",
                      border: "1px solid rgba(191, 169, 128, 0.3)",
                      background: "rgba(191, 169, 128, 0.05)",
                      color: "#fff",
                      fontSize: "1rem", // Slightly smaller font
                      textAlign: "center"
                    }}
                  >
                    {guestName}
                  </div>
                </div>

                <div style={{ marginBottom: "20px" }}> {/* Reduced margin */}
                  <label 
                    style={{
                      display: "block",
                      marginBottom: "12px", // Adjusted margin
                      fontSize: "0.95rem", // Slightly smaller font
                      color: "#BFA980",
                      letterSpacing: "0.5px",
                      textAlign: "center"
                    }}
                  >
                    Will you be attending?
                  </label>
                  <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}> {/* Reduced gap */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <button
                        type="button"
                        onClick={() => setAttending("yes")}
                        style={{
                          padding: "10px 20px", // Reduced padding
                          borderRadius: "50px",
                          background: attending === "yes" ? "#BFA980" : "transparent",
                          color: attending === "yes" ? "#111" : "#BFA980",
                          border: "1px solid #BFA980",
                          cursor: "pointer",
                          fontSize: "0.95rem", // Slightly smaller font
                          fontFamily: "'Cormorant Garamond', serif",
                          fontWeight: 500,
                          transition: "all 0.3s ease",
                          minWidth: "110px" // Slightly smaller width
                        }}
                      >
                        Accept
                      </button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <button
                        type="button"
                        onClick={() => setAttending("no")}
                        style={{
                          padding: "10px 20px", // Reduced padding
                          borderRadius: "50px",
                          background: attending === "no" ? "#BFA980" : "transparent",
                          color: attending === "no" ? "#111" : "#BFA980",
                          border: "1px solid #BFA980",
                          cursor: "pointer",
                          fontSize: "0.95rem", // Slightly smaller font
                          fontFamily: "'Cormorant Garamond', serif",
                          fontWeight: 500,
                          transition: "all 0.3s ease",
                          minWidth: "110px" // Slightly smaller width
                        }}
                      >
                        Decline
                      </button>
                    </motion.div>
                  </div>
                </div>

                {attending === "yes" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.5 }}
                    style={{ marginBottom: "20px", overflow: "hidden" }} 
                  >
                    <label 
                      style={{
                        display: "block",
                        marginBottom: "8px", // Reduced margin
                        fontSize: "0.95rem", // Slightly smaller font
                        color: "#BFA980",
                        letterSpacing: "0.5px"
                      }}
                    >
                      Number of Guests
                    </label>
                    <div style={{ position: "relative" }}>
                      <select
                        value={pax}
                        onChange={(e) => setPax(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "12px", // Reduced padding
                          borderRadius: "8px",
                          border: "1px solid rgba(191, 169, 128, 0.3)",
                          background: "rgba(20, 20, 20, 0.8)", // Darker background
                          color: "#fff", // White text
                          fontSize: "0.95rem", // Slightly smaller font
                          appearance: "none",
                          cursor: "pointer"
                        }}
                      >
                        <option value="" style={{ color: "#aaa", backgroundColor: "#141414" }}>
                          Select number
                        </option>
                        {[1, 2, 3, 4, 5].map(num => (
                          <option 
                            key={num} 
                            value={num}
                            style={{ 
                              color: "#fff", 
                              backgroundColor: "#141414",
                              padding: "8px"
                            }}
                          >
                            {num} {num > 1 ? "guests" : "guest"}
                          </option>
                        ))}
                      </select>
                      <div style={{
                        position: "absolute",
                        right: "15px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        pointerEvents: "none"
                      }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#BFA980" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      color: "#ff6b6b",
                      textAlign: "center",
                      margin: "15px 0", // Reduced margin
                      fontSize: "0.9rem"
                    }}
                  >
                    {error}
                  </motion.div>
                )}

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ textAlign: "center" }}
                >
                  <button
                    type="submit"
                    disabled={attending === null || (attending === "yes" && !pax)}
                    style={{
                      padding: "12px 30px", // Reduced padding
                      borderRadius: "50px",
                      background: "#BFA980",
                      border: "none",
                      color: "#111",
                      fontSize: "0.95rem", // Slightly smaller font
                      fontWeight: 500,
                      cursor: "pointer",
                      fontFamily: "'Cormorant Garamond', serif",
                      letterSpacing: "1px",
                      transition: "all 0.3s ease",
                      opacity: (attending === null || (attending === "yes" && !pax)) ? 0.5 : 1,
                      pointerEvents: (attending === null || (attending === "yes" && !pax)) ? "none" : "auto"
                    }}
                  >
                    Send Response
                  </button>
                </motion.div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                textAlign: "center",
                padding: "20px"
              }}
            >
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 0.5 }}
                style={{ marginBottom: "20px" }} // Reduced margin
              >
                <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#BFA980" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </motion.div>
              <h3 style={{
                fontSize: "1.6rem", // Slightly smaller font
                fontWeight: 400,
                color: "#BFA980",
                marginBottom: "10px", // Reduced margin
                fontFamily: "'Playfair Display', serif"
              }}>
                Thank You!
              </h3>
              <p style={{
                fontSize: "1rem", // Slightly smaller font
                lineHeight: 1.6,
                color: "#ddd",
                marginBottom: "20px" // Reduced margin
              }}>
                Your response has been recorded. We appreciate your confirmation!
              </p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                style={{
                  fontSize: "0.85rem", // Slightly smaller font
                  color: "#aaa",
                  marginTop: "30px" // Reduced margin
                }}
              >
                Redirecting to WhatsApp...
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Decorative elements */}
        <div style={{
          position: "absolute",
          top: "15px", // Adjusted position
          left: "15px", // Adjusted position
          width: "30px", // Smaller size
          height: "30px", // Smaller size
          borderTop: "1px solid #BFA980",
          borderLeft: "1px solid #BFA980",
          opacity: 0.5
        }}></div>
        <div style={{
          position: "absolute",
          bottom: "15px", // Adjusted position
          right: "15px", // Adjusted position
          width: "30px", // Smaller size
          height: "30px", // Smaller size
          borderBottom: "1px solid #BFA980",
          borderRight: "1px solid #BFA980",
          opacity: 0.5
        }}></div>
      </div>
    </section>
  );
};

export default RsvpWishViaWhatsApp;