'use client'

import "@/app/globals.css";
import dynamic from 'next/dynamic';
import { AudioProvider } from '@/context/AudioContext';

const AudioPlayer = dynamic(
  () => import('@/features/audio-player').then(mod => mod.AudioPlayer),
  { ssr: false }
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/sfe3gei.css" />
      </head>
      <body>
        <AudioProvider>
          {children}
        </AudioProvider>
      </body>
    </html>
  );
}
