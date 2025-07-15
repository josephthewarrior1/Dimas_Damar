import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { containerVariants, slideUp } from "./animations";
import { db } from "../config/firebaseConfig";
import { ref, push, onValue } from "firebase/database";
import invitationData from "../data/invitationData";

const RsvpWishSection = () => {
  const [params] = useSearchParams();
  const guestName = params.get("to") || "";
  const [wish, setWish] = useState("");
  const [wishes, setWishes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);

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
    new Date(timestamp).toLocaleString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        fontFamily: "Poppins, sans-serif",
        isolation: "isolate",
        color: "#fff",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${invitationData.rsvpImage})`,
          backgroundSize: "cover",
          backgroundPosition: "45% center",
          zIndex: 0,
          transition: "background 0.8s ease",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "60px 20px",
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
            textShadow: "0 1px 2px rgba(0,0,0,0.5)",
          }}
        >
          <motion.h2
            variants={slideUp}
            style={{
              textAlign: "center",
              fontSize: "3rem",
              marginBottom: "10px",
              translateY: "-50px",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Wedding Wish
          </motion.h2>
          <motion.p
            variants={slideUp}
            style={{
              textAlign: "center",
              fontSize: "0.9rem",
              marginBottom: "20px",
              translateY: "-50px",
            }}
          >
           Send Prayers & Best Wishes to the Bride and Groom
          </motion.p>
        </motion.div>

        {/* Combined scrollable container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            width: "100%",
            maxWidth: "600px",
            maxHeight: "70vh",
            overflowY: "auto",
            padding: "20px",
            borderRadius: "16px",
            transform: "translateY(-50px)",
          
          }}
        >
          {/* Form section */}
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
                  background: "#ffdddd",
                  color: "#cc0000",
                  padding: "10px",
                  borderRadius: "8px",
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
                padding: "10px",
                borderRadius: "12px",
                fontFamily: "'Playfair Display', serif",
                border: "1px solid #ccc",
                background: "rgba(255,255,255,0.9)",
              }}
            />

<motion.button
  variants={slideUp}
  type="submit"
  disabled={isSubmitting || alreadySubmitted}
  style={{
    background: alreadySubmitted ? "#999" : "#fff",
    color: "#222",
    padding: "12px",
    fontWeight: "bold",
    borderRadius: "24px",
    border: "none",
    cursor: alreadySubmitted ? "not-allowed" : "pointer",
    transition: "0.3s",
    display: "flex",
    fontFamily: "'Playfair Display', serif",
    justifyContent: "center", // Add this to center horizontally
    alignItems: "center", // Add this to center vertically
    margin: "0 auto", // Add this to help with centering
    width: "80%", // Adjust width as needed
  }}
>
  {alreadySubmitted
    ? "Sudah Mengisi"
    : isSubmitting
    ? "Mengirim..."
    : "Give your best wish"}
</motion.button>  

            {alreadySubmitted && (
              <motion.div
                variants={slideUp}
                style={{
                  textAlign: "center",
                  color: "#0f0",
                  marginTop: "10px",
                }}
              >
                Terima kasih atas ucapan dan doanya 🎉
              </motion.div>
            )}
          </motion.form>

          {/* Wishes section */}
          <motion.div variants={slideUp}>
           
            
            {wishes.length === 0 ? (
              <p style={{ textAlign: "center", color: "#fff" }}>
                Belum ada ucapan yang ditulis.
              </p>
            ) : (
              wishes.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: "rgba(255,255,255,0.9)",
                    borderRadius: "12px",
                    padding: "16px",
                    marginBottom: "12px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    color: "#333",
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
                        backgroundColor: "#fdbb3c",
                        color: "#fff",
                        fontWeight: "bold",
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: "10px",
                      }}
                    >
                      {item.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div
                        style={{
                          fontWeight: "bold",
                          marginBottom: "2px",
                          color: "#333",
                        }}
                      >
                        {item.name}
                      </div>
                      <div style={{ fontSize: "0.9rem", color: "#333" }}>
                        {item.wish}
                      </div>
                      <div
                        style={{
                          marginTop: "6px",
                          fontSize: "0.75rem",
                          color: "#999",
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