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

  // Initialize audio and attempt immediate autoplay (not muted)
  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    audio.volume = 0.25; // Set to 25% volume for subtle background
    audio.loop = true;
    audio.muted = false; // Not muted - try to play with sound
    audio.preload = 'auto';
    
    // Set up error handling for source loading with working URLs
    let currentSourceIndex = 0;
    const audioSources = [
      '/music/ambient-background.mp3',
      'https://archive.org/download/MinecraftVolumeAlpha/03%20Subwoofer%20Lullaby.mp3',
      'https://ia800504.us.archive.org/10/items/MinecraftVolumeAlpha/03%20Subwoofer%20Lullaby.mp3',
      'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
    ];

    const attemptPlay = async (src: string) => {
      audio.src = src;
      audio.load();
      
      // Try unmuted autoplay first
      try {
        await audio.play();
        console.log('Audio autoplay started with sound');
        audio.muted = false;
        return true;
      } catch (error) {
        // Autoplay with sound blocked, try muted
        console.log('Autoplay with sound blocked, trying muted approach');
        audio.muted = true;
        try {
          await audio.play();
          console.log('Audio started muted, will unmute on first interaction');
          // Unmute on any user interaction
          const unmuteOnInteraction = () => {
            if (!isMuted && audio.muted) {
              audio.muted = false;
              console.log('Audio unmuted on user interaction');
            }
            document.removeEventListener('click', unmuteOnInteraction);
            document.removeEventListener('keydown', unmuteOnInteraction);
            document.removeEventListener('touchstart', unmuteOnInteraction);
          };
          document.addEventListener('click', unmuteOnInteraction, { once: true });
          document.addEventListener('keydown', unmuteOnInteraction, { once: true });
          document.addEventListener('touchstart', unmuteOnInteraction, { once: true });
          return true;
        } catch (mutedError) {
          console.log('Muted autoplay also failed:', mutedError);
          return false;
        }
      }
    };

    const tryNextSource = async () => {
      if (currentSourceIndex < audioSources.length) {
        const src = audioSources[currentSourceIndex];
        currentSourceIndex++;
        const success = await attemptPlay(src);
        if (!success && currentSourceIndex < audioSources.length) {
          // Try next source after a brief delay
          setTimeout(tryNextSource, 500);
        }
      }
    };

    // Handle source loading errors
    audio.addEventListener('error', (e) => {
      console.log('Audio source loading error, trying next source...', e);
      if (currentSourceIndex < audioSources.length) {
        setTimeout(tryNextSource, 500);
      }
    });

    // Handle successful load
    audio.addEventListener('canplaythrough', () => {
      console.log('Audio loaded successfully');
    });

    // Start with first source after a brief delay to ensure component is mounted
    setTimeout(tryNextSource, 200);
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
      >
        {/* Audio sources will be set programmatically for better error handling */}
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

