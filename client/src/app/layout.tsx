'use client'

import "@/app/globals.css";
import dynamic from 'next/dynamic';
import { createContext, useState } from 'react'

const AudioPlayer = dynamic(
  () => import('@/features/audio-player').then(mod => mod.AudioPlayer),
  { ssr: false }
);

export const AudioContext = createContext<{
  isAudioReady: boolean;
  setIsAudioReady: (ready: boolean) => void;
}>({
  isAudioReady: false,
  setIsAudioReady: () => {},
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAudioReady, setIsAudioReady] = useState(false);

  return (
    <html lang="ko">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/sfe3gei.css" />
      </head>
      <body>
        <AudioContext.Provider value={{ isAudioReady, setIsAudioReady }}>
          {children}
        </AudioContext.Provider>
      </body>
    </html>
  );
}
