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
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Initialize audio and attempt autoplay on mount
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Set to 30% volume for subtle background
      audioRef.current.loop = true;
      
      // Try to autoplay (may fail on some browsers without user interaction)
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Autoplay succeeded
            setHasInteracted(true);
          })
          .catch((error) => {
            // Autoplay failed - user will need to interact first
            console.log('Autoplay prevented. User interaction required.');
          });
      }
    }
  }, []);

  // Handle user interaction to enable autoplay
  useEffect(() => {
    const handleUserInteraction = () => {
      if (audioRef.current && !hasInteracted && !isMuted) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setHasInteracted(true))
            .catch(() => {});
        }
      }
    };

    // Listen for any user interaction
    window.addEventListener('click', handleUserInteraction, { once: true });
    window.addEventListener('keydown', handleUserInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
    };
  }, [hasInteracted, isMuted]);

  const toggleMute = () => {
    if (audioRef.current) {
      const newMutedState = !isMuted;
      audioRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
      
      // If unmuting and hasn't played yet, try to play
      if (!newMutedState && !hasInteracted) {
        audioRef.current.play()
          .then(() => setHasInteracted(true))
          .catch(() => {});
      }
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
            // Try multiple fallback URLs
            const fallbacks = [
              'https://archive.org/download/minecraft_music_volume_alpha/Calm1.mp3',
              'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
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
        {/* Try local file first, then fallback to external source */}
        <source src="/music/ambient-background.mp3" type="audio/mpeg" />
        <source src="/music/ambient-background.ogg" type="audio/ogg" />
        {/* Fallback: Royalty-free ambient tracks */}
        <source 
          src="https://archive.org/download/minecraft_music_volume_alpha/Calm1.mp3" 
          type="audio/mpeg" 
        />
        <source 
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
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

