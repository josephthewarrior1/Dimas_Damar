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

  const whatsappNumber = "628119660089"; // ganti dengan nomor WA aktif

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

    const message = `Halo, saya *${name}* ingin RSVP:\n\nStatus: ${
      attending === "yes" ? "Hadir" : "Tidak Hadir"
    }\n${attending === "yes" ? `Jumlah orang: ${finalPax} pax` : ""}\n\nTerima kasih 🙏🏻`;

    const url = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(
      message
    )}`;
    window.location.href = url;
  };

  return (
    <section
      style={{
        position: "relative",
        minHeight: "60vh",
        overflow: "hidden",
        fontFamily: "Poppins, sans-serif",
        color: "#000", // teks default hitam
        background: "linear-gradient(to bottom, #ffffff, #d9d9d9)", // putih ke silver
      }}
    >
      {/* Ornamen kiri */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "90px",
          opacity: 0.8,
          transform: "rotate(180deg)",
        }}
      >
        <img
          src={invitationData.ornamenImage1}
          alt="Ornament"
          style={{ width: "100%", height: "auto" }}
        />
      </div>

      {/* Ornamen kanan */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "90px",
          opacity: 0.8,
        }}
      >
        <img
          src={invitationData.ornamenImage1}
          alt="Ornament"
          style={{ width: "100%", height: "auto" }}
        />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "40px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ width: "100%", textAlign: "center" }}
        >
          <motion.h2
            variants={slideUp}
            style={{
              fontSize: "3rem",
              fontFamily: "'Cormorant Garamond', serif",
              marginBottom: "20px",
              color: "#000",
            }}
          >
            RSVP
          </motion.h2>

          <motion.p
            variants={slideUp}
            style={{
              fontSize: "1rem",
              lineHeight: 1.8,
              fontWeight: 300,
              fontFamily: "'Cormorant Garamond', serif",
              color: "#333",
            }}
          >
            We'd love to hear from you!
            <br />
            Please fill out the confirmation below:
          </motion.p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          variants={slideUp}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "28px",
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(230,230,230,0.95))",
            border: "1px solid #bbb",
            borderRadius: "12px",
            padding: "24px",
            width: "100%",
            maxWidth: "320px",
            marginTop: "30px",
          }}
        >
          {error && (
            <div
              style={{
                backgroundColor: "rgba(0,0,0,0.05)",
                color: "#b00000",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "0.85rem",
              }}
            >
              {error}
            </div>
          )}

          {/* Name */}
          <div>
            <label
              htmlFor="nameInput"
              style={{
                display: "block",
                marginBottom: "6px",
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1rem",
                color: "#000",
                fontWeight: 400,
              }}
            >
              Name
            </label>
            <input
              id="nameInput"
              type="text"
              value={name}
              placeholder="Nama Anda"
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #aaa",
                background: "#fff",
                fontFamily: "'Cormorant Garamond', serif",
                color: "#000",
                fontSize: "0.95rem",
              }}
            />
          </div>

          {/* Attendance */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1rem",
                color: "#000",
              }}
            >
              Will you attend the wedding?
            </label>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                type="button"
                onClick={() => setAttending("yes")}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "6px",
                  backgroundColor:
                    attending === "yes" ? "#a9a9a9" : "transparent",
                  color: "#000",
                  border: "1px solid #999",
                  cursor: "pointer",
                  fontFamily: "'Cormorant Garamond', serif",
                  transition: "all 0.3s ease",
                }}
              >
                Gladly Attend
              </button>

              <button
                type="button"
                onClick={() => setAttending("no")}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "6px",
                  backgroundColor:
                    attending === "no" ? "#a9a9a9" : "transparent",
                  color: "#000",
                  border: "1px solid #999",
                  cursor: "pointer",
                  fontFamily: "'Cormorant Garamond', serif",
                  transition: "all 0.3s ease",
                }}
              >
                Unable to Attend
              </button>
            </div>
          </div>

          {/* Pax */}
          {attending === "yes" && (
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1rem",
                  color: "#000",
                }}
              >
                Number of Guests
              </label>
              <select
                value={pax}
                onChange={(e) => setPax(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #aaa",
                  background: "#fff",
                  color: "#000",
                  fontSize: "0.95rem",
                  fontFamily: "'Cormorant Garamond', serif",
                  appearance: "none",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 10px center",
                  backgroundSize: "16px",
                }}
              >
                <option value="">Select number of guests</option>
                {[1, 2, 3, 4, 5].map((val) => (
                  <option key={val} value={val}>
                    {val} {val > 1 ? "guests" : "guest"}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            style={{
              backgroundColor: "#000",
              color: "#fff",
              fontWeight: "bold",
              padding: "12px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              width: "100%",
              fontSize: "1rem",
              fontFamily: "'Cormorant Garamond', serif",
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
