'use client';

import { useAudioStore } from '../model/store';

export function InteractionModal() {
  const { hasInteracted, setHasInteracted } = useAudioStore();

  if (hasInteracted) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
      {/* 배경 블러 효과 */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-md"
        onClick={() => setHasInteracted()}
      />
      
      {/* 글래스모피즘 모달 */}
      <div 
        className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center
                   shadow-lg border border-white/20 max-w-md w-full
                   animate-fade-in transform transition-all"
        onClick={() => setHasInteracted()}
      >
        <p className="text-white text-2xl font-medium mb-4">
          원활한 작품 감상을 위해<br/> 
          화면을 클릭해주세요
        </p>
        <button
          className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg
                     transition-colors duration-200 border border-white/40"
          onClick={() => setHasInteracted()}
        >
          작품감상
        </button>
      </div>
    </div>
  );
} 