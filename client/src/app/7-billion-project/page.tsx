'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAudioStore } from '@/features/audio-player/model/store';
import { InteractionModal } from '@/features/audio-player/ui/InteractionModal';
import type { QRParams } from '@/features/audio-player/types';

// 현재 코드에서 useSearchParams를 사용하는 부분을 분리한 컴포넌트
function ProjectContent() {
  const searchParams = useSearchParams();
  const { playAudioById, activeArtists, initializeAudio } = useAudioStore();

  const qrParams: QRParams = {
    id: searchParams.get('id') || '',
    lang: (searchParams.get('lang') as 'kr' | 'en') || 'kr'
  };

  // 초기화를 위한 useEffect
  useEffect(() => {
    initializeAudio();
  }, [initializeAudio]);

  // 오디오 재생을 위한 별도의 useEffect
  useEffect(() => {
    if (qrParams.id) {
      playAudioById(qrParams.id);
    }
  }, [qrParams.id, playAudioById]);

  return (
    <div className="w-full pt-40 min-h-screen max-w-[430px] mx-auto bg-white text-[#222] p-4 font-nicholas">
      <div className="text-center">
        <h1 className="text-3xl">
          7 Billion Project
        </h1> 
        <p className="italic text-2xl mt-1">- Skin and fleb -</p>
        <p className='text-2xl mt-3'>Sun Lah</p>
        
        <p className="mt-20 mb-4 text-3xl">You are listening to</p>
        {activeArtists.length > 0 && (
          <div className="space-y-2">
            {activeArtists.map((artist, index) => (
              <div key={index}>
                {index !== 0 && <p>*</p>}
                <p className="text-xl mt-1">{artist.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <InteractionModal />
    </div>
  );
}

// 메인 페이지 컴포넌트
export default function BillionProjectPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectContent />
    </Suspense>
  );
} 