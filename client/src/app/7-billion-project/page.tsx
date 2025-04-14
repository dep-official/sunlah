'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAudioStore } from '@/features/audio-player/model/store';
import { InteractionModal } from '@/features/audio-player/ui/InteractionModal';
import type { QRParams } from '@/features/audio-player/types';

// 현재 코드에서 useSearchParams를 사용하는 부분을 분리한 컴포넌트
function ProjectContent() {
  const searchParams = useSearchParams();
  const { addNewAudio, activeArtists, hasInteracted } = useAudioStore();

  const qrParams: QRParams = {
    id: searchParams.get('id') || '',
    lang: (searchParams.get('lang') as 'kr' | 'en') || 'kr'
  };

  // URL의 id가 변경될 때마다 처리
  useEffect(() => {
    if (qrParams.id) {
      addNewAudio(qrParams.id);
    }
  }, [qrParams.id]);

  return (
    <div className="w-full pt-40 max-w-[430px] mx-auto bg-white text-[#222] p-4 font-nicholas">
      <div className="text-center">
        <h1 className="text-3xl">
          7 Billion Project
        </h1> 
        <p className="mt-1 text-2xl italic">- Skin and Flesh -</p>
        <p className='mt-3 text-2xl'>Sun Lah</p>
        
        <p className="mt-20 mb-4 text-3xl">You are listening to</p>
        {activeArtists.length > 0 && (
          <div className="space-y-2">
            {activeArtists.map((artist, index) => (
              <div key={`${artist.audioId}-${index}`}>
                {index !== 0 && <p className="text-xl">+</p>}
                <p className="mt-1 text-xl">{artist.name}</p>
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
    <Suspense fallback={<div></div>}>
      <ProjectContent />
    </Suspense>
  );
} 