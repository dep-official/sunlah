'use client'

import { useContext, useEffect, useRef } from 'react'
import { AudioContext } from '@/context/AudioContext'

export const AudioPlayer = ({ src }: { src: string }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { setIsAudioReady } = useContext(AudioContext);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      
      audioRef.current.addEventListener('loadeddata', () => {
        console.log('Audio loaded');
        setIsAudioReady(true);
      });

      audioRef.current.addEventListener('error', (e) => {
        console.error('Audio error:', e);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('loadeddata', () => {});
        audioRef.current.removeEventListener('error', () => {});
      }
    };
  }, [setIsAudioReady]);

  return (
    <audio 
      ref={audioRef}
      preload="auto"
      src={src}
      controls
    />
  );
}; 