import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import invitationData from '../data/invitationData';

const WeddingGift = () => {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState({ bride: false, groom: false });

  const bankAccounts = {
    bride: { name: "Damar Wulan Sari", bank: "BCA",     number: "1234567890" },
    groom: { name: "Dimas Adi Pratama", bank: "Mandiri", number: "0987654321" },
  };

  const handleCopy = (account) => {
    setCopied({ ...copied, [account]: true });
    setTimeout(() => setCopied({ ...copied, [account]: false }), 2000);
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
  };

  return (
    <section
      style={{
        width: '100%',
        minHeight: '50vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#ffffff',
        fontFamily: '"Cormorant Garamond", serif',
        textAlign: 'center',
        padding: '40px 15px',
        boxSizing: 'border-box'
      }}
    >
      {/* Kotak utama */}
      <div
        style={{
          border: '1px solid #c0c0c0',
          padding: '20px 12px',
          borderRadius: '20px',
          maxWidth: '320px',
          width: '100%',
          background:
            'linear-gradient(145deg, #ffffff 0%, #f1f1f1 50%, #e6e6e6 100%)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
        }}
      >
        <h2 style={{
          fontSize: '1.8rem',
          marginBottom: '12px',
          color: '#222',
          letterSpacing: '1px'
        }}>
          Wedding Gift
        </h2>

        <p
          style={{
            maxWidth: '300px',
            margin: '0 auto 25px',
            color: '#555',
            lineHeight: 1.5,
            fontSize: '0.95rem'
          }}
        >
          Leave us your best wishes and sincere prayers as we embark on this new journey together.
        </p>

        <button
          onClick={() => setShowModal(true)}
          style={{
            background:
              'linear-gradient(145deg, #dcdcdc 0%, #bfbfbf 50%, #a6a6a6 100%)',
            color: '#000',
            padding: '10px 28px',
            borderRadius: '10px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            fontFamily: '"Cormorant Garamond", serif',
            letterSpacing: '1px',
            fontWeight: 600,
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background =
              'linear-gradient(145deg, #cfcfcf 0%, #b0b0b0 100%)')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background =
              'linear-gradient(145deg, #dcdcdc 0%, #bfbfbf 50%, #a6a6a6 100%)')
          }
        >
          Send Gifts
        </button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropVariants}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0,0,0,0.45)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
            }}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={modalVariants}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              style={{
                background:
                  'linear-gradient(145deg, #ffffff 0%, #f4f4f4 60%, #e4e4e4 100%)',
                borderRadius: '20px',
                padding: '30px 24px',
                maxWidth: '400px',
                width: '90%',
                position: 'relative',
                boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
                border: '1px solid #c0c0c0'
              }}
            >
              {/* Tombol Close */}
              <button
                onClick={() => setShowModal(false)}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'transparent',
                  border: 'none',
                  fontSize: '1.6rem',
                  cursor: 'pointer',
                  color: '#000',
                }}
              >
                &times;
              </button>

              <h3
                style={{
                  fontSize: '1.4rem',
                  marginBottom: '20px',
                  color: '#222',
                  letterSpacing: '0.5px'
                }}
              >
                Bank Transfer
              </h3>

              {/* Bride Card */}
              <div
                style={{
                  border: '1px solid #d0d0d0',
                  borderRadius: '12px',
                  padding: '14px',
                  marginBottom: '16px',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
                  background: '#fff'
                }}
              >
                <p style={{ fontWeight: 'bold', marginBottom: '4px', color: '#333' }}>
                  {bankAccounts.bride.bank}
                </p>
                <p style={{ margin: '2px 0', fontSize: '0.9rem', color: '#444' }}>
                  Name: {bankAccounts.bride.name}
                </p>
                <p style={{ margin: '2px 0', fontSize: '0.9rem', color: '#444' }}>
                  Account: {bankAccounts.bride.number}
                </p>
                <CopyToClipboard
                  text={bankAccounts.bride.number}
                  onCopy={() => handleCopy('bride')}
                >
                  <button
                    style={{
                      marginTop: '8px',
                      background:
                        'linear-gradient(145deg, #dcdcdc 0%, #bfbfbf 50%, #a6a6a6 100%)',
                      color: '#000',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '6px 14px',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      fontWeight: 600
                    }}
                  >
                    {copied.bride ? 'Copied!' : 'Copy'}
                  </button>
                </CopyToClipboard>
              </div>

              {/* Groom Card */}
              <div
                style={{
                  border: '1px solid #d0d0d0',
                  borderRadius: '12px',
                  padding: '14px',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
                  background: '#fff'
                }}
              >
                <p style={{ fontWeight: 'bold', marginBottom: '4px', color: '#333' }}>
                  {bankAccounts.groom.bank}
                </p>
                <p style={{ margin: '2px 0', fontSize: '0.9rem', color: '#444' }}>
                  Name: {bankAccounts.groom.name}
                </p>
                <p style={{ margin: '2px 0', fontSize: '0.9rem', color: '#444' }}>
                  Account: {bankAccounts.groom.number}
                </p>
                <CopyToClipboard
                  text={bankAccounts.groom.number}
                  onCopy={() => handleCopy('groom')}
                >
                  <button
                    style={{
                      marginTop: '8px',
                      background:
                        'linear-gradient(145deg, #dcdcdc 0%, #bfbfbf 50%, #a6a6a6 100%)',
                      color: '#000',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '6px 14px',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      fontWeight: 600
                    }}
                  >
                    {copied.groom ? 'Copied!' : 'Copy'}
                  </button>
                </CopyToClipboard>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WeddingGift;
