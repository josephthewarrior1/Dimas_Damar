// src/components/LoadingScreen/index.jsx
import { Icon } from '@iconify/react';
import circularProgress from '@iconify/icons-mingcute/loading-line';

export default function LoadingScreen() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      zIndex: 9999
    }}>
      <Icon 
        icon={circularProgress} 
        width={60} 
        height={60} 
        color="#8B4513" 
        style={{ animation: 'spin 1s linear infinite' }} 
      />
      
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}