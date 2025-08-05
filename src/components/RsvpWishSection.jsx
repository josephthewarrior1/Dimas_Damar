import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { containerVariants, slideUp } from "./animations";
import { db } from "../config/firebaseConfig";
import { ref, query, orderByChild, equalTo, onValue, update } from "firebase/database";
import invitationData from "../data/invitationData";

const RsvpWishSection = () => {
  const [params] = useSearchParams();
  const fullParam = params.get("to") || "";
  
  // Pisahkan parameter menjadi coupleId dan guestCode
  const [coupleId, guestCode] = fullParam.split('_');
  
  const [guestName, setGuestName] = useState("Tamu Undangan");
  const [guestId, setGuestId] = useState("");
  const [wish, setWish] = useState("");
  const [wishes, setWishes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);

  // 1. Cari data tamu berdasarkan guestCode
  useEffect(() => {
    if (!coupleId || !guestCode) {
      setSubmitError("Link undangan tidak valid");
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
        const [foundGuestId, guestData] = Object.entries(guests)[0];
        setGuestName(guestData.name || "Tamu Undangan");
        setGuestId(foundGuestId);
        setAlreadySubmitted(!!guestData.wish);
        setSubmitError(null);
      } else {
        setSubmitError("Tamu tidak ditemukan");
      }
    });

    return () => unsubscribe();
  }, [coupleId, guestCode]);

  // 2. Load semua wishes yang sudah diisi
  useEffect(() => {
    if (!coupleId) return;

    const guestsRef = ref(db, `couples/${coupleId}/guests`);
    
    const unsubscribe = onValue(guestsRef, (snapshot) => {
      const guests = snapshot.val();
      if (!guests) {
        setWishes([]);
        return;
      }

      const loadedWishes = Object.entries(guests)
        .filter(([_, guest]) => guest.wish) // Hanya ambil yang punya wish
        .map(([id, guest]) => ({
          id,
          name: guest.name,
          wish: guest.wish,
          createdAt: guest.createdAt
        }))
        .sort((a, b) => b.createdAt - a.createdAt); // Urutkan terbaru dulu

      setWishes(loadedWishes);
    });

    return () => unsubscribe();
  }, [coupleId]);

  // 3. Handle submit wish
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!wish.trim()) {
      setSubmitError("Ucapan harus diisi");
      return;
    }

    if (alreadySubmitted) {
      setSubmitError("Anda sudah mengisi ucapan sebelumnya");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await update(ref(db, `couples/${coupleId}/guests/${guestId}`), {
        wish,
        createdAt: Date.now()
      });

      setWish("");
      setAlreadySubmitted(true);
    } catch (error) {
      console.error("Error submitting wish:", error);
      setSubmitError("Gagal mengirim ucapan");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (timestamp) =>
    new Date(timestamp).toLocaleString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });


  return (
    <section
      style={{
        width: '100%',
        padding: '60px 20px',
        backgroundColor: '#ffffff',
        margin: '-10px auto',
        textAlign: 'center',
        fontFamily: '"Cormorant Garamond", serif',
        boxSizing: 'border-box',
        position: 'relative',
        color: '#000000',
        minHeight: '70vh'
      }}
    >
      {/* Floral Ornament - Top Left */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '120px',
        height: '120px',
        backgroundImage: `url(${invitationData.bunga})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left top',
        opacity: 0.2,
        
      }}></div>

      {/* Floral Ornament - Top Right */}
      <div style={{
        position: 'absolute',
        top: '0',
        right: '0',
        width: '120px',
        height: '120px',
        backgroundImage: `url(${invitationData.bunga})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right top',
        opacity: 0.2,
        transform: 'rotate(180deg)'
      }}></div>


      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            maxWidth: "600px",
            width: "100%",
            marginBottom: '30px'
          }}
        >
          <motion.h2
            variants={slideUp}
            style={{
              textAlign: "center",
              fontSize: "1.8rem",
              fontWeight: 500,
              letterSpacing: '1px',
              margin: 0,
              lineHeight: '1.1',
              color: '#000000',
              fontFamily: "'Playfair Display', serif",
            }}
          >
            WEDDING WISH
          </motion.h2>
          <motion.p
            variants={slideUp}
            style={{
              textAlign: "center",
              fontSize: "0.95rem",
              lineHeight: '1.5',
              color: 'rgba(0,0,0,0.8)',
              marginTop: '10px'
            }}
          >
            {guestName}, kirimkan doa dan ucapan untuk mempelai
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            width: "100%",
            maxWidth: "600px",
            height: wishes.length > 0 ? "60vh" : "auto",
            overflowY: wishes.length > 0 ? "auto" : "visible",
            padding: "20px",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            border: "1px solid rgba(0, 0, 0, 0.2)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            scrollbarWidth: "thin",
            scrollbarColor: "#555555 rgba(0,0,0,0.1)",
          }}
        >
          {submitError && !guestId && (
            <motion.div
              variants={slideUp}
              style={{
                background: "rgba(255, 0, 0, 0.1)",
                color: "#cc0000",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid rgba(255, 0, 0, 0.3)",
                marginBottom: "20px"
              }}
            >
              {submitError}
            </motion.div>
          )}

          {guestId && (
            <>
              <motion.form
                onSubmit={handleSubmit}
                variants={slideUp}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  marginBottom: "30px",
                }}
              >
                {submitError && (
                  <motion.div
                    variants={slideUp}
                    style={{
                      background: "rgba(255, 0, 0, 0.1)",
                      color: "#cc0000",
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid rgba(255, 0, 0, 0.3)"
                    }}
                  >
                    {submitError}
                  </motion.div>
                )}

                <motion.textarea
                  variants={slideUp}
                  placeholder="Tulis ucapan dan doa Anda disini"
                  value={wish}
                  onChange={(e) => setWish(e.target.value)}
                  rows={3}
                  disabled={alreadySubmitted}
                  style={{
                    padding: "15px",
                    borderRadius: "8px",
                    fontFamily: '"Cormorant Garamond", serif',
                    border: "1px solid rgba(0,0,0,0.3)",
                    background: "rgba(255,255,255,0.9)",
                    color: "#000000",
                    fontSize: "0.95rem",
                    resize: "none",
                  }}
                />

                <motion.button
                  variants={slideUp}
                  type="submit"
                  disabled={isSubmitting || alreadySubmitted}
                  style={{
                    backgroundColor: alreadySubmitted ? "#cccccc" : "#BFA980",
                    color: "white",
                    border: "none",
                    padding: "12px 25px",
                    fontSize: "0.95rem",
                    borderRadius: "30px",
                    cursor: alreadySubmitted ? "not-allowed" : "pointer",
                    transition: "all 0.3s ease",
                    fontFamily: '"Cormorant Garamond", serif',
                    letterSpacing: "1px",
                    margin: "0 auto",
                    width: "80%",
                  }}
                  whileHover={!alreadySubmitted && !isSubmitting ? { scale: 1.02 } : {}}
                >
                  {alreadySubmitted
                    ? "Sudah Mengisi"
                    : isSubmitting
                    ? "Mengirim..."
                    : "Kirim Ucapan"}
                </motion.button>

                {alreadySubmitted && (
                  <motion.div
                    variants={slideUp}
                    style={{
                      textAlign: "center",
                      color: "#555555",
                      marginTop: "10px",
                      fontSize: "0.9rem"
                    }}
                  >
                    Terima kasih atas ucapan dan doanya
                  </motion.div>
                )}
              </motion.form>

              <motion.div 
                variants={slideUp}
                style={{
                  minHeight: wishes.length === 0 ? "0" : "auto",
                  paddingBottom: wishes.length === 0 ? "0" : "10px"
                }}
              >
                {wishes.length === 0 ? (
                  <p style={{ 
                    textAlign: "center", 
                    color: "rgba(0,0,0,0.7)",
                    fontStyle: "italic",
                    margin: 0
                  }}>
                    Belum ada ucapan yang ditulis.
                  </p>
                ) : (
                  wishes.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        background: "rgba(255,255,255,0.9)",
                        borderRadius: "8px",
                        padding: "16px",
                        marginBottom: "12px",
                        border: "1px solid rgba(0,0,0,0.1)",
                        color: "#000000",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "6px",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: "#BFA980",
                            color: "#fff",
                            fontWeight: "bold",
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: "10px",
                            fontFamily: '"Cormorant Garamond", serif'
                          }}
                        >
                          {item.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              fontWeight: "bold",
                              marginBottom: "4px",
                              color: "#000000",
                              fontSize: "1rem"
                            }}
                          >
                            {item.name}
                          </div>
                          <div style={{ 
                            fontSize: "0.9rem", 
                            color: "rgba(0,0,0,0.8)",
                            lineHeight: "1.5",
                            marginBottom: "6px"
                          }}>
                            {item.wish}
                          </div>
                          <div
                            style={{
                              fontSize: "0.75rem",
                              color: "rgba(0,0,0,0.5)",
                            }}
                          >
                            {formatDate(item.createdAt)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default RsvpWishSection;