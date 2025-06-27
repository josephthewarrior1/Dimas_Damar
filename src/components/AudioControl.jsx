// src/components/AudioControl.jsx
import { useState } from 'react';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

export default function AudioControl({ isPlaying, onToggle }) {
  return (
    <button 
      onClick={onToggle}
      style={{
        position: 'fixed',
        left: '20px',
        top: '20px',
        background: 'rgba(255,255,255,0.2)',
        border: 'none',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        cursor: 'pointer',
        zIndex: 1000,
        backdropFilter: 'blur(4px)'
      }}
    >
      {isPlaying ? <FaVolumeUp size={20} /> : <FaVolumeMute size={20} />}
    </button>
  );
}