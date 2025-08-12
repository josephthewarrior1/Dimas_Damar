import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ref, query, orderByChild, equalTo, onValue } from 'firebase/database';
import { db } from '../config/firebaseConfig';
import QRCode from 'react-qr-code';
import { saveAs } from 'file-saver';
import Modal from 'react-modal';
import { motion, AnimatePresence } from 'framer-motion';

Modal.setAppElement('#root');

export default function GuestInvitationPage() {
  const location = useLocation();
  const [guestData, setGuestData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Parse URL parameters
  const searchParams = new URLSearchParams(location.search);
  const fullCode = searchParams.get('to');
  const [coupleId, guestCode] = fullCode ? fullCode.split('_') : [null, null];

  useEffect(() => {
    if (!coupleId || !guestCode) {
      setError('Invalid invitation link format');
      setLoading(false);
      return;
    }

    const guestsRef = ref(db, `couples/${coupleId}/guests`);
    const guestQuery = query(guestsRef, orderByChild('code'), equalTo(guestCode));

    const unsubscribe = onValue(guestQuery, (snapshot) => {
      try {
        if (!snapshot.exists()) {
          throw new Error('Guest not found with this code');
        }

        const guests = snapshot.val();
        const guestEntry = Object.entries(guests).find(
          ([_, guest]) => guest.code === guestCode
        );

        if (!guestEntry) {
          throw new Error('Matching guest not found');
        }

        const [guestId, guest] = guestEntry;
        setGuestData({ id: guestId, ...guest });
        setError('');
      } catch (err) {
        setError(err.message);
        setGuestData(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [coupleId, guestCode]);

  const downloadQRCode = () => {
    if (!guestData) return;

    const svg = document.getElementById('guest-qr-code');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        saveAs(blob, `wedding-invitation-${guestData.name}.png`);
      });
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  if (!fullCode) return null;

  if (loading) {
    return null;
  }

  if (error) {
    return null;
  }

  return (
    <>
      {/* Hamburger Menu Button - Top Right */}
      <motion.div 
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 100,
          cursor: 'pointer'
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <motion.div 
          onClick={openModal}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            alignItems: 'center',
            padding: '10px',
            borderRadius: '50%',
            background: 'rgba(142, 110, 83, 0.8)',
            width: '40px',
            height: '40px',
            justifyContent: 'center',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
          }}
          whileHover={{ 
            background: 'rgba(142, 110, 83, 0.9)',
            scale: 1.1
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <motion.div 
            style={{
              width: '20px',
              height: '2px',
              background: 'white',
              borderRadius: '2px'
            }}
            initial={{ width: 0 }}
            animate={{ width: '20px' }}
            transition={{ delay: 0.7 }}
          ></motion.div>
          <motion.div 
            style={{
              width: '20px',
              height: '2px',
              background: 'white',
              borderRadius: '2px'
            }}
            initial={{ width: 0 }}
            animate={{ width: '20px' }}
            transition={{ delay: 0.8 }}
          ></motion.div>
          <motion.div 
            style={{
              width: '20px',
              height: '2px',
              background: 'white',
              borderRadius: '2px'
            }}
            initial={{ width: 0 }}
            animate={{ width: '20px' }}
            transition={{ delay: 0.9 }}
          ></motion.div>
        </motion.div>
      </motion.div>

      {/* Modal for QR Code */}
      <AnimatePresence>
        {modalIsOpen && (
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={{
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0)',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.3s ease'
              },
              content: {
                position: 'relative',
                inset: 'auto',
                background: 'transparent',
                border: 'none',
                borderRadius: '16px',
                padding: 0,
                maxWidth: '450px',
                width: '90%',
                maxHeight: '90vh',
                overflow: 'visible',
                color: '#5d4037',
                boxShadow: 'none'
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 25,
                duration: 0.3
              }}
              style={{
                background: '#f5f5f5',
                borderRadius: '16px',
                padding: '30px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)'
              }}
            >
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{ textAlign: 'center' }}
              >
                <h2 style={{
                  fontSize: '1.8rem',
                  marginBottom: '20px',
                  color: '#5d4037',
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 500
                }}>
                  Your Wedding QR Code
                </h2>

                {/* Guest Info */}
                {guestData && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    style={{
                      background: 'rgba(141, 110, 83, 0.1)',
                      padding: '15px',
                      borderRadius: '12px',
                      marginBottom: '25px',
                      border: '1px solid rgba(141, 110, 83, 0.2)'
                    }}
                  >
                    <div style={{ marginBottom: '10px', fontSize: '1.1rem' }}>
                      <span style={{ fontWeight: 500 }}>For: </span>
                      <span style={{ fontWeight: 600 }}>{guestData.name}</span>
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#8e6e53' }}>
                      <span>Invitation Code: </span>
                      <span style={{ fontWeight: 500 }}>{guestData.code}</span>
                    </div>
                  </motion.div>
                )}

                {/* QR Code Section */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  style={{ 
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '30px'
                  }}
                >
                  <div style={{
                    background: 'white',
                    padding: '20px',
                    borderRadius: '12px',
                    border: '1px solid #e0e0e0',
                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    {/* Decorative corners */}
                    <div style={{
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      width: '30px',
                      height: '30px',
                      borderTop: '2px solid #8e6e53',
                      borderLeft: '2px solid #8e6e53',
                      borderTopLeftRadius: '8px'
                    }}></div>
                    <div style={{
                      position: 'absolute',
                      top: '0',
                      right: '0',
                      width: '30px',
                      height: '30px',
                      borderTop: '2px solid #8e6e53',
                      borderRight: '2px solid #8e6e53',
                      borderTopRightRadius: '8px'
                    }}></div>
                    <div style={{
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                      width: '30px',
                      height: '30px',
                      borderBottom: '2px solid #8e6e53',
                      borderLeft: '2px solid #8e6e53',
                      borderBottomLeftRadius: '8px'
                    }}></div>
                    <div style={{
                      position: 'absolute',
                      bottom: '0',
                      right: '0',
                      width: '30px',
                      height: '30px',
                      borderBottom: '2px solid #8e6e53',
                      borderRight: '2px solid #8e6e53',
                      borderBottomRightRadius: '8px'
                    }}></div>
                    
                    <QRCode
                      id="guest-qr-code"
                      value={`${window.location.origin}/home?to=${coupleId}_${guestCode}`}
                      size={200}
                      level="H"
                      bgColor="#ffffff"
                      fgColor="#5d4037"
                    />
                  </div>
                </motion.div>

                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  style={{ 
                    fontSize: '0.95rem',
                    color: '#8e6e53',
                    marginBottom: '30px',
                    fontStyle: 'italic'
                  }}
                >
                  Present this QR code at the wedding entrance
                </motion.p>

                {/* Buttons */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  style={{ 
                    display: 'flex', 
                    gap: '15px', 
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                  }}
                >
                  <motion.button 
                    onClick={downloadQRCode}
                    style={{
                      background: 'linear-gradient(135deg, #8e6e53 0%, #5d4037 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '12px 25px',
                      borderRadius: '30px',
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      minWidth: '180px',
                      boxShadow: '0 4px 10px rgba(93, 64, 55, 0.3)'
                    }}
                    whileHover={{ 
                      y: -3,
                      boxShadow: '0 6px 15px rgba(93, 64, 55, 0.4)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    Download QR Code
                  </motion.button>
                  <motion.button 
                    onClick={closeModal}
                    style={{
                      background: 'transparent',
                      color: '#5d4037',
                      border: '1px solid #5d4037',
                      padding: '12px 25px',
                      borderRadius: '30px',
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      minWidth: '120px'
                    }}
                    whileHover={{ 
                      y: -3,
                      background: 'rgba(93, 64, 55, 0.05)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    Close
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}