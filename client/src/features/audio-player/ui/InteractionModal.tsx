'use client';

import { useAudioStore } from '../model/store';

export function InteractionModal() {
  const { hasInteracted, setHasInteracted } = useAudioStore();

  if (hasInteracted) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* 배경 블러 효과 */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-md"
        onClick={() => setHasInteracted()}
      />
      {/* 글래스모피즘 모달 */}
      <div 
        className="relative w-full max-w-md p-8 text-center transition-all transform "
        onClick={() => setHasInteracted()}
      >
    
        <button
          className="px-6 py-2 text-white transition-colors duration-200 border rounded-lg font-verdana bg-white/20 hover:bg-white/30 border-white/40"
          onClick={() => setHasInteracted()}
        >
          Tab Here
        </button>
      </div>
    </div>
  );
} 