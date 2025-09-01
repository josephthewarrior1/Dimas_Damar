import { useEffect, useRef } from 'react';

export default function AudioPlayer({ audioUrl, isPlaying, onPlay, onPause }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.volume = 0.5;
        audioRef.current.loop = true;
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log("Autoplay prevented:", error);
            // Fallback untuk autoplay policy
            document.addEventListener('click', function handler() {
              audioRef.current.play();
              document.removeEventListener('click', handler);
            });
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    
    // Event listeners untuk update state
    const handlePlay = () => onPlay && onPlay();
    const handlePause = () => onPause && onPause();
    
    if (audio) {
      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);
    }

    return () => {
      if (audio) {
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
      }
    };
  }, [onPlay, onPause]);

  return (
    <audio
      ref={audioRef}
      src={audioUrl}
      preload="auto"
      style={{ display: 'none' }}
    />
  );
}