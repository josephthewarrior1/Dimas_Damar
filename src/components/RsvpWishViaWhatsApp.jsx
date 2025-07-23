import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { containerVariants, slideUp } from "./animations";
import invitationData from "../data/invitationData";
import { db } from "../config/firebaseConfig";
import { ref, query, orderByChild, equalTo, onValue } from "firebase/database";

const RsvpWishViaWhatsApp = () => {
  const [params] = useSearchParams();
  const fullCode = params.get("to") || "";
  const [coupleId, guestCode] = fullCode ? fullCode.split('_') : [null, null];
  const [name, setName] = useState("");
  const [attending, setAttending] = useState("yes");
  const [pax, setPax] = useState("");
  const [error, setError] = useState(null);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);

  const whatsappNumber = "628119660089"; // Ganti dengan nomor WA aktif

  // Fetch guest data from Firebase
  useEffect(() => {
    if (!coupleId || !guestCode) return;

    const guestRef = query(
      ref(db, `couples/${coupleId}/guests`),
      orderByChild('code'),
      equalTo(guestCode)
    );

    const unsubscribe = onValue(guestRef, (snapshot) => {
      if (snapshot.exists()) {
        const guests = snapshot.val();
        const [_, guestData] = Object.entries(guests)[0];
        setName(guestData.name || "");
        setAlreadySubmitted(!!guestData.rsvpSubmitted);
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

    if (!name.trim()) {
      setError("Harap isi nama Anda");
      return;
    }

    if (!pax && attending === "yes") {
      setError("Harap isi jumlah orang yang hadir");
      return;
    }

    const finalPax = attending === "yes" ? pax : "0";
    const status = attending === "yes" ? "Hadir" : "Tidak Hadir";

    const message = `Halo, saya *${name}* ingin RSVP:\n\n` +
                   `Status: ${status}\n` +
                   `${attending === "yes" ? `Jumlah orang: ${finalPax} pax\n` : ""}\n` +
                   `Terima kasih 🙏🏻`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    // Mark as submitted (you might want to update Firebase here)
    setAlreadySubmitted(true);
  };

  return (
    <section
      style={{
        position: "relative",
        minHeight: "50vh",
        overflow: "hidden",
        fontFamily: "Poppins, sans-serif",
        color: "#fff",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${invitationData.rsvpImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "40px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "500px",
          margin: "0 auto",
          height: "100%",
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            width: "100%",
            textAlign: "center",
            textShadow: "0 1px 3px rgba(0,0,0,0.5)",
          }}
        >
          <motion.h2
            variants={slideUp}
            style={{
              fontSize: "3.5rem",
              fontFamily: "'Playfair Display', serif",
              marginBottom: "25px",
              lineHeight: "1",
            }}
          >
            RSVP
          </motion.h2>

          <motion.p
            variants={slideUp}
            style={{
              fontSize: "0.85rem",
              marginBottom: "20px",
              lineHeight: "1.5",
            }}
          >
            It would be such an honor and joy if you could <br />attend
            and share your blessings with us.<br />Thank you from our hearts.
          </motion.p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          variants={slideUp}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            background: "transparent",
            borderRadius: "12px",
            padding: "20px",
            width: "100%",
            maxWidth: "400px",
            color: "#fff",
          }}
        >
          {error && (
            <div
              style={{
                backgroundColor: "rgba(255, 0, 0, 0.2)",
                color: "#fff",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                fontSize: "0.8rem",
              }}
            >
              {error}
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column" }}>
            <input
              type="text"
              value={name}
              placeholder="Nama Anda"
              onChange={(e) => setName(e.target.value)}
              disabled={alreadySubmitted}
              style={{
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid rgba(255,255,255,0.5)",
                background: "transparent",
                color: "#fff",
                fontSize: "0.85rem",
                opacity: alreadySubmitted ? 0.7 : 1,
              }}
            />
          </div>

          {/* Konfirmasi Section */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <p style={{ 
              fontSize: "0.9rem",
              marginBottom: "5px",
              fontWeight: "500"
            }}>
              Konfirmasi
            </p>
            
            <div style={{ 
              display: "flex", 
              gap: "15px",
              justifyContent: "flex-start",
              fontSize: "0.85rem"
            }}>
              <label style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "6px",
                marginRight: "20px"
              }}>
                <input
                  type="radio"
                  name="attending"
                  value="yes"
                  checked={attending === "yes"}
                  onChange={(e) => {
                    setAttending(e.target.value);
                    setError(null);
                  }}
                  disabled={alreadySubmitted}
                  style={{ width: "14px", height: "14px" }}
                />
                Hadir
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <input
                  type="radio"
                  name="attending"
                  value="no"
                  checked={attending === "no"}
                  onChange={(e) => {
                    setAttending(e.target.value);
                    setError(null);
                  }}
                  disabled={alreadySubmitted}
                  style={{ width: "14px", height: "14px" }}
                />
                Tidak Hadir
              </label>
            </div>
          </div>

          {attending === "yes" && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <input
                type="number"
                min="1"
                max="5"
                value={pax}
                onChange={handlePaxChange}
                placeholder="Jumlah orang (1-5)"
                disabled={alreadySubmitted}
                style={{
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid rgba(255,255,255,0.5)",
                  background: "transparent",
                  color: "#fff",
                  fontSize: "0.85rem",
                  opacity: alreadySubmitted ? 0.7 : 1,
                }}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={alreadySubmitted}
            style={{
              backgroundColor: alreadySubmitted ? "rgba(255,255,255,0.2)" : "transparent",
              color: "#fff",
              fontWeight: "bold",
              padding: "10px",
              borderRadius: "20px",
              border: "1px solid #fff",
              cursor: alreadySubmitted ? "not-allowed" : "pointer",
              fontSize: "0.85rem",
              marginTop: "5px",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              if (!alreadySubmitted) {
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
              }
            }}
            onMouseOut={(e) => {
              if (!alreadySubmitted) {
                e.target.style.backgroundColor = "transparent";
              }
            }}
          >
            {alreadySubmitted ? "RSVP Terkirim" : "Kirim via WhatsApp"}
          </button>

          {alreadySubmitted && (
            <p style={{
              fontSize: "0.8rem",
              textAlign: "center",
              color: "rgba(255,255,255,0.8)",
              marginTop: "10px"
            }}>
              Terima kasih telah mengkonfirmasi kehadiran Anda
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
};

export default RsvpWishViaWhatsApp;