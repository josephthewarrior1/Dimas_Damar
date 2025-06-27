// src/components/AudioPlayer.jsx
import { useEffect, useRef } from 'react';

export default function AudioPlayer({ audioUrl, isPlaying }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) return;

    const handleFirstInteraction = () => {
      // Coba memutar audio saat interaksi pertama
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.log("Playback prevented:", error);
        });
      }
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };

    // Tambahkan event listener untuk interaksi pertama
    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch(error => {
        console.log("Playback prevented:", error);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return <audio ref={audioRef} src={audioUrl} loop />;
}