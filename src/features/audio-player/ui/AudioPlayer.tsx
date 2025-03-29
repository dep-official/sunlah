'use client';

import { useAudioStore } from '../model/store';

export function AudioPlayer() {
  const { playAudio, isPlaying, playedAudios } = useAudioStore();

  // Simulated QR codes for testing
  const qrCodes = Array.from({ length: 12 }, (_, i) => `QR${i + 1}`);

  return (
    <div className="grid grid-cols-1 gap-4">
      {qrCodes.map(qrId => (
        <button
          key={qrId}
          onClick={() => playAudio(qrId)}
          className={`p-4 rounded-lg ${
            isPlaying(qrId)
              ? 'bg-green-500'
              : playedAudios.includes(qrId)
              ? 'bg-blue-500'
              : 'bg-gray-700'
          }`}
        >
          {qrId} {isPlaying(qrId) ? '(Playing)' : playedAudios.includes(qrId) ? '(Played)' : ''}
        </button>
      ))}
    </div>
  );
} 