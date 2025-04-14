'use client';

import { useAudioStore, STORAGE_KEYS } from '../model/store';
import { useEffect } from 'react';

export function InteractionModal() {
  const { hasInteracted, setHasInteracted, activeAudios } = useAudioStore();

  // 컴포넌트 마운트 시 hasInteracted 상태를 false로 설정
  useEffect(() => {
    localStorage.removeItem(STORAGE_KEYS.HAS_INTERACTED);
  }, []);

  if (hasInteracted) return null;

  const handleInteraction = async () => {
    try {
      // 먼저 제스처 이벤트 생성
      const gesture = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      });
      document.dispatchEvent(gesture);

      // 모든 오디오 요소에 대해 재생 시도
      await Promise.all(
        Object.values(activeAudios).map(async (audio) => {
          try {
            audio.muted = true; // 초기에 음소거
            await audio.play();
            audio.muted = false; // 재생이 시작되면 음소거 해제
          } catch (error) {
            console.error('Failed to play audio:', error);
          }
        })
      );

      // 모든 오디오 재생이 시작된 후 상호작용 상태 업데이트
      setHasInteracted();
    } catch (error) {
      console.error('Error in handleInteraction:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* 배경 블러 효과 */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-md"
        onClick={handleInteraction}
      />
      {/* 글래스모피즘 모달 */}
      <div 
        className="relative w-full max-w-md p-8 text-center transition-all transform"
      >
        <button
          className="px-6 py-2 text-white transition-colors duration-200 border rounded-lg font-verdana bg-white/20 hover:bg-white/30 border-white/40"
          onClick={handleInteraction}
        >
          Tab Here
        </button>
      </div>
    </div>
  );
} 