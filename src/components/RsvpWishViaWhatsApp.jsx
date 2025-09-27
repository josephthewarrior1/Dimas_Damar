import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { containerVariants, slideUp } from "./animations";
import { db } from "../config/firebaseConfig";
import { ref, push, onValue } from "firebase/database";
import invitationData from "../data/invitationData";

const RsvpWishSection = () => {
  const [params] = useSearchParams();
  const [guestName, setGuestName] = useState("");
  const [wish, setWish] = useState("");
  const [wishes, setWishes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);

  // Fungsi decode nama
  const decodeGuestName = (param) => {
    if (!param) return '';
    const decoded = decodeURIComponent(param);
    return decoded
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  useEffect(() => {
    // Coba ambil dari query string dulu
    let nameFromParam = params.get("to");
    
    // Jika tidak ada di query string, cek hash
    if (!nameFromParam) {
      const hash = window.location.hash;
      if (hash.startsWith("#to=")) {
        nameFromParam = hash.replace("#to=", "");
      }
    }
    
    setGuestName(decodeGuestName(nameFromParam) || "");
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!wish.trim()) {
      setSubmitError("Ucapan harus diisi");
      return;
    }

    if (alreadySubmitted) {
      setSubmitError("Anda sudah mengisi ucapan sebelumnya.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await push(ref(db, "rsvp"), {
        name: guestName,
        wish,
        createdAt: Date.now(),
      });

      setWish("");
      setAlreadySubmitted(true);
    } catch (error) {
      console.error("Error submitting wish:", error);
      setSubmitError("Gagal mengirim ucapan. Coba lagi nanti.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const rsvpRef = ref(db, "rsvp");

    const unsubscribe = onValue(rsvpRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedWishes = Object.entries(data)
          .map(([id, value]) => ({
            id,
            ...value,
          }))
          .sort((a, b) => b.createdAt - a.createdAt);

        setWishes(loadedWishes);

        if (guestName) {
          const hasSubmitted = loadedWishes.some(
            (w) => w.name.toLowerCase() === guestName.toLowerCase()
          );
          setAlreadySubmitted(hasSubmitted);
        }
      } else {
        setWishes([]);
      }
    });

    return () => unsubscribe();
  }, [guestName]);

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
        width: "100%",
        padding: "60px 20px",
        backgroundColor: "#ffffff",
        margin: "-10px auto",
        textAlign: "center",
        fontFamily: '"Cormorant Garamond", serif',
        boxSizing: "border-box",
        position: "relative",
        color: "#000",
        minHeight: "70vh",
      }}
    >
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
            marginBottom: "30px",
          }}
        >
          <motion.h2
            variants={slideUp}
            style={{
              textAlign: "center",
              fontSize: "1.8rem",
              fontWeight: 600,
              letterSpacing: "1px",
              margin: 0,
              lineHeight: "1.2",
              color: "#000",
              fontFamily: "'Playfair Display', serif", // 👉 ubah font jadi Playfair Display
            }}
          >
            WEDDING WISH
          </motion.h2>
          <motion.p
            variants={slideUp}
            style={{
              textAlign: "center",
              fontSize: "0.95rem",
              lineHeight: "1.5",
              color: "rgba(0,0,0,0.7)",
              marginTop: "10px",
            }}
          >
            Send Prayers & Best Wishes to the Bride and Groom
          </motion.p>
        </motion.div>

        {/* Scrollable Container */}
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
            backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(${invitationData.backgroundDesign})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderRadius: "12px",
            border: "1px solid rgba(0,0,0,0.2)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            scrollbarWidth: "thin",
            scrollbarColor: "#000 rgba(0,0,0,0.1)",
          }}
        >
          {/* Form Section */}
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
                  background: "rgba(0,0,0,0.05)",
                  color: "#000",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid rgba(0,0,0,0.2)",
                }}
              >
                {submitError}
              </motion.div>
            )}

            <motion.textarea
              variants={slideUp}
              placeholder="Tulis ucapan dan doa Anda di sini"
              value={wish}
              onChange={(e) => setWish(e.target.value)}
              rows={3}
              disabled={alreadySubmitted}
              style={{
                padding: "15px",
                borderRadius: "8px",
                fontFamily: '"Cormorant Garamond", serif',
                border: "1px solid rgba(0,0,0,0.3)",
                background: "rgba(255,255,255,0.7)",
                color: "#000",
                fontSize: "0.95rem",
                resize: "none",
              }}
            />

            <motion.button
              variants={slideUp}
              type="submit"
              disabled={isSubmitting || alreadySubmitted}
              style={{
                backgroundColor: alreadySubmitted ? "#ccc" : "#000",
                color: "#fff",
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
                  color: "#333",
                  marginTop: "10px",
                  fontSize: "0.9rem",
                }}
              >
                Terima kasih atas ucapan dan doanya
              </motion.div>
            )}
          </motion.form>

          {/* Wishes Section */}
          <motion.div
            variants={slideUp}
            style={{
              minHeight: wishes.length === 0 ? "0" : "auto",
              paddingBottom: wishes.length === 0 ? "0" : "10px",
            }}
          >
            {wishes.length === 0 ? (
              <p
                style={{
                  textAlign: "center",
                  color: "rgba(0,0,0,0.6)",
                  fontStyle: "italic",
                  margin: 0,
                }}
              >
                Belum ada ucapan yang ditulis.
              </p>
            ) : (
              wishes.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: "rgba(0,0,0,0.05)",
                    borderRadius: "8px",
                    padding: "16px",
                    marginBottom: "12px",
                    border: "1px solid rgba(0,0,0,0.1)",
                    color: "#000",
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
                        backgroundColor: "#847346",
                        color: "#fff",
                        fontWeight: "bold",
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: "10px",
                        fontFamily: '"Cormorant Garamond", serif',
                      }}
                    >
                      {item.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontWeight: "bold",
                          marginBottom: "4px",
                          color: "#000",
                          fontSize: "1rem",
                        }}
                      >
                        {item.name}
                      </div>
                      <div
                        style={{
                          fontSize: "0.9rem",
                          color: "#333",
                          lineHeight: "1.5",
                          marginBottom: "6px",
                        }}
                      >
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
        </motion.div>
      </div>
    </section>
  );
};

export default RsvpWishSection;
