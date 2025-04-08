'use client';

import { useAudioStore } from '../model/store';

interface AudioPlayerProps {
  audioUrl: string;
  id: string;
}

export function AudioPlayer({ audioUrl, id }: AudioPlayerProps) {
  const { playAudio, isPlaying, playedAudios, currentAudio } = useAudioStore();

  // Simulated QR codes for testing
  const qrCodes = Array.from({ length: 12 }, (_, i) => `QR${i + 1}`);

  return (
    <div className="grid grid-cols-1 gap-4">
      {qrCodes.map(qrId => (
        <button
          key={qrId}
          onClick={() => playAudio(qrId)}
          className={`p-4 rounded-lg ${
            isPlaying && audioUrl === qrId
              ? 'bg-green-500'
              : playedAudios.includes(qrId)
              ? 'bg-blue-500'
              : 'bg-gray-700'
          }`}
        >
          {qrId} {isPlaying && audioUrl === qrId ? '(Playing)' : playedAudios.includes(qrId) ? '(Played)' : ''}
        </button>
      ))}
    </div>
  );
} 