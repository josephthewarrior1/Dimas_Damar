// src/components/AudioPlayer.jsx
import { useEffect, useRef, useState } from 'react';

export default function AudioPlayer({ audioUrl }) {
  const audioRef = useRef(null);
  const [userInteracted, setUserInteracted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Handle interaksi pertama pengguna
  useEffect(() => {
    const handleFirstInteraction = () => {
      setUserInteracted(true);
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  // Handle play/pause
  useEffect(() => {
    if (!audioRef.current || !userInteracted) return;

    const playAudio = async () => {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Playback error:", error);
        setIsPlaying(false);
      }
    };

    if (isPlaying) {
      playAudio();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, userInteracted]);

  // Auto-play setelah interaksi pertama
  useEffect(() => {
    if (userInteracted) {
      setIsPlaying(true);
    }
  }, [userInteracted]);

  return (
    <div className="audio-player">
      <button 
        onClick={() => setIsPlaying(!isPlaying)}
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? '⏸' : '▶'}
      </button>
      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}${audioUrl}`}
        loop
        preload="auto"
      />
    </div>
  );
}