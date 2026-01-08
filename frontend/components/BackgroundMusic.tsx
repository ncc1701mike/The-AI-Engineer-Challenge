'use client';

import { useState, useRef, useEffect } from 'react';

/**
 * BackgroundMusic Component
 * 
 * Provides soothing background music similar to Minecraft's soundscape.
 * Uses a royalty-free ambient track that loops seamlessly.
 * 
 * The music is intentionally subtle and calming, designed to enhance
 * focus and relaxation without being distracting.
 */
export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Initialize audio on mount
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Set to 30% volume for subtle background
      audioRef.current.loop = true;
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.error('Error playing audio:', error);
          // Some browsers require user interaction before playing audio
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        preload="auto"
        onEnded={() => {
          // Ensure looping works even if onEnded fires
          if (audioRef.current && isPlaying) {
            audioRef.current.play();
          }
        }}
      >
        {/* Using a royalty-free ambient track similar to Minecraft's soundscape */}
        {/* Try local file first, then fallback to external source */}
        <source src="/music/ambient-background.mp3" type="audio/mpeg" />
        <source src="/music/ambient-background.ogg" type="audio/ogg" />
        {/* Fallback: Pixabay royalty-free ambient track (Minecraft-like) */}
        <source 
          src="https://cdn.pixabay.com/download/audio/2022/03/19/audio_126368.mp3?filename=minecraft-song-126368.mp3" 
          type="audio/mpeg" 
        />
        Your browser does not support the audio element.
      </audio>

      <div className="music-controls">
        <button
          className="music-button"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button
          className="music-button"
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute music' : 'Mute music'}
        >
          {isMuted ? '🔇' : '🔊'}
        </button>
        <span className="music-label">Ambient</span>
      </div>
    </>
  );
}

