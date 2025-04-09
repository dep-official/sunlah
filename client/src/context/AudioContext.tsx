'use client'

import { createContext, useState, ReactNode } from 'react'

export const AudioContext = createContext<{
  isAudioReady: boolean;
  setIsAudioReady: (ready: boolean) => void;
}>({
  isAudioReady: false,
  setIsAudioReady: () => {},
});

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isAudioReady, setIsAudioReady] = useState(false);

  return (
    <AudioContext.Provider value={{ isAudioReady, setIsAudioReady }}>
      {children}
    </AudioContext.Provider>
  );
} 