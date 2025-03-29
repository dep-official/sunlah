'use client';

import { useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { useAudioStore } from '@/features/audio-player/model/store';
import type { QRParams } from '@/features/audio-player/types';

export default function QRPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { playAudioById, currentArtist } = useAudioStore();

  const qrParams: QRParams = {
    id: params.id as string,
    lang: (searchParams.get('lang') as 'kr' | 'en') || 'kr'
  };

  useEffect(() => {
    if (qrParams.id) {
      playAudioById(qrParams.id);
    }
  }, [qrParams.id, playAudioById]);

  return (
    <div className="w-full min-h-screen max-w-[430px] mx-auto bg-black text-white p-4">
      <div className="text-center">
        <h1 className="text-2xl mb-4">
          {qrParams.lang === 'kr' ? '현재 재생 중' : 'Now Playing'}
        </h1>
        {currentArtist && (
          <p className="text-xl">
            {qrParams.lang === 'kr' ? '작가: ' : 'Artist: '}
            {currentArtist}
          </p>
        )}
      </div>
    </div>
  );
} 