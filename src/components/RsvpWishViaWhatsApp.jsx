import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { containerVariants, slideUp } from "./animations";
import { db } from "../config/firebaseConfig";
import { ref, query, orderByChild, equalTo, onValue } from "firebase/database";
import invitationData from "../data/invitationData";

const RsvpWishViaWhatsApp = () => {
  const [params] = useSearchParams();
  const fullParam = params.get("to") || "";
  
  // Pisahkan parameter menjadi coupleId dan guestCode
  const [coupleId, guestCode] = fullParam.split('_');
  
  const [guestName, setGuestName] = useState("Tamu Undangan");
  const [attending, setAttending] = useState("yes");
  const [pax, setPax] = useState("");
  const [error, setError] = useState(null);

  const whatsappNumber = "628119660089"; // ← Ganti dengan nomor WA aktif

  // Cari data tamu berdasarkan guestCode
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
    
    // Only allow numbers and empty string
    if (value === "" || /^[1-5]$/.test(value)) {
      setPax(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!guestName.trim() || guestName === "Tamu Undangan") {
      setError("Nama tamu tidak valid");
      return;
    }

    if (!pax && attending === "yes") {
      setError("Harap isi jumlah orang yang hadir");
      return;
    }

    const finalPax = attending === "yes" ? pax : "0";

    const message = `Halo, saya *${guestName}* ingin RSVP:\n\nStatus: ${attending === "yes" ? "Hadir" : "Tidak Hadir"}\n${attending === "yes" ? `Jumlah orang: ${finalPax} pax` : ""}\n\nTerima kasih 🙏🏻`;

    const url = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;
    window.location.href = url;
  };

  return (
    <section
      style={{
        position: "relative",
        minHeight: "80vh",
        overflow: "hidden",
        fontFamily: "Poppins, sans-serif",
        color: "#000",
        backgroundColor: "#fff"
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#fff",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "50px 50px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "500px",
          margin: "-70px auto",
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
          }}
        >
          <motion.h2
            variants={slideUp}
            style={{
              fontSize: "3.5rem",
              fontWeight: "500", 
              fontFamily: "'Playfair Display', serif",
              marginBottom: "25px",
              lineHeight: "1",
              color: "#000",
              fontWeight: 300
            }}
          >
            RSVP
          </motion.h2>

          <motion.p
            variants={slideUp}
            style={{
              fontSize: "1.0rem",
              lineHeight: 2,
              fontStyle: "normal",
              fontWeight: 300,
              fontFamily: "'Cormorant Garamond', serif",
              opacity: 0.9,
              color: "#000"
            }}
          >
            We'd love to hear from you!<br/>
            Please fill out the confirmation below:
          </motion.p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          variants={slideUp}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "40px",
            background: "transparent",
            borderRadius: "12px",
            padding: "20px",
            width: "100%",
            maxWidth: "350px",
            color: "#000",
          }}
        >
          {error && (
            <div
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                color: "#000",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid rgba(0, 0, 0, 0.3)",
                fontSize: "0.8rem",
                width: "100%",
              }}
            >
              {error}
            </div>
          )}

          {/* Name Field */}
          <div style={{ width: "100%" }}>
            <label 
              htmlFor="nameInput"
              style={{
                display: "block",
                marginBottom: "8px",
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.1rem",
                color: "#000",
                fontWeight: 300,
                letterSpacing: "0.5px"
              }}
            >
              Name
            </label>
            <input
              id="nameInput"
              type="text"
              value={guestName}
              readOnly
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "6px",
                border: "1px solid rgba(0,0,0,0.5)",
                background: "transparent",
                fontFamily: "'Cormorant Garamond', serif",
                color: "#000",
                fontSize: "0.95rem",
                cursor: "not-allowed"
              }}
            />
          </div>

          {/* Attendance Buttons */}
          <div style={{ width: "100%" }}>
            <label 
              style={{
                display: "block",
                marginBottom: "8px",
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "0.95rem",
                fontWeight: 300,
                letterSpacing: "0.5px",
                color: "#000"
              }}
            >
              Will you attend the wedding?
            </label>
            <div style={{ display: "flex", gap: "16px", width: "100%" }}>
              <button
                type="button"
                onClick={() => setAttending("yes")}
                style={{
                  flex: 1,
                  padding: "10px 16px",
                  borderRadius: "6px",
                  backgroundColor: attending === "yes" ? "#BFA980" : "transparent",
                  color: attending === "yes" ? "#fff" : "#BFA980",
                  border: "1px solid rgba(0,0,0,0.5)",
                  cursor: "pointer",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1rem",
                  transition: "all 0.3s ease"
                }}
              >
                Gladly Attend
              </button>

              <button
                type="button"
                onClick={() => setAttending("no")}
                style={{
                  flex: 1,
                  padding: "10px 16px",
                  borderRadius: "6px",
                  backgroundColor: attending === "no" ? "#BFA980" : "transparent",
                  color: attending === "no" ? "#fff" : "#000",
                  border: "1px solid rgba(0,0,0,0.5)",
                  cursor: "pointer",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1rem",
                  transition: "all 0.3s ease"
                }}
              >
                Unable to Attend
              </button>
            </div>
          </div>

          {/* Pax Dropdown */}
          {attending === "yes" && (
            <div style={{ width: "100%" }}>
              <label 
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.1rem",
                  color: "#000",
                  fontWeight: 300
                }}
              >
                Number of Guests
              </label>
              <select
                value={pax}
                onChange={(e) => setPax(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "6px",
                  border: "1px solid rgba(0,0,0,0.5)",
                  background: "transparent",
                  color: "#000",
                  fontSize: "0.95rem",
                  fontFamily: "'Cormorant Garamond', serif",
                  appearance: "none",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                  backgroundSize: "16px"
                }}
              >
                <option value="" style={{ color: "#555", backgroundColor: "#fff" }}>
                  Select number of guests
                </option>
                {[1, 2, 3, 4, 5].map((val) => (
                  <option 
                    key={val} 
                    value={val}
                    style={{ 
                      color: "#000", 
                      backgroundColor: "#fff",
                      padding: "8px"
                    }}
                  >
                    {val} {val > 1 ? "guests" : "guest"}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              display: "inline-block",
              padding: "12px 30px",
              backgroundColor: "#BFA980",
              border: "1px solid #BFA980",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "0.9rem",
              textDecoration: "none",
              color: "white",
              transition: "all 0.3s ease",
              letterSpacing: "1px",
              fontFamily: "'Playfair Display', serif",
              fontWeight: "400"
            }}
          >
            Submit
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default RsvpWishViaWhatsApp;