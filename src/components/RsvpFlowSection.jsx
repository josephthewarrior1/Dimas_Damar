import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useSearchParams } from 'react-router-dom';
import { db } from '../config/firebaseConfig';
import { ref, query, orderByChild, equalTo, onValue, update } from 'firebase/database';

const RsvpWishGiftSection = () => {
  // URL Parameters
  const [params] = useSearchParams();
  const fullParam = params.get("to") || "";
  const [coupleId, guestCode] = fullParam.split('_');

  // Section state
  const [activeSection, setActiveSection] = useState('rsvp');
  const [showBankDetails, setShowBankDetails] = useState(true);

  // RSVP State
  const [guestName, setGuestName] = useState("Tamu Undangan");
  const [guestId, setGuestId] = useState("");
  const [guestStatus, setGuestStatus] = useState("PENDING"); // Tambahkan state untuk status guest
  const [attending, setAttending] = useState(null);
  const [pax, setPax] = useState("");
  const [rsvpError, setRsvpError] = useState(null);
  const [isRsvpSubmitted, setIsRsvpSubmitted] = useState(false);

  // Wish State
  const [wish, setWish] = useState("");
  const [wishes, setWishes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);

  // Copy State
  const [copied, setCopied] = useState({
    bride: false,
    groom: false
  });

  // Bank Accounts
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

  // WhatsApp Number
  const whatsappNumber = "628119660089";

  // Load guest data
  useEffect(() => {
    if (!coupleId || !guestCode) {
      setRsvpError("Link undangan tidak valid");
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
        setGuestStatus(guestData.status || "PENDING"); // Set status guest
        setAlreadySubmitted(!!guestData.wish);
        
        // Jika status bukan PENDING, set attending sesuai status
        if (guestData.status === "ACCEPTED" || guestData.status === "checked-in") {
          setAttending("yes");
          setPax(guestData.pax || "1");
          setIsRsvpSubmitted(true);
        } else if (guestData.status === "REJECTED") {
          setAttending("no");
          setIsRsvpSubmitted(true);
        }
        
        setRsvpError(null);
      } else {
        setRsvpError("Tamu tidak ditemukan");
      }
    });

    return () => unsubscribe();
  }, [coupleId, guestCode]);

  // Load wishes
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
        .filter(([_, guest]) => guest.wish)
        .map(([id, guest]) => ({
          id,
          name: guest.name,
          wish: guest.wish,
          createdAt: guest.createdAt,
          status: guest.status // Tambahkan status ke data wish
        }))
        .sort((a, b) => b.createdAt - a.createdAt);

      setWishes(loadedWishes);
    });

    return () => unsubscribe();
  }, [coupleId]);

  // Handle RSVP
  const handlePaxChange = (e) => {
    let value = e.target.value;
    if (value === "" || /^[1-5]$/.test(value)) {
      setPax(value);
    }
  };

  const handleRsvpSubmit = async (e) => {
    e.preventDefault();

    // Hanya izinkan submit jika status masih PENDING
    if (guestStatus !== "PENDING") {
      setRsvpError("Anda sudah mengkonfirmasi kehadiran sebelumnya");
      return;
    }

    if (attending === null) {
      setRsvpError("Silakan pilih status kehadiran");
      return;
    }

    if (attending === "yes" && !pax) {
      setRsvpError("Silakan pilih jumlah tamu");
      return;
    }

    try {
      // Update status tamu di Firebase
      const status = attending === "yes" ? "ACCEPTED" : "REJECTED";
      
      await update(ref(db, `couples/${coupleId}/guests/${guestId}`), {
        status,
        ...(attending === "yes" && { pax }),
        updatedAt: Date.now()
      });

      setGuestStatus(status); // Update status guest
      setRsvpError(null);
      setIsRsvpSubmitted(true);
      setActiveSection('wish');
    } catch (error) {
      console.error("Error updating RSVP:", error);
      setRsvpError("Gagal mengkonfirmasi kehadiran");
    }
  };

  // Handle Wish Submission
  const handleWishSubmit = async (e) => {
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

  // Handle Copy
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

  // Format date
  const formatDate = (timestamp) =>
    new Date(timestamp).toLocaleString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  // Fungsi untuk mendapatkan label status kehadiran
  const getAttendanceStatus = (status) => {
    if (status === "ACCEPTED" || status === "checked-in") {
      return "Hadir";
    } else if (status === "REJECTED") {
      return "Tidak Hadir";
    }
    return "Belum Konfirmasi";
  };

  return (
    <section style={{
      width: '100%',
      minHeight: '100vh',
      padding: '60px 20px',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
      margin: '0 auto',
      textAlign: 'center',
      fontFamily: '"Cormorant Garamond", serif',
      boxSizing: 'border-box',
      color: '#ffffff',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Progress Indicator */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '40px',
        position: 'relative'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          maxWidth: '500px'
        }}>
          {/* RSVP Step */}
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flex: 1,
              cursor: 'pointer'
            }}
            onClick={() => setActiveSection('rsvp')}
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: activeSection === 'rsvp' ? '#BFA980' : 'rgba(191, 169, 128, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '8px',
              border: '1px solid #BFA980',
              color: activeSection === 'rsvp' ? '#111' : '#BFA980',
              fontWeight: 'bold'
            }}>
              1
            </div>
            <span style={{
              fontSize: '0.9rem',
              color: activeSection === 'rsvp' ? '#BFA980' : 'rgba(255,255,255,0.6)'
            }}>
              RSVP
            </span>
          </div>

          {/* Line */}
          <div style={{
            height: '1px',
            flex: 1,
            background: 'linear-gradient(90deg, rgba(191, 169, 128, 0.5), rgba(191, 169, 128, 0.1))',
            margin: '0 5px'
          }}></div>

          {/* Wish Step */}
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flex: 1,
              cursor: 'pointer'
            }}
            onClick={() => isRsvpSubmitted && setActiveSection('wish')}
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: activeSection === 'wish' ? '#BFA980' : 
                         isRsvpSubmitted ? 'rgba(191, 169, 128, 0.2)' : 'rgba(255,255,255,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '8px',
              border: isRsvpSubmitted ? '1px solid #BFA980' : '1px solid rgba(255,255,255,0.1)',
              color: activeSection === 'wish' ? '#111' : 
                    isRsvpSubmitted ? '#BFA980' : 'rgba(255,255,255,0.3)',
              fontWeight: 'bold'
            }}>
              2
            </div>
            <span style={{
              fontSize: '0.9rem',
              color: activeSection === 'wish' ? '#BFA980' : 
                    isRsvpSubmitted ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.3)'
            }}>
              Wish
            </span>
          </div>

          {/* Line */}
          <div style={{
            height: '1px',
            flex: 1,
            background: 'linear-gradient(90deg, rgba(191, 169, 128, 0.1), rgba(191, 169, 128, 0.5))',
            margin: '0 5px'
          }}></div>

          {/* Gift Step */}
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flex: 1,
              cursor: 'pointer'
            }}
            onClick={() => setActiveSection('gift')}
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: activeSection === 'gift' ? '#BFA980' : 'rgba(191, 169, 128, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '8px',
              border: '1px solid #BFA980',
              color: activeSection === 'gift' ? '#111' : '#BFA980',
              fontWeight: 'bold'
            }}>
              3
            </div>
            <span style={{
              fontSize: '0.9rem',
              color: activeSection === 'gift' ? '#BFA980' : 'rgba(255,255,255,0.6)'
            }}>
              Gift
            </span>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        {/* RSVP Section */}
        <AnimatePresence mode='wait'>
          {activeSection === 'rsvp' && (
            <motion.div
              key="rsvp"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ 
                  padding: '20px 0',
                  marginBottom: '20px'
                }}
              >
                <h2 style={{
                  fontSize: '2.2rem',
                  fontWeight: 400,
                  letterSpacing: '1px',
                  margin: '0 0 10px 0',
                  fontFamily: "'Playfair Display', serif",
                  color: '#BFA980'
                }}>
                  Konfirmasi Kehadiran
                </h2>
                <div style={{
                  width: '60px',
                  height: '2px',
                  background: '#BFA980',
                  margin: '0 auto',
                  opacity: 0.6
                }}></div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{ 
                  maxWidth: '500px', 
                  margin: '0 auto 30px',
                  padding: '0 20px'
                }}
              >
                <p style={{
                  fontSize: '1.1rem',
                  lineHeight: '1.6',
                  color: 'rgba(255,255,255,0.8)',
                  marginBottom: '20px'
                }}>
                  {guestName}, mohon konfirmasi kehadiran Anda
                </p>
                
                {/* Tampilkan status jika sudah konfirmasi */}
                {guestStatus !== "PENDING" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      background: 'rgba(191, 169, 128, 0.1)',
                      color: '#BFA980',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid rgba(191, 169, 128, 0.3)',
                      marginBottom: '20px',
                      fontSize: '0.95rem'
                    }}
                  >
                    Anda sudah mengkonfirmasi: <strong>{getAttendanceStatus(guestStatus)}</strong>
                    {guestStatus === "ACCEPTED" && pax && ` (${pax} orang)`}
                  </motion.div>
                )}
              </motion.div>

              <motion.div
                style={{
                  maxWidth: '500px',
                  margin: '0 auto',
                  padding: '25px',
                  borderRadius: '12px',
                  background: 'rgba(20, 20, 20, 0.8)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                  border: '1px solid rgba(191, 169, 128, 0.3)'
                }}
              >
                <form onSubmit={handleRsvpSubmit}>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontSize: '0.95rem',
                      color: '#BFA980',
                      letterSpacing: '0.5px'
                    }}>
                      Nama Anda
                    </label>
                    <div style={{
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid rgba(191, 169, 128, 0.3)',
                      background: 'rgba(191, 169, 128, 0.05)',
                      color: '#fff',
                      fontSize: '1rem',
                      textAlign: 'center'
                    }}>
                      {guestName}
                    </div>
                  </div>

                  {/* Tampilkan form hanya jika status masih PENDING */}
                  {guestStatus === "PENDING" ? (
                    <>
                      <div style={{ marginBottom: '20px' }}>
                        <label style={{
                          display: 'block',
                          marginBottom: '12px',
                          fontSize: '0.95rem',
                          color: '#BFA980',
                          letterSpacing: '0.5px',
                          textAlign: 'center'
                        }}>
                          Apakah Anda akan hadir?
                        </label>
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <button
                              type="button"
                              onClick={() => setAttending("yes")}
                              style={{
                                padding: '10px 20px',
                                borderRadius: '50px',
                                background: attending === "yes" ? '#BFA980' : 'transparent',
                                color: attending === "yes" ? '#111' : '#BFA980',
                                border: '1px solid #BFA980',
                                cursor: 'pointer',
                                fontSize: '0.95rem',
                                fontFamily: "'Cormorant Garamond', serif",
                                fontWeight: 500,
                                transition: 'all 0.3s ease',
                                minWidth: '110px'
                              }}
                            >
                              Hadir
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
                                padding: '10px 20px',
                                borderRadius: '50px',
                                background: attending === "no" ? '#BFA980' : 'transparent',
                                color: attending === "no" ? '#111' : '#BFA980',
                                border: '1px solid #BFA980',
                                cursor: 'pointer',
                                fontSize: '0.95rem',
                                fontFamily: "'Cormorant Garamond', serif",
                                fontWeight: 500,
                                transition: 'all 0.3s ease',
                                minWidth: '110px'
                              }}
                            >
                              Tidak Hadir
                            </button>
                          </motion.div>
                        </div>
                      </div>

                      {attending === "yes" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ duration: 0.5 }}
                          style={{ marginBottom: '20px', overflow: 'hidden' }}
                        >
                          <label style={{
                            display: 'block',
                            marginBottom: '8px',
                            fontSize: '0.95rem',
                            color: '#BFA980',
                            letterSpacing: '0.5px'
                          }}>
                            Jumlah Tamu
                          </label>
                          <div style={{ position: 'relative' }}>
                            <select
                              value={pax}
                              onChange={(e) => setPax(e.target.value)}
                              style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid rgba(191, 169, 128, 0.3)',
                                background: 'rgba(20, 20, 20, 0.8)',
                                color: '#fff',
                                fontSize: '0.95rem',
                                appearance: 'none',
                                cursor: 'pointer'
                              }}
                            >
                              <option value="" style={{ color: '#aaa', backgroundColor: '#141414' }}>
                                Pilih jumlah
                              </option>
                              {[1, 2, 3, 4, 5].map(num => (
                                <option 
                                  key={num} 
                                  value={num}
                                  style={{ 
                                    color: '#fff', 
                                    backgroundColor: '#141414',
                                    padding: '8px'
                                  }}
                                >
                                  {num} {num > 1 ? 'orang' : 'orang'}
                                </option>
                              ))}
                            </select>
                            <div style={{
                              position: 'absolute',
                              right: '15px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              pointerEvents: 'none'
                            }}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#BFA980" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9"></polyline>
                              </svg>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {rsvpError && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          style={{
                            color: '#ff6b6b',
                            textAlign: 'center',
                            margin: '15px 0',
                            fontSize: '0.9rem'
                          }}
                        >
                          {rsvpError}
                        </motion.div>
                      )}

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{ textAlign: 'center' }}
                      >
                        <button
                          type="submit"
                          disabled={attending === null || (attending === "yes" && !pax)}
                          style={{
                            padding: '12px 30px',
                            borderRadius: '50px',
                            background: '#BFA980',
                            border: 'none',
                            color: '#111',
                            fontSize: '0.95rem',
                            fontWeight: 500,
                            cursor: 'pointer',
                            fontFamily: "'Cormorant Garamond', serif",
                            letterSpacing: '1px',
                            transition: 'all 0.3s ease',
                            opacity: (attending === null || (attending === "yes" && !pax)) ? 0.5 : 1,
                            pointerEvents: (attending === null || (attending === "yes" && !pax)) ? 'none' : 'auto'
                          }}
                        >
                          Konfirmasi
                        </button>
                      </motion.div>
                    </>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '20px 0' }}>
                      <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '20px' }}>
                        Anda sudah mengkonfirmasi kehadiran sebelumnya.
                      </p>
                      <motion.button
                        onClick={() => setActiveSection('wish')}
                        style={{
                          background: 'transparent',
                          color: '#BFA980',
                          border: '1px solid #BFA980',
                          padding: '10px 25px',
                          fontSize: '0.95rem',
                          borderRadius: '30px',
                          cursor: 'pointer',
                          fontFamily: '"Cormorant Garamond", serif',
                          letterSpacing: '1px',
                          transition: 'all 0.3s ease'
                        }}
                        whileHover={{
                          backgroundColor: '#BFA980',
                          color: '#111'
                        }}
                        whileTap={{ scale: 0.97 }}
                      >
                        Lanjut ke Ucapan
                      </motion.button>
                    </div>
                  )}
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Wish Section */}
       {/* Wish Section */}
<AnimatePresence mode='wait'>
  {activeSection === 'wish' && (
    <motion.div
      key="wish"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ 
          padding: '20px 0',
          marginBottom: '20px'
        }}
      >
        <h2 style={{
          fontSize: '2.2rem',
          fontWeight: 400,
          letterSpacing: '1px',
          margin: '0 0 10px 0',
          fontFamily: "'Playfair Display', serif",
          color: '#BFA980'
        }}>
          Wedding Wish  
        </h2>
        <div style={{
          width: '60px',
          height: '2px',
          background: '#BFA980',
          margin: '0 auto',
          opacity: 0.6
        }}></div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{ 
          maxWidth: '500px', 
          margin: '0 auto 30px',
          padding: '0 20px'
        }}
      >
        <p style={{
          fontSize: '1.1rem',
          lineHeight: '1.6',
          color: 'rgba(255,255,255,0.8)',
          marginBottom: '20px'
        }}>
          {guestName}, kirimkan doa dan ucapan untuk mempelai
        </p>
      </motion.div>

      <motion.div
        style={{
          maxWidth: '500px',
          margin: '0 auto',
          padding: '25px',
          borderRadius: '12px',
          background: 'rgba(20, 20, 20, 0.8)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          border: '1px solid rgba(191, 169, 128, 0.3)'
        }}
      >
        <form onSubmit={handleWishSubmit}>
          {submitError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: 'rgba(255, 0, 0, 0.1)',
                color: '#ff9999',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 0, 0, 0.3)',
                marginBottom: '20px',
                fontSize: '0.9rem'
              }}
            >
              {submitError}
            </motion.div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <textarea
              placeholder="Tulis ucapan dan doa Anda disini"
              value={wish}
              onChange={(e) => setWish(e.target.value)}
              rows={4}
              disabled={alreadySubmitted}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                fontFamily: '"Cormorant Garamond", serif',
                border: '1px solid rgba(255,255,255,0.3)',
                background: 'rgba(0,0,0,0.5)',
                color: '#ffffff',
                fontSize: '1rem',
                resize: 'none',
                boxSizing: 'border-box',
                maxWidth: '100%',
                '::placeholder': {
                  color: 'rgba(255,255,255,0.5)'
                }
              }}
            />
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ textAlign: 'center' }}
          >
            <button
              type="submit"
              disabled={isSubmitting || alreadySubmitted}
              style={{
                padding: '12px 30px',
                borderRadius: '50px',
                background: alreadySubmitted ? '#555555' : '#BFA980',
                border: 'none',
                color: '#fff',
                fontSize: '0.95rem',
                fontWeight: 500,
                cursor: alreadySubmitted ? 'not-allowed' : 'pointer',
                fontFamily: "'Cormorant Garamond', serif",
                letterSpacing: '1px',
                transition: 'all 0.3s ease',
                width: '100%'
              }}
            >
              {alreadySubmitted
                ? 'Sudah Mengisi'
                : isSubmitting
                ? 'Mengirim...'
                : 'Kirim Ucapan'}
            </button>
          </motion.div>

          {alreadySubmitted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                textAlign: 'center',
                color: 'rgba(255,255,255,0.7)',
                marginTop: '15px',
                fontSize: '0.9rem'
              }}
            >
              Terima kasih atas ucapan dan doanya
            </motion.div>
          )}
        </form>

        <div style={{ marginTop: '30px' }}>
          <h3 style={{
            fontSize: '1.2rem',
            color: '#BFA980',
            marginBottom: '15px',
            textAlign: 'center',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 400
          }}>
            Ucapan Lainnya
          </h3>

          {wishes.length === 0 ? (
            <p style={{ 
              textAlign: 'center', 
              color: 'rgba(255,255,255,0.7)',
              fontStyle: 'italic',
              margin: 0,
              fontSize: '0.9rem'
            }}>
              Belum ada ucapan yang ditulis.
            </p>
          ) : (
            <div style={{
              maxHeight: '300px',
              overflowY: 'auto',
              paddingRight: '10px'
            }}>
              {wishes.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: 'rgba(0,0,0,0.5)',
                    borderRadius: '8px',
                    padding: '16px',
                    marginBottom: '12px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#ffffff',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '6px',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: '#BFA980',
                        color: '#fff',
                        fontWeight: 'bold',
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '10px',
                        fontFamily: '"Cormorant Garamond", serif',
                        fontSize: '0.9rem'
                      }}
                    >
                      {item.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontWeight: 'bold',
                          marginBottom: '4px',
                          color: '#ffffff',
                          fontSize: '1rem'
                        }}
                      >
                        {item.name}
                      </div>
                      <div style={{ 
                        fontSize: '0.9rem', 
                        color: 'rgba(255,255,255,0.8)',
                        lineHeight: '1.5',
                        marginBottom: '6px'
                      }}>
                        {item.wish}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <motion.button
          onClick={() => setActiveSection('gift')}
          style={{
            background: 'transparent',
            color: '#BFA980',
            border: '1px solid #BFA980',
            padding: '10px 25px',
            fontSize: '0.95rem',
            borderRadius: '30px',
            cursor: 'pointer',
            fontFamily: '"Cormorant Garamond", serif',
            letterSpacing: '1px',
            transition: 'all 0.3s ease'
          }}
          whileHover={{
            backgroundColor: '#BFA980',
            color: '#111'
          }}
          whileTap={{ scale: 0.97 }}
        >
          Lanjut ke Hadiah
        </motion.button>
      </div>
    </motion.div>
  )}
</AnimatePresence>


        {/* Gift Section */}
<AnimatePresence mode='wait'>
  {activeSection === 'gift' && (
    <motion.div
      key="gift"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ 
          padding: '20px 0',
          marginBottom: '20px'
        }}
      >
        <h2 style={{
          fontSize: '2.2rem',
          fontWeight: 400,
          letterSpacing: '1px',
          margin: '0 0 10px 0',
          fontFamily: "'Playfair Display', serif",
          color: '#BFA980'
        }}>
          Wedding Gift
        </h2>
        <div style={{
          width: '60px',
          height: '2px',
          background: '#BFA980',
          margin: '0 auto',
          opacity: 0.6
        }}></div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{ 
          maxWidth: '500px', 
          margin: '0 auto 30px',
          padding: '0 20px'
        }}
      >
        <p style={{
          fontSize: '1.1rem',
          lineHeight: '1.6',
          color: 'rgba(255,255,255,0.8)',
          marginBottom: '20px'
        }}>
          Untuk yang ingin memberikan hadiah, silakan gunakan informasi rekening di bawah ini:
        </p>

        <motion.button
          onClick={() => setShowBankDetails(!showBankDetails)}
          style={{
            background: 'transparent',
            color: '#BFA980',
            border: '1px solid #BFA980',
            padding: '12px 30px',
            fontSize: '1rem',
            borderRadius: '30px',
            cursor: 'pointer',
            fontFamily: '"Cormorant Garamond", serif',
            letterSpacing: '1px',
            marginBottom: '10px',
            transition: 'all 0.3s ease'
          }}
          whileHover={{
            backgroundColor: '#BFA980',
            color: '#111'
          }}
          whileTap={{ scale: 0.97 }}
        >
          {showBankDetails ? 'Sembunyikan' : 'Tampilkan Rekening'}
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {showBankDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: 'auto',
              transition: {
                opacity: { duration: 0.3 },
                height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }
              }
            }}
            exit={{
              opacity: 0,
              height: 0,
              transition: {
                opacity: { duration: 0.2 },
                height: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }
              }
            }}
            style={{
              maxWidth: '500px',
              margin: '0 auto',
              overflow: 'hidden',
            }}
          >
            <motion.div
              style={{
                padding: '25px',
                borderRadius: '12px',
                background: 'rgba(20, 20, 20, 0.8)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                border: '1px solid rgba(191, 169, 128, 0.3)',
                marginTop: '10px'
              }}
            >
              <h3 style={{
                fontSize: '1.3rem',
                marginBottom: '20px',
                color: '#BFA980',
                fontWeight: '400',
                fontFamily: "'Playfair Display', serif",
                textAlign: 'center'
              }}>
                Detail Transfer Bank
              </h3>

              {/* Bride */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                style={{ 
                  marginBottom: '25px', 
                  textAlign: 'left',
                  position: 'relative'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  left: '15px',
                  backgroundColor: '#0a0a0a',
                  padding: '0 10px',
                  zIndex: 1,
                  color: '#BFA980',
                  fontSize: '0.9rem'
                }}>
                  Pengantin Wanita
                </div>
                <div style={{
                  backgroundColor: 'rgba(191, 169, 128, 0.05)',
                  padding: '20px',
                  borderRadius: '8px',
                  border: '1px solid rgba(191, 169, 128, 0.2)',
                  position: 'relative'
                }}>
                  <p style={{ 
                    margin: '8px 0', 
                    fontSize: '0.95rem',
                    color: 'rgba(255,255,255,0.9)'
                  }}>
                    <span style={{ color: '#BFA980', minWidth: '80px', display: 'inline-block' }}>Nama:</span> 
                    {bankAccounts.bride.name}
                  </p>
                  <p style={{ 
                    margin: '8px 0', 
                    fontSize: '0.95rem',
                    color: 'rgba(255,255,255,0.9)'
                  }}>
                    <span style={{ color: '#BFA980', minWidth: '80px', display: 'inline-block' }}>Bank:</span> 
                    {bankAccounts.bride.bank}
                  </p>
                  <p style={{ 
                    margin: '8px 0', 
                    fontSize: '0.95rem',
                    color: 'rgba(255,255,255,0.9)'
                  }}>
                    <span style={{ color: '#BFA980', minWidth: '80px', display: 'inline-block' }}>No. Rek:</span> 
                    {bankAccounts.bride.number}
                  </p>

                  <CopyToClipboard
                    text={bankAccounts.bride.number}
                    onCopy={() => handleCopy('bride')}
                  >
                    <motion.button
                      style={{
                        position: 'absolute',
                        right: '15px',
                        top: '15px',
                        background: 'transparent',
                        border: '1px solid #BFA980',
                        borderRadius: '4px',
                        padding: '5px 10px',
                        color: '#BFA980',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        fontFamily: '"Cormorant Garamond", serif',
                        transition: 'all 0.3s ease'
                      }}
                      whileHover={{ 
                        backgroundColor: '#BFA980',
                        color: '#111'
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {copied.bride ? 'Tersalin!' : 'Salin'}
                    </motion.button>
                  </CopyToClipboard>
                </div>
              </motion.div>

              {/* Groom */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                style={{ 
                  textAlign: 'left',
                  position: 'relative'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  left: '15px',
                  backgroundColor: '#0a0a0a',
                  padding: '0 10px',
                  zIndex: 1,
                  color: '#BFA980',
                  fontSize: '0.9rem'
                }}>
                  Pengantin Pria
                </div>
                <div style={{
                  backgroundColor: 'rgba(191, 169, 128, 0.05)',
                  padding: '20px',
                  borderRadius: '8px',
                  border: '1px solid rgba(191, 169, 128, 0.2)',
                  position: 'relative'
                }}>
                  <p style={{ 
                    margin: '8px 0', 
                    fontSize: '0.95rem',
                    color: 'rgba(255,255,255,0.9)'
                  }}>
                    <span style={{ color: '#BFA980', minWidth: '80px', display: 'inline-block' }}>Nama:</span> 
                    {bankAccounts.groom.name}
                  </p>
                  <p style={{ 
                    margin: '8px 0', 
                    fontSize: '0.95rem',
                    color: 'rgba(255,255,255,0.9)'
                  }}>
                    <span style={{ color: '#BFA980', minWidth: '80px', display: 'inline-block' }}>Bank:</span> 
                    {bankAccounts.groom.bank}
                  </p>
                  <p style={{ 
                    margin: '8px 0', 
                    fontSize: '0.95rem',
                    color: 'rgba(255,255,255,0.9)'
                  }}>
                    <span style={{ color: '#BFA980', minWidth: '80px', display: 'inline-block' }}>No. Rek:</span> 
                    {bankAccounts.groom.number}
                  </p>

                  <CopyToClipboard
                    text={bankAccounts.groom.number}
                    onCopy={() => handleCopy('groom')}
                  >
                    <motion.button
                      style={{
                        position: 'absolute',
                        right: '15px',
                        top: '15px',
                        background: 'transparent',
                        border: '1px solid #BFA980',
                        borderRadius: '4px',
                        padding: '5px 10px',
                        color: '#BFA980',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        fontFamily: '"Cormorant Garamond", serif',
                        transition: 'all 0.3s ease'
                      }}
                      whileHover={{ 
                        backgroundColor: '#BFA980',
                        color: '#111'
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {copied.groom ? 'Tersalin!' : 'Salin'}
                    </motion.button>
                  </CopyToClipboard>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <motion.button
          onClick={() => setActiveSection('rsvp')}
          style={{
            background: 'transparent',
            color: '#BFA980',
            border: '1px solid #BFA980',
            padding: '10px 25px',
            fontSize: '0.95rem',
            borderRadius: '30px',
            cursor: 'pointer',
            fontFamily: '"Cormorant Garamond", serif',
            letterSpacing: '1px',
            transition: 'all 0.3s ease'
          }}
          whileHover={{
            backgroundColor: '#BFA980',
            color: '#111'
          }}
          whileTap={{ scale: 0.97 }}
        >
          Kembali ke RSVP
        </motion.button>
      </div>
    </motion.div>
  )}
</AnimatePresence>
      </div>
    </section>
  );
};

export default RsvpWishGiftSection;