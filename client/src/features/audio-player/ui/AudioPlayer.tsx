'use client';

import { useAudioStore } from '../model/store';

interface AudioPlayerProps {
  audioUrl: string;
  id: string;
}

export function AudioPlayer({ audioUrl, id }: AudioPlayerProps) {
  const { playAudio, isPlaying, playedAudios, currentAudio, addNewAudio } = useAudioStore();

  const handleClick = () => {
    addNewAudio(id);
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <button
        onClick={handleClick}
        className={`p-4 rounded-lg ${
          isPlaying && currentAudio === id
            ? 'bg-green-500'
            : playedAudios.includes(id)
            ? 'bg-blue-500'
            : 'bg-gray-700'
        }`}
      >
        {id} {isPlaying && currentAudio === id ? '(Playing)' : playedAudios.includes(id) ? '(Played)' : ''}
      </button>
    </div>
  );
} 