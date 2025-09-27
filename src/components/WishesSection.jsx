import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { containerVariants, slideUp } from './animations';
import { db } from '../config/firebaseConfig';
import { ref, push, onValue } from 'firebase/database';
import invitationData from '../data/invitationData';

const CombinedRsvpWishSection = () => {
  const [activeTab, setActiveTab] = useState('rsvp'); // 'rsvp' atau 'wish' atau 'gift'
  const [params] = useSearchParams();
  const guestName = params.get("to") || "";
  
  // State untuk RSVP WhatsApp
  const [name, setName] = useState(guestName);
  const [attending, setAttending] = useState("yes");
  const [pax, setPax] = useState("");
  const [rsvpError, setRsvpError] = useState(null);
  
  // State untuk Wedding Wish
  const [wish, setWish] = useState("");
  const [wishes, setWishes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  
  // State untuk Wedding Gift
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [copied, setCopied] = useState({
    bride: false,
    groom: false
  });

  const bankAccounts = {
    bride: {
      name: "Damar Wulan Sari",
      bank: "Bank BCA",
      number: "1234567890"
    },
    groom: {
      name: "Dimas Adi Pratama",
      bank: "Bank Mandiri",
      number: "0987654321"
    }
  };

  // Fungsi untuk RSVP WhatsApp
  const handlePaxChange = (e) => {
    let value = e.target.value;
    if (value === "" || /^[1-5]$/.test(value)) {
      setPax(value);
    }
  };

  const handleRsvpSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setRsvpError("Harap isi nama Anda");
      return;
    }

    if (!pax && attending === "yes") {
      setRsvpError("Harap isi jumlah orang yang hadir");
      return;
    }

    const finalPax = attending === "yes" ? pax : "0";
    const whatsappNumber = "628119660089";

    const message = `Halo, saya *${name}* ingin RSVP:\n\nStatus: ${attending === "yes" ? "Hadir" : "Tidak Hadir"}\n${attending === "yes" ? `Jumlah orang: ${finalPax} pax` : ""}\n\nTerima kasih 🙏🏻`;

    const url = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // Fungsi untuk Wedding Wish
  const handleWishSubmit = async (e) => {
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

  // Fungsi untuk Wedding Gift
  const handleCopy = (account) => {
    setCopied({
      ...copied,
      [account]: true
    });
    setTimeout(() => {
      setCopied({
        ...copied,
        [account]: false
      });
    }, 2000);
  };

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
        width: '100%',
        padding: '60px 20px',
        backgroundColor: '#260c0c',
        margin: '0 auto',
        textAlign: 'center',
        fontFamily: '"Cormorant Garamond", serif',
        boxSizing: 'border-box',
        position: 'relative',
        color: 'white',
        minHeight: '70vh'
      }}
    >
      {/* Top Left Ornament */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "70px",
        height: "auto",
        opacity: 0.8,
        transform: "rotate(180deg)"
      }}>
        <img 
          src={invitationData.ornamenImage1} 
          alt="Ornament" 
          style={{ 
            width: "100%", 
            height: "auto",
          }} 
        />
      </div>

      {/* Top Right Ornament */}
      <div style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "70px",
        height: "auto",
        opacity: 0.8,
      }}>
        <img 
          src={invitationData.ornamenImage1} 
          alt="Ornament" 
          style={{ 
            width: "100%", 
            height: "auto",
          }} 
        />
      </div>

      {/* Header */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: '30px'
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
          }}
        >
          <motion.h2
            variants={slideUp}
            style={{
              textAlign: "center",
              fontSize: "1.6rem",
              fontWeight: 400,
              letterSpacing: '1px',
              margin: 0,
              lineHeight: '1.1',
              color: 'white'
            }}
          >
            RSVP & WEDDING WISH
          </motion.h2>
          <motion.p
            variants={slideUp}
            style={{
              textAlign: "center",
              fontSize: "0.95rem",
              lineHeight: '1.5',
              color: 'rgba(255,255,255,0.8)',
              marginTop: '10px'
            }}
          >
            We'd love to hear from you! Please choose an option below.
          </motion.p>
        </motion.div>
      </div>

      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '30px',
        borderBottom: '1px solid rgba(255,255,255,0.2)',
        maxWidth: '500px',
        margin: '0 auto 30px'
      }}>
        <button
          onClick={() => setActiveTab('rsvp')}
          style={{
            backgroundColor: activeTab === 'rsvp' ? '#847346' : 'transparent',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            fontSize: '0.95rem',
            borderRadius: '5px 5px 0 0',
            cursor: 'pointer',
            fontFamily: '"Cormorant Garamond", serif',
            transition: 'all 0.3s ease',
            margin: '0 5px'
          }}
        >
          RSVP
        </button>
        <button
          onClick={() => setActiveTab('wish')}
          style={{
            backgroundColor: activeTab === 'wish' ? '#847346' : 'transparent',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            fontSize: '0.95rem',
            borderRadius: '5px 5px 0 0',
            cursor: 'pointer',
            fontFamily: '"Cormorant Garamond", serif',
            transition: 'all 0.3s ease',
            margin: '0 5px'
          }}
        >
          Wedding Wish
        </button>
        <button
          onClick={() => setActiveTab('gift')}
          style={{
            backgroundColor: activeTab === 'gift' ? '#847346' : 'transparent',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            fontSize: '0.95rem',
            borderRadius: '5px 5px 0 0',
            cursor: 'pointer',
            fontFamily: '"Cormorant Garamond", serif',
            transition: 'all 0.3s ease',
            margin: '0 5px'
          }}
        >
          Wedding Gift
        </button>
      </div>

      {/* Tab Content */}
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        minHeight: '400px'
      }}>
        {/* RSVP Tab */}
        {activeTab === 'rsvp' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              padding: '20px',
              backgroundImage: `linear-gradient(rgba(38, 12, 12, 0.7), rgba(38, 12, 12, 0.7)), url(${invitationData.backgroundDesign})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
            }}
          >
            <motion.form
              onSubmit={handleRsvpSubmit}
              variants={slideUp}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                width: "100%",
                maxWidth: "350px",
                margin: "0 auto",
                color: "#fff",
              }}
            >
              {rsvpError && (
                <div
                  style={{
                    backgroundColor: "rgba(255, 0, 0, 0.2)",
                    color: "#fff",
                    padding: "8px",
                    borderRadius: "6px",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    fontSize: "0.8rem",
                    width: "100%",
                  }}
                >
                  {rsvpError}
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
                    color: "white",
                    fontWeight: 300,
                    letterSpacing: "0.5px"
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
                    padding: "12px",
                    borderRadius: "6px",
                    border: "1px solid rgba(255,255,255,0.5)",
                    background: "transparent",
                    fontFamily: "'Cormorant Garamond', serif",
                    color: "#fff",
                    fontSize: "0.95rem",
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
                    letterSpacing: "0.5px"
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
                      backgroundColor: attending === "yes" ? "#847346" : "transparent",
                      color: "#fff",
                      border: "1px solid rgba(255,255,255,0.5)",
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
                      backgroundColor: attending === "no" ? "#847346" : "transparent",
                      color: "#fff",
                      border: "1px solid rgba(255,255,255,0.5)",
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
                      color: "white",
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
                      border: "1px solid rgba(255,255,255,0.5)",
                      background: "transparent",
                      color: "#fff",
                      fontSize: "0.95rem",
                      fontFamily: "'Cormorant Garamond', serif",
                      appearance: "none",
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
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
                  backgroundColor: "#847346",
                  color: "#fff",
                  fontWeight: "bold",
                  padding: "12px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  width: "100%",
                  fontSize: "1rem",
                  fontFamily: "'Cormorant Garamond', serif",
                  marginTop: "10px",
                }}
              >
                Submit via WhatsApp
              </button>
            </motion.form>
          </motion.div>
        )}

        {/* Wedding Wish Tab */}
        {activeTab === 'wish' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              width: "100%",
              height: wishes.length > 0 ? "60vh" : "auto",
              overflowY: wishes.length > 0 ? "auto" : "visible",
              padding: "20px",
              backgroundImage: `linear-gradient(rgba(38, 12, 12, 0.7), rgba(38, 12, 12, 0.7)), url(${invitationData.backgroundDesign})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
              scrollbarWidth: "thin",
              scrollbarColor: "#847346 rgba(0,0,0,0.2)",
            }}
          >
            {/* Form Section */}
            <motion.form
              onSubmit={handleWishSubmit}
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
                    background: "rgba(255, 0, 0, 0.2)",
                    color: "#ffaaaa",
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
                  border: "1px solid rgba(255,255,255,0.3)",
                  background: "rgba(0,0,0,0.5)",
                  color: "white",
                  fontSize: "0.95rem",
                  resize: "none",
                }}
              />

              <motion.button
                variants={slideUp}
                type="submit"
                disabled={isSubmitting || alreadySubmitted}
                style={{
                  backgroundColor: alreadySubmitted ? "#555" : "#847346",
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
                    color: "#847346",
                    marginTop: "10px",
                    fontSize: "0.9rem"
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
                paddingBottom: wishes.length === 0 ? "0" : "10px"
              }}
            >
              {wishes.length === 0 ? (
                <p style={{ 
                  textAlign: "center", 
                  color: "rgba(255,255,255,0.7)",
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
                      background: "rgba(0,0,0,0.5)",
                      borderRadius: "8px",
                      padding: "16px",
                      marginBottom: "12px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "white",
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
                            color: "white",
                            fontSize: "1rem"
                          }}
                        >
                          {item.name}
                        </div>
                        <div style={{ 
                          fontSize: "0.9rem", 
                          color: "rgba(255,255,255,0.8)",
                          lineHeight: "1.5",
                          marginBottom: "6px"
                        }}>
                          {item.wish}
                        </div>
                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: "rgba(255,255,255,0.5)",
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
        )}

        {/* Wedding Gift Tab */}
        {activeTab === 'gift' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              padding: '20px',
              backgroundImage: `linear-gradient(rgba(38, 12, 12, 0.7), rgba(38, 12, 12, 0.7)), url(${invitationData.backgroundDesign})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
            }}
          >
            {/* Gift Message */}
            <div style={{
              maxWidth: '500px',
              margin: '0 auto 20px',
            }}>
              <p style={{
                fontSize: '0.95rem',
                lineHeight: '1.5',
                color: 'rgba(255,255,255,0.8)',
                marginBottom: '20px'
              }}>
                For beloved ones who may want to show your sincere love by sending a gift, please kindly tap the button below:
              </p>

              <button
                onClick={() => setShowBankDetails(!showBankDetails)}
                style={{
                  backgroundColor: '#847346',
                  color: 'white',
                  border: 'none',
                  padding: '10px 25px',
                  fontSize: '0.95rem',
                  borderRadius: '30px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontFamily: '"Cormorant Garamond", serif',
                  letterSpacing: '1px',
                  marginBottom: '10px',
                }}
              >
                {showBankDetails ? 'Hide Bank Details' : 'Send Gift'}
              </button>
            </div>

            {/* Bank Details (Shown when button clicked) */}
            {showBankDetails && (
              <div style={{
                maxWidth: '450px',
                margin: '10px auto 0',
                padding: '20px',
                borderRadius: '10px',
                backdropFilter: 'blur(5px)',
              }}>
                <h3 style={{
                  fontSize: '1.1rem',
                  marginBottom: '15px',
                  color: '#fff',
                  fontWeight: 'normal'
                }}>
                  Bank Transfer Details
                </h3>

                {/* Bride's Account */}
                <div style={{
                  marginBottom: '15px',
                  textAlign: 'left'
                }}>
                  <h4 style={{
                    fontSize: '0.95rem',
                    marginBottom: '8px',
                    color: 'rgba(255,255,255,0.7)',
                    fontWeight: 'normal'
                  }}>
                   BCA
                  </h4>
                  <div style={{
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    padding: '12px',
                    borderRadius: '8px',
                    position: 'relative'
                  }}>
                    <p style={{ margin: '4px 0', fontSize: '0.9rem' }}>Name: {bankAccounts.bride.name}</p>
                    <p style={{ margin: '4px 0', fontSize: '0.9rem' }}>Bank: {bankAccounts.bride.bank}</p>
                    <p style={{ margin: '4px 0', fontSize: '0.9rem' }}>Account: {bankAccounts.bride.number}</p>
                    
                    <CopyToClipboard 
                      text={bankAccounts.bride.number}
                      onCopy={() => handleCopy('bride')}
                    >
                      <button
                        style={{
                          position: 'absolute',
                          right: '8px',
                          top: '8px',
                          background: 'rgba(255,255,255,0.2)',
                          border: 'none',
                          borderRadius: '4px',
                          fontFamily: '"Cormorant Garamond", serif',
                          padding: '4px 8px',
                          color: 'white',
                          cursor: 'pointer',
                          fontSize: '0.75rem'
                        }}
                      >
                        {copied.bride ? 'Copied!' : 'Copy'}
                      </button>
                    </CopyToClipboard>
                  </div>
                </div>

                {/* Groom's Account */}
                <div style={{
                  textAlign: 'left',
                  marginBottom: '15px'
                }}>
                  <h4 style={{
                    fontSize: '0.95rem',
                    marginBottom: '8px',
                    color: 'rgba(255,255,255,0.7)',
                    fontWeight: 'normal'
                  }}>
                    MANDIRI
                  </h4>
                  <div style={{
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    padding: '12px',
                    borderRadius: '8px',
                    position: 'relative'
                  }}>
                    <p style={{ margin: '4px 0', fontSize: '0.9rem' }}>Name: {bankAccounts.groom.name}</p>
                    <p style={{ margin: '4px 0', fontSize: '0.9rem' }}>Bank: {bankAccounts.groom.bank}</p>
                    <p style={{ margin: '4px 0', fontSize: '0.9rem' }}>Account: {bankAccounts.groom.number}</p>
                    
                    <CopyToClipboard 
                      text={bankAccounts.groom.number}
                      onCopy={() => handleCopy('groom')}
                    >
                      <button
                        style={{
                          position: 'absolute',
                          right: '8px',
                          top: '8px',
                          background: 'rgba(255,255,255,0.2)',
                          border: 'none',
                          borderRadius: '4px',
                          fontFamily: '"Cormorant Garamond", serif',  
                          padding: '4px 8px',
                          color: 'white',
                          cursor: 'pointer',
                          fontSize: '0.75rem'
                        }}
                      >
                        {copied.groom ? 'Copied!' : 'Copy'}
                      </button>
                    </CopyToClipboard>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Bottom Center Ornament */}
      <div style={{
        position: "absolute",
        bottom: "-50px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "80px",
        height: "auto",
        opacity: 0.7,
        zIndex: 1,
        pointerEvents: "none"
      }}>
        <img 
          src={invitationData.ornamenImage} 
          alt="Bottom Ornament" 
          style={{ 
            width: "100%", 
            height: "auto",
          }} 
        />
      </div>
    </section>
  );
};

export default CombinedRsvpWishSection;