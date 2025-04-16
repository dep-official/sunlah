'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAudioStore } from '@/features/audio-player/model/store';
import { InteractionModal } from '@/features/audio-player/ui/InteractionModal';
import type { QRParams } from '@/features/audio-player/types';

// 현재 코드에서 useSearchParams를 사용하는 부분을 분리한 컴포넌트
function ProjectContent() {
  const searchParams = useSearchParams();
  const { addNewAudio, initializeAudio, activeArtists } = useAudioStore();

  const qrParams: QRParams = {
    id: searchParams.get('id') || '',
    lang: (searchParams.get('lang') as 'kr' | 'en') || 'kr'
  };

  // 컴포넌트 마운트 시 저장된 오디오 초기화
  useEffect(() => {
    initializeAudio();
  }, []);

  // URL의 id가 변경될 때마다 새 오디오 추가
  useEffect(() => {
    if (qrParams.id) {
      addNewAudio(qrParams.id);
    }
  }, [qrParams.id]);

  return (
    <div className="relative w-full max-w-[430px] mx-auto bg-white text-[#222] p-4 font-verdana">
      <div className="text-center">
        <h1 className="text-2xl" id='test'>
          7 Billion Project
        </h1> 
        <p className="mt-1 text-xl italic">- Skin and Flesh -</p>
        <p className='mt-3 text-xl'>Sun Lah</p>
        
        <p className="mt-20 mb-4 text-2xl">You are listening to</p>
        {activeArtists.length > 0 && (
          <div className="space-y-2">
            {activeArtists.map((artist, index) => (
              <div key={`${artist.audioId}-${index}`}>
                {index !== 0 && <p className="text-xl">*</p>}
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
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectContent />
    </Suspense>
  );
} 