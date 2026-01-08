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
 * Autoplays on mount with only a mute/unmute control.
 */
export default function BackgroundMusic() {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Initialize audio - start muted to allow autoplay, then unmute on first interaction
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.25; // Set to 25% volume for subtle background
      audioRef.current.loop = true;
      audioRef.current.muted = true; // Start muted to allow autoplay
      
      // Try to autoplay (starting muted often works better in browsers)
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Autoplay succeeded (muted)
            console.log('Audio autoplay started (muted)');
          })
          .catch((error) => {
            console.log('Autoplay prevented:', error);
          });
      }
    }
  }, []);

  // Handle user interaction to unmute audio automatically
  useEffect(() => {
    const handleUserInteraction = () => {
      if (audioRef.current && isMuted === false && audioRef.current.muted) {
        // User interacted - unmute automatically
        audioRef.current.muted = false;
        console.log('Audio unmuted on user interaction');
      }
    };

    // Listen for any user interaction to unmute
    window.addEventListener('click', handleUserInteraction, { once: true });
    window.addEventListener('keydown', handleUserInteraction, { once: true });
    window.addEventListener('touchstart', handleUserInteraction, { once: true });
    window.addEventListener('mousedown', handleUserInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('mousedown', handleUserInteraction);
    };
  }, [isMuted]);

  const toggleMute = () => {
    if (audioRef.current) {
      const newMutedState = !isMuted;
      audioRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        preload="auto"
        autoPlay
        loop
        onError={(e) => {
          // Handle audio loading errors gracefully
          const audio = e.currentTarget;
          console.log('Audio loading error, attempting fallback...');
          
          // If we haven't tried the fallback yet, switch to it
          if (audio.src && !audio.src.includes('soundhelix') && !audio.src.includes('archive.org')) {
            // Try multiple soothing fallback URLs
            const fallbacks = [
              'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
              'https://archive.org/download/MinecraftVolumeAlpha/Minecraft%20-%20Volume%20Alpha%20-%2003%20Subwoofer%20Lullaby.mp3'
            ];
            
            let fallbackIndex = 0;
            const tryNextFallback = () => {
              if (fallbackIndex < fallbacks.length) {
                audio.src = fallbacks[fallbackIndex];
                fallbackIndex++;
                audio.load();
                audio.play().catch(() => {
                  if (fallbackIndex < fallbacks.length) {
                    tryNextFallback();
                  }
                });
              }
            };
            
            tryNextFallback();
          }
        }}
      >
        {/* Try local file first, then fallback to soothing ambient sources */}
        <source src="/music/ambient-background.mp3" type="audio/mpeg" />
        <source src="/music/ambient-background.ogg" type="audio/ogg" />
        {/* Fallback: Soothing ambient tracks - more calming and peaceful */}
        <source 
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" 
          type="audio/mpeg" 
        />
        <source 
          src="https://archive.org/download/MinecraftVolumeAlpha/Minecraft%20-%20Volume%20Alpha%20-%2003%20Subwoofer%20Lullaby.mp3" 
          type="audio/mpeg" 
        />
        <source 
          src="https://freemusicarchive.org/file/music/ccCommunity/Kevin_MacLeod/Kevin_MacLeod_-_08_-_Lullaby.mp3" 
          type="audio/mpeg" 
        />
        Your browser does not support the audio element.
      </audio>

      <div className="music-controls">
        <button
          className="music-button"
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute music' : 'Mute music'}
          title={isMuted ? 'Unmute music' : 'Mute music'}
        >
          {isMuted ? '🔇' : '🔊'}
        </button>
      </div>
    </>
  );
}

