import { create } from 'zustand';
import { AudioConfig } from '../types';

interface AudioStore {
  activeAudios: Record<string, HTMLAudioElement>;
  playedAudios: string[];
  audioConfigs: AudioConfig[];
  currentArtist?: string;
  audioContext?: AudioContext;
  initializeAudio: () => void;
  playAudioById: (id: string) => void;
  isPlaying: (id: string) => boolean;
}

export const useAudioStore = create<AudioStore>((set, get) => ({
  activeAudios: {},
  playedAudios: [],
  audioConfigs: [
    { 
      id: '1',
      artistId: 1,
      artistName: '작가1',
      src: '/audio/01.mp3', 
      duration: 30000 
    },
    { 
      id: '2',
      artistId: 2,
      artistName: '작가2',
      src: '/audio/02.mp3', 
      duration: -1 
    },
    { 
      id: '3',
      artistId: 3,
      artistName: '작가3',
      src: '/audio/03.mp3', 
      duration: 45000 
    },
    { 
      id: '4',
      artistId: 4,
      artistName: '작가4',
      src: '/audio/04.mp3', 
      duration: 45000 
    },
    // ... Add more configurations for QR1-12
  ],

  initializeAudio: () => {
    // AudioContext 초기화
    if (!get().audioContext) {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const context = new AudioContext();
      
      // 페이지 클릭 시 AudioContext 재개
      document.addEventListener('click', () => {
        if (context.state === 'suspended') {
          context.resume();
        }
      }, { once: true });

      set({ audioContext: context });
    }

    const savedAudios = localStorage.getItem('playedAudios');
    if (savedAudios) {
      const savedIds = JSON.parse(savedAudios);
      set({ playedAudios: savedIds });

      savedIds.forEach((id: string) => {
        const config = get().audioConfigs.find(cfg => cfg.id === id);
        if (config) {
          const audio = new Audio();
          audio.src = config.src;
          audio.loop = true;
          audio.preload = 'auto';

          // AudioContext에 연결
          const { audioContext } = get();
          if (audioContext) {
            const source = audioContext.createMediaElementSource(audio);
            source.connect(audioContext.destination);
          }

          get().activeAudios[id] = audio;

          // 사용자 첫 클릭 시 재생 시작
          const startPlayback = () => {
            audio.play().catch(console.error);
            document.removeEventListener('click', startPlayback);
          };
          document.addEventListener('click', startPlayback, { once: true });
        }
      });
    }
  },

  playAudioById: (id: string) => {
    const { activeAudios, audioConfigs, playedAudios, audioContext } = get();

    if (activeAudios[id]) {
      const existingAudio = activeAudios[id];
      existingAudio.currentTime = 0;
      
      if (audioContext?.state === 'running') {
        existingAudio.play().catch(console.error);
      } else {
        // 사용자 첫 클릭 시 재생 시작
        const startPlayback = () => {
          existingAudio.play().catch(console.error);
          document.removeEventListener('click', startPlayback);
        };
        document.addEventListener('click', startPlayback, { once: true });
      }
      return;
    }

    const config = audioConfigs.find(cfg => cfg.id === id);
    if (!config) return;

    const audio = new Audio();
    audio.src = config.src;
    audio.loop = true;
    audio.preload = 'auto';

    // AudioContext에 연결
    if (audioContext) {
      const source = audioContext.createMediaElementSource(audio);
      source.connect(audioContext.destination);
    }

    set({ currentArtist: config.artistName });

    // 사용자 첫 클릭 시 재생 시작
    const startPlayback = () => {
      audio.play().catch(console.error);
      document.removeEventListener('click', startPlayback);
    };
    document.addEventListener('click', startPlayback, { once: true });

    if (config.duration > 0) {
      setTimeout(() => {
        audio.pause();
        const { activeAudios } = get();
        delete activeAudios[id];
        set({ activeAudios });
      }, config.duration);
    }

    set(state => ({
      activeAudios: { ...state.activeAudios, [id]: audio },
      playedAudios: [...new Set([...state.playedAudios, id])]
    }));

    localStorage.setItem('playedAudios', JSON.stringify([...new Set([...playedAudios, id])]));
  },

  isPlaying: (id: string) => {
    return !!get().activeAudios[id];
  },
})); 