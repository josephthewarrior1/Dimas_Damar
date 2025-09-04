import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useSearchParams } from 'react-router-dom';
import { db } from '../config/firebaseConfig';
import { ref, query, orderByChild, equalTo, onValue, update } from 'firebase/database';
import './RsvpFlowSection.css';

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
  const [guestStatus, setGuestStatus] = useState("PENDING");
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
        setGuestStatus(guestData.status || "PENDING");
        setAlreadySubmitted(!!guestData.wish);
        
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
          status: guest.status
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
      const status = attending === "yes" ? "ACCEPTED" : "REJECTED";
      
      await update(ref(db, `couples/${coupleId}/guests/${guestId}`), {
        status,
        ...(attending === "yes" && { pax }),
        updatedAt: Date.now()
      });

      setGuestStatus(status);
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
    <section className="rsvp-container">
      {/* Progress Indicator */}
      <div className="progress-container">
        <div className="progress-inner">
          {/* RSVP Step */}
          <div 
            className="progress-step"
            onClick={() => setActiveSection('rsvp')}
          >
            <div className={`progress-circle ${activeSection === 'rsvp' ? 'active' : 'inactive'}`}>
              1
            </div>
            <span className={`progress-label ${activeSection === 'rsvp' ? 'active' : 'inactive'}`}>
              RSVP
            </span>
          </div>

          {/* Line */}
          <div className="progress-line"></div>

          {/* Wish Step */}
          <div 
            className="progress-step"
            onClick={() => isRsvpSubmitted && setActiveSection('wish')}
          >
            <div className={
              activeSection === 'wish' ? 'progress-circle active' : 
              isRsvpSubmitted ? 'progress-circle inactive' : 'progress-circle disabled'
            }>
              2
            </div>
            <span className={
              activeSection === 'wish' ? 'progress-label active' : 
              isRsvpSubmitted ? 'progress-label inactive' : 'progress-label disabled'
            }>
              Wish
            </span>
          </div>

          {/* Line */}
          <div className="progress-line"></div>

          {/* Gift Step */}
          <div 
            className="progress-step"
            onClick={() => setActiveSection('gift')}
          >
            <div className={`progress-circle ${activeSection === 'gift' ? 'active' : 'inactive'}`}>
              3
            </div>
            <span className={`progress-label ${activeSection === 'gift' ? 'active' : 'inactive'}`}>
              Gift
            </span>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="content-container">
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
                <h2 className="section-title">
                  Konfirmasi Kehadiran
                </h2>
                <div className="section-divider"></div>
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
                <p className="section-description">
                  {guestName}, mohon konfirmasi kehadiran Anda
                </p>
                
                {/* Tampilkan status jika sudah konfirmasi */}
                {guestStatus !== "PENDING" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="status-message"
                  >
                    Anda sudah mengkonfirmasi: <strong>{getAttendanceStatus(guestStatus)}</strong>
                    {guestStatus === "ACCEPTED" && pax && ` (${pax} orang)`}
                  </motion.div>
                )}
              </motion.div>

              <motion.div className="form-container">
                <form onSubmit={handleRsvpSubmit}>
                  <div style={{ marginBottom: '20px' }}>
                    <label className="form-label">
                      Nama Anda
                    </label>
                    <div className="name-display">
                      {guestName}
                    </div>
                  </div>

                  {/* Tampilkan form hanya jika status masih PENDING */}
                  {guestStatus === "PENDING" ? (
                    <>
                      <div style={{ marginBottom: '20px' }}>
                        <label className="form-label" style={{textAlign: 'center'}}>
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
                              className={`option-button ${attending === "yes" ? "selected" : ""}`}
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
                              className={`option-button ${attending === "no" ? "selected" : ""}`}
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
                          <label className="form-label">
                            Jumlah Tamu
                          </label>
                          <div className="select-wrapper">
                            <select
                              value={pax}
                              onChange={(e) => setPax(e.target.value)}
                              className="form-select"
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
                            <div className="select-arrow">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                          className="error-message"
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
                          className="submit-button"
                          style={{
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
                        className="nav-button"
                        whileHover={{
                          backgroundColor: '#ffffff',
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
                <h2 className="section-title">
                  Wedding Wish
                </h2>
                <div className="section-divider"></div>
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
                <p className="section-description">
                  {guestName}, kirimkan doa dan ucapan untuk mempelai
                </p>
              </motion.div>

              <motion.div className="form-container">
                <form onSubmit={handleWishSubmit}>
                  {submitError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="error-message"
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
                      className="wish-textarea"
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
                      className="submit-button"
                      style={{
                        background: alreadySubmitted ? '#555555' : '#ffffff',
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
                    color: '#ffffff',
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
                    <div className="wish-list">
                      {wishes.map((item) => (
                        <div
                          key={item.id}
                          className="wish-item"
                        >
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              marginBottom: '6px',
                            }}
                          >
                            <div
                              className="wish-avatar"
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
                  className="nav-button"
                  whileHover={{
                    backgroundColor: '#ffffff',
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
                <h2 className="section-title">
                  Wedding Gift
                </h2>
                <div className="section-divider"></div>
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
                <p className="section-description">
                  Untuk yang ingin memberikan hadiah, silakan gunakan informasi rekening di bawah ini:
                </p>

                <motion.button
                  onClick={() => setShowBankDetails(!showBankDetails)}
                  className="nav-button"
                  style={{ marginBottom: '10px' }}
                  whileHover={{
                    backgroundColor: '#ffffff',
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
                      className="form-container"
                      style={{ marginTop: '10px' }}
                    >
                      <h3 style={{
                        fontSize: '1.3rem',
                        marginBottom: '20px',
                        color: '#ffffff',
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
                        className="bank-account"
                      >
                        <div className="bank-label">
                          Pengantin Wanita
                        </div>
                        <div className="bank-details">
                          <p className="bank-info">
                            <span className="bank-field">Nama:</span> 
                            {bankAccounts.bride.name}
                          </p>
                          <p className="bank-info">
                            <span className="bank-field">Bank:</span> 
                            {bankAccounts.bride.bank}
                          </p>
                          <p className="bank-info">
                            <span className="bank-field">No. Rek:</span> 
                            {bankAccounts.bride.number}
                          </p>
                          <CopyToClipboard
                            text={bankAccounts.bride.number}
                            onCopy={() => handleCopy('bride')}
                          >
                            <button className="copy-button">
                              {copied.bride ? 'Tersalin!' : 'Salin'}
                            </button>
                          </CopyToClipboard>
                        </div>
                      </motion.div>

                      {/* Groom */}
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className="bank-account"
                      >
                        <div className="bank-label">
                          Pengantin Pria
                        </div>
                        <div className="bank-details">
                          <p className="bank-info">
                            <span className="bank-field">Nama:</span> 
                            {bankAccounts.groom.name}
                          </p>
                          <p className="bank-info">
                            <span className="bank-field">Bank:</span> 
                            {bankAccounts.groom.bank}
                          </p>
                          <p className="bank-info">
                            <span className="bank-field">No. Rek:</span> 
                            {bankAccounts.groom.number}
                          </p>
                          <CopyToClipboard
                            text={bankAccounts.groom.number}
                            onCopy={() => handleCopy('groom')}
                          >
                            <button className="copy-button">
                              {copied.groom ? 'Tersalin!' : 'Salin'}
                            </button>
                          </CopyToClipboard>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                        style={{ 
                          textAlign: 'center', 
                          marginTop: '30px',
                          paddingTop: '20px',
                          borderTop: '1px solid rgba(255,255,255,0.1)'
                        }}
                      >
                        <p style={{ 
                          color: 'rgba(255,255,255,0.7)', 
                          marginBottom: '15px',
                          fontSize: '0.9rem'
                        }}>
                          Konfirmasi transfer melalui WhatsApp
                        </p>
                        <motion.a
                          href={`https://wa.me/${whatsappNumber}?text=Halo, saya sudah melakukan transfer hadiah pernikahan`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="submit-button"
                          style={{
                            display: 'inline-block',
                            textDecoration: 'none'
                          }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Konfirmasi WhatsApp
                        </motion.a>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div style={{ textAlign: 'center', marginTop: '30px' }}>
                <motion.button
                  onClick={() => setActiveSection('rsvp')}
                  className="nav-button"
                  whileHover={{
                    backgroundColor: '#ffffff',
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