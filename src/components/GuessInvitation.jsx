import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ref, query, orderByChild, equalTo, onValue } from 'firebase/database';
import { db } from '../config/firebaseConfig';
import QRCode from 'react-qr-code';
import { saveAs } from 'file-saver';
import invitationData from '../data/invitationData';

export default function GuestInvitationPage() {
  const location = useLocation();
  const [guestData, setGuestData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

    console.log('Searching for guest:', { coupleId, guestCode });

    const guestsRef = ref(db, `couples/${coupleId}/guests`);
    const guestQuery = query(guestsRef, orderByChild('code'), equalTo(guestCode));

    const unsubscribe = onValue(guestQuery, (snapshot) => {
      try {
        console.log('Firebase response:', snapshot.val());
        
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
        
        console.log('Found guest:', guest);
        
        setGuestData({
          id: guestId,
          ...guest
        });
        setError('');
      } catch (err) {
        console.error('Error fetching guest:', err);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p>Loading your invitation...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md mx-4">
          <h1 className="text-2xl font-bold text-red-500 mb-2">Error</h1>
          <p className="mb-4">{error}</p>
          <p>Please check your invitation link or contact the couple.</p>
          <p className="mt-2 text-sm text-gray-600">
            Trying to access: {coupleId}_{guestCode}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundImage: `url(${invitationData.rsvpImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        color: "white",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          padding: "30px",
          maxWidth: "500px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            marginBottom: "20px",
            fontFamily: "'Playfair Display', serif",
          }}
        >
          Wedding Invitation
        </h1>

        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "15px",
            marginBottom: "20px",
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <QRCode
            id="guest-qr-code"
            value={`${window.location.origin}/home?to=${coupleId}_${guestCode}`}
            size={200}
            level="H"
            bgColor="#ffffff"
            fgColor="#000000"
          />
        </div>

        <div
          style={{
            marginBottom: "20px",
            textAlign: "left",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            padding: "15px",
            borderRadius: "10px",
          }}
        >
          <p style={{ marginBottom: "8px" }}>
            <strong>Name:</strong> {guestData.name}
          </p>
          <p style={{ marginBottom: "8px" }}>
            <strong>Invitation Code:</strong> {guestData.code}
          </p>
          <p style={{ marginBottom: "8px" }}>
            <strong>Status:</strong> {guestData.status || 'pending'}
          </p>
        </div>

        <button
          onClick={downloadQRCode}
          style={{
            backgroundColor: "#fdbb3c",
            color: "white",
            border: "none",
            padding: "12px 24px",
            borderRadius: "25px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "1rem",
            transition: "all 0.3s ease",
            marginBottom: "15px",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          Download QR Code
        </button>

        <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>
          Present this QR code at the wedding entrance
        </p>
      </div>
    </div>
  );
}