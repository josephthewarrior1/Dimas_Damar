import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import invitationData from '../data/invitationData';

const WeddingGift = () => {
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

  return (
    <section style={{
      width: '100%',
      padding: '30px 20px',
      backgroundColor: '#8e6e53',
      margin: '0 auto',
      textAlign: 'center',
      fontFamily: '"Cormorant Garamond", serif',
      boxSizing: 'border-box',
      position: 'relative',
      color: 'white'
    }}>
     

      {/* Header Text */}
      <div style={{
        
        padding: '20px 0',
        position: 'relative',
      }}>
        <div style={{
          position: 'relative',
          zIndex: 2,
          color: '#fff'
        }}>
          <h2 style={{
            fontSize: '1.6rem',
            fontWeight: 400,
            letterSpacing: '1px',
            margin: 0,
            lineHeight: '1.1',
            fontFamily: "'Playfair Display', serif",
          }}>
            WEDDING GIFT
          </h2>
        </div>
      </div>

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
            onClick={() => setShowBankDetails(true)}
            style={{
                backgroundColor: '#a08a5a',
                color: 'white',
                border: '1px solid #a08a5a',
                padding: '8px 22px',
                fontSize: '0.95rem',
                borderRadius: '30px',
                cursor: 'pointer',
                fontFamily: '"Cormorant Garamond", serif',
                letterSpacing: '1px',
                marginBottom: '10px',
                transition: 'none',
            }}
            >
            Send Gift
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

          <button
            onClick={() => setShowBankDetails(false)}
            style={{
              backgroundColor: 'transparent',
              color: 'rgba(255,255,255,0.7)',
              border: '1px solid rgba(255,255,255,0.3)',
              padding: '6px 16px',
              fontSize: '0.85rem',
              borderRadius: '30px',
              cursor: 'pointer',
              fontFamily: '"Cormorant Garamond", serif',
              transition: 'all 0.3s ease',
              ':hover': {
                backgroundColor: 'rgba(255,255,255,0.1)'
              }
            }}
          >
            Close
          </button>
        </div>
      )}

     
    </section>
  );
};

export default WeddingGift;