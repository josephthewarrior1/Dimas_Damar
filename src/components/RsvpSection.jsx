import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { containerVariants, slideUp } from "./animations";

const RsvpWishViaWhatsApp = () => {
  const [params] = useSearchParams();
  const defaultName = params.get("to") || "";
  const [name, setName] = useState(defaultName);
  const [attending, setAttending] = useState("yes");
  const [pax, setPax] = useState("1");
  const [error, setError] = useState(null);

  const whatsappNumber = "62895333205532";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Harap isi nama Anda");
      return;
    }
    if (attending === "yes" && !pax) {
      setError("Harap pilih jumlah tamu");
      return;
    }

    const finalPax = attending === "yes" ? pax : "0";

    const message = `Halo, saya *${name}* ingin RSVP:\n\nStatus: ${
      attending === "yes" ? "Hadir" : "Tidak Hadir"
    }\nJumlah tamu: ${finalPax} orang\n\nTerima kasih 🙏🏻`;

    const url = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(
      message
    )}`;
    window.location.href = url;
  };

  const handleAttendingChange = (value) => {
    setAttending(value);
    if (value === "no") {
      setPax("");
    } else {
      setPax("1");
    }
    setError(null);
  };

  return (
    <section
      style={{
        position: "relative",
        minHeight: "60vh",
        background: "#ffffff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 20px",
        fontFamily: "'Cormorant Garamond', serif",
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{
          maxWidth: "480px",
          width: "100%",
          background:
            "linear-gradient(145deg, #ffffff 0%, #f1f1f1 50%, #e6e6e6 100%)",
          borderRadius: "18px",
          border: "1px solid #d0d0d0",
          boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
          padding: "32px 28px",
        }}
      >
        <motion.h2
          variants={slideUp}
          style={{
            fontSize: "2.4rem",
            color: "#333",
            textAlign: "center",
            marginBottom: "14px",
            letterSpacing: "1px",
          }}
        >
          RSVP
        </motion.h2>

        <motion.p
          variants={slideUp}
          style={{
            fontSize: "1rem",
            lineHeight: 1.7,
            color: "#555",
            textAlign: "center",
            marginBottom: "28px",
          }}
        >
          Konfirmasi kehadiran Anda agar kami dapat menyiapkan dengan baik.
        </motion.p>

        <form onSubmit={handleSubmit}>
          <motion.input
            variants={slideUp}
            type="text"
            value={name}
            placeholder="Nama lengkap"
            onChange={(e) => {
              setName(e.target.value);
              setError(null);
            }}
            style={{
              width: "90%",
              padding: "12px 14px",
              borderRadius: "10px",
              border: "1px solid #bfbfbf",
              marginBottom: "18px",
              fontSize: "1rem",
              backgroundColor: "#fafafa",
              color: "#333",
            }}
          />

          <motion.div
            variants={slideUp}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "18px",
            }}
          >
            {["yes", "no"].map((opt) => (
              <label
                key={opt}
                style={{
                  flex: 1,
                  margin: "0 4px",
                  textAlign: "center",
                  cursor: "pointer",
                  padding: "10px 0",
                  borderRadius: "10px",
                  border:
                    attending === opt
                      ? "2px solid #a0a0a0"
                      : "1px solid #c8c8c8",
                  background:
                    attending === opt
                      ? "linear-gradient(145deg,#ededed,#d7d7d7)"
                      : "#f9f9f9",
                  color: "#333",
                  transition: "all .25s",
                  fontWeight: "600",
                }}
              >
                <input
                  type="radio"
                  name="attending"
                  value={opt}
                  checked={attending === opt}
                  onChange={(e) => handleAttendingChange(e.target.value)}
                  style={{ display: "none" }}
                />
                {opt === "yes" ? "Hadir" : "Tidak Hadir"}
              </label>
            ))}
          </motion.div>

          {/* DROPDOWN TANPA ANIMASI - PAKAI CONDITIONAL RENDERING BIASA */}
          {attending === "yes" && (
            <select
              value={pax}
              onChange={(e) => {
                setPax(e.target.value);
                setError(null);
              }}
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: "10px",
                border: "1px solid #bfbfbf",
                marginBottom: "20px",
                fontSize: "1rem",
                backgroundColor: "#fafafa",
                color: "#333",
                appearance: "none",
              }}
            >
              <option value="">Pilih jumlah tamu</option>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n} orang
                </option>
              ))}
            </select>
          )}

          {error && (
            <motion.p
              variants={slideUp}
              style={{
                color: "#a00",
                textAlign: "center",
                marginBottom: "12px",
              }}
            >
              {error}
            </motion.p>
          )}

          <motion.button
            variants={slideUp}
            type="submit"
            style={{
              width: "100%",
              padding: "12px 16px",
              border: "none",
              borderRadius: "10px",
              background:
                "linear-gradient(145deg, #dcdcdc 0%, #bfbfbf 50%, #a6a6a6 100%)",
              color: "#000",
              fontSize: "1.1rem",
              fontWeight: "600",
              letterSpacing: "0.5px",
              cursor: "pointer",
              transition: "all .25s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background =
                "linear-gradient(145deg, #cfcfcf 0%, #b0b0b0 100%)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background =
                "linear-gradient(145deg, #dcdcdc 0%, #bfbfbf 50%, #a6a6a6 100%)")
            }
          >
            Submit
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default RsvpWishViaWhatsApp;