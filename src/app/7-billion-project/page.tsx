'use client';

import { useEffect } from 'react';
import { AudioPlayer } from '@/features/audio-player';
import { useAudioStore } from '@/features/audio-player/model/store';

export default function SevenBillionProject() {
  const { initializeAudio } = useAudioStore();

  useEffect(() => {
    initializeAudio();
  }, [initializeAudio]);

  return (
    <div className="w-full min-h-screen max-w-[430px] mx-auto bg-black text-white p-4">
      <AudioPlayer />
    </div>
  );
}
