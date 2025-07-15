import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { containerVariants, slideUp } from "./animations";
import invitationData from "../data/invitationData";

const RsvpWishViaWhatsApp = () => {
  const [params] = useSearchParams();
  const defaultName = params.get("to") || "";
  const [name, setName] = useState(defaultName);
  const [attending, setAttending] = useState("yes");
  const [pax, setPax] = useState("");
  const [error, setError] = useState(null);

  const whatsappNumber = "6281234567890"; // ← Ganti dengan nomor WA aktif

  const handlePaxChange = (e) => {
    let value = e.target.value;
    
    // Only allow numbers and empty string
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

    const message = `Halo, saya *${name}* ingin RSVP:\n\nStatus: ${attending === "yes" ? "Hadir" : "Tidak Hadir"}\n${attending === "yes" ? `Jumlah orang: ${finalPax} pax` : ""}\n\nTerima kasih 🙏🏻`;

    const url = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;
    window.location.href = url;
  };

  return (
    <section
      style={{
        position: "relative",
        minHeight: "50vh", // Diubah dari 10vh ke 50vh
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
          padding: "40px 20px", // Padding lebih kecil
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center", // Ditambahkan untuk vertikal center
          maxWidth: "500px",        // Lebar maksimal disesuaikan
          margin: "0 auto",
          height: "100%", // Ditambahkan untuk memenuhi parent
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
              fontSize: "3.5rem", // Ukuran lebih kecil
              fontFamily: "'Playfair Display', serif",
              marginBottom: "25px", // Margin bawah lebih kecil
              lineHeight: "1", // Line height lebih ketat
            }}
          >
            RSVP
          </motion.h2>

          <motion.p
            variants={slideUp}
            style={{
              fontSize: "0.85rem", // Ukuran lebih kecil
              marginBottom: "20px", // Margin bawah lebih kecil
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
            gap: "12px", // Gap lebih kecil
            background: "transparent",
            borderRadius: "12px", // Border radius lebih kecil
            padding: "20px", // Padding lebih kecil
            width: "100%",
            maxWidth: "400px", // Lebar maksimal form lebih kecil
            color: "#fff",
          }}
        >
          {error && (
            <div
              style={{
                backgroundColor: "rgba(255, 0, 0, 0.2)",
                color: "#fff",
                padding: "8px", // Padding lebih kecil
                borderRadius: "6px", // Border radius lebih kecil
                border: "1px solid rgba(255, 255, 255, 0.3)",
                fontSize: "0.8rem", // Ukuran font lebih kecil
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
              style={{
                padding: "10px", // Padding lebih kecil
                borderRadius: "6px", // Border radius lebih kecil
                border: "1px solid rgba(255,255,255,0.5)",
                background: "transparent",
                color: "#fff",
                fontSize: "0.85rem", // Ukuran font lebih kecil
              }}
            />
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
                style={{
                  padding: "10px", // Padding lebih kecil
                  borderRadius: "6px", // Border radius lebih kecil
                  border: "1px solid rgba(255,255,255,0.5)",
                  background: "transparent",
                  color: "#fff",
                  fontSize: "0.85rem", // Ukuran font lebih kecil
                }}
              />
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ 
              display: "flex", 
              gap: "15px", // Gap lebih kecil
              justifyContent: "center", // Ditengah
              fontSize: "0.85rem" // Ukuran font lebih kecil
            }}>
              <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <input
                  type="radio"
                  name="attending"
                  value="yes"
                  checked={attending === "yes"}
                  onChange={(e) => {
                    setAttending(e.target.value);
                    setError(null);
                  }}
                  style={{ width: "14px", height: "14px" }} // Ukuran lebih kecil
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
                  style={{ width: "14px", height: "14px" }} // Ukuran lebih kecil
                />
                Tidak Hadir
              </label>
            </div>
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: "transparent",
              color: "#fff",
              fontWeight: "bold",
              padding: "10px", // Padding lebih kecil
              borderRadius: "20px", // Border radius lebih kecil
              border: "1px solid #fff",
              cursor: "pointer",
              fontSize: "0.85rem", // Ukuran font lebih kecil
              marginTop: "5px", // Margin atas lebih kecil
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "transparent";
            }}
          >
            Kirim via WhatsApp
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default RsvpWishViaWhatsApp;