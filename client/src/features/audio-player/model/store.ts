'use client';

import { create } from 'zustand';
import { AudioConfig } from '../types';

interface AudioStore {
  activeAudios: Record<string, HTMLAudioElement>;
  playedAudios: string[];
  audioConfigs: AudioConfig[];
  activeArtists: Array<{
    name: string;
    audioId: string;  // endTime 대신 audioId로 매칭
  }>;
  currentArtist?: string;
  hasInteracted: boolean;  // 사용자 상호작용 여부
  initializeAudio: () => void;
  playAudioById: (id: string) => void;
  isPlaying: boolean;
  setHasInteracted: () => void;  // 상호작용 상태 설정
  currentAudio: string | null;
  playAudio: (id: string) => void;
  stopAudio: () => void;
}

export const useAudioStore = create<AudioStore>((set, get) => ({
  activeAudios: {},
  playedAudios: [],
  activeArtists: [],
  hasInteracted: false,
  audioConfigs: [
   
    { 
      id: '1',
      artistId: 6,
      artistName: 'Daeho Chung',
      src: '/audio/6_Cheung_Deho.mp3', 
      duration: -1 
    },
    { 
      id: '2',
      artistId: 2,
      artistName: 'Luke Hart',
      src: '/audio/11_Luke_Hart.mp3', 
      duration: -1 
    },
    { 
      id: '3',
      artistId: 3,
      artistName: 'Oknah Kim Lah',
      src: '/audio/9_Kim_Okla.mp3',
      duration: -1 
    },
    { 
      id: '4',
      artistId: 4,
      artistName: 'Koh Gyeol',
      src: '/audio/3_Kogyol.mp3', 
      duration: -1 
    },
    { 
      id: '5',
      artistId: 5,
      artistName: 'Catherine Kruzic',
      src: '/audio/5_Catherine.mp3', 
      duration: -1 
    },
    { 
      id: '6',
      artistId: 6,
      artistName: 'Sun Lah',
      src: '/audio/1_Sun.mp3', 
      duration: -1
    },
    { 
      id: '7',
      artistId: 7,
      artistName: 'Hana Lee',
      src: '/audio/8_Hana_Lee.mp3', 
      duration: -1 
    },
    { 
      id: '8',
      artistId: 8,
      artistName: 'Yana Naidenov',
      src: '/audio/12_Yana.mp3', 
      duration: -1 
    },
    { 
      id: '9',
      artistId: 9,
      artistName: 'Chris Succo',
      src: '/audio/7_Chris_Succo.mp3', 
      duration: -1 
    },
    { 
      id: '10',
      artistId: 10,
      artistName: 'Heryun Oh',
      src: '/audio/10_Suns_Mom.mp3', 
      duration: -1 
    },
    { 
      id: '11',
      artistId: 11,
      artistName: 'Claire Poulter',
      src: '/audio/4_Claire.mp3', 
      duration: -1
    },
    { 
      id: '12',
      artistId: 12,
      artistName: 'Alexandre Renoux',
      src: '/audio/2_Alex.mp3', 
      duration: -1 
    },
  ],
  currentAudio: null,
  isPlaying: false,
  playAudio: (id) => set((state) => ({
    isPlaying: true,
    currentAudio: id,
    playedAudios: [...Array.from(state.playedAudios), id]
  })),
  stopAudio: () => set({ isPlaying: false, currentAudio: null }),

  initializeAudio: () => {
    const savedAudios = localStorage.getItem('playedAudios');
    const savedArtists = localStorage.getItem('activeArtists');

    if (savedAudios) {
      const savedIds = JSON.parse(savedAudios);
      set({ playedAudios: savedIds });

      if (savedArtists) {
        const artists = JSON.parse(savedArtists);
        const filteredArtists = artists.filter(
          (artist: { name: string; audioId: string }) => 
            savedIds.includes(artist.audioId)
        );
        set({ activeArtists: filteredArtists });
      }

      savedIds.forEach((id: string) => {
        const config = get().audioConfigs.find(cfg => cfg.id === id);
        if (config) {
          const audio = new Audio();
          audio.src = config.src;
          audio.loop = true;
          audio.preload = 'auto';
          audio.muted = true;
          audio.autoplay = true;
          audio.setAttribute('playsinline', '');

          get().activeAudios[id] = audio;

          const playAndUnmute = () => {
            const gesture = new MouseEvent('click', {
              bubbles: true,
              cancelable: true,
              view: window
            });
            document.dispatchEvent(gesture);

            audio.play().then(() => {
              audio.muted = false;
            }).catch(() => {
              setTimeout(playAndUnmute, 100);
            });
          };

          playAndUnmute();

          // 초기화 시에도 duration 체크하여 타이머 설정
          if (config.duration > 0) {
            const cleanupAudio = () => {
              audio.pause();
              audio.currentTime = 0;
              audio.src = '';
              audio.load();

              const { activeAudios, activeArtists, playedAudios } = get();
              
              const newActiveAudios = { ...activeAudios };
              delete newActiveAudios[id];
              
              const updatedArtists = activeArtists.filter(artist => artist.audioId !== id);
              const updatedPlayedAudios = playedAudios.filter(audioId => audioId !== id);
              
              set({ 
                activeAudios: newActiveAudios,
                activeArtists: updatedArtists,
                playedAudios: updatedPlayedAudios
              });

              localStorage.removeItem(`audio_${id}`);
              localStorage.setItem('activeArtists', JSON.stringify(updatedArtists));
              localStorage.setItem('playedAudios', JSON.stringify(updatedPlayedAudios));
            };

            setTimeout(cleanupAudio, config.duration);
          }
        }
      });
    }
  },

  playAudioById: (id: string) => {
    const { activeAudios, audioConfigs, playedAudios, activeArtists } = get();

    const config = audioConfigs.find(cfg => cfg.id === id);
    if (!config) return;

    // 이전에 실행 중이던 같은 오디오가 있다면 정리
    if (activeAudios[id]) {
      const existingAudio = activeAudios[id];
      existingAudio.pause();
      existingAudio.currentTime = 0;
      existingAudio.src = '';
      existingAudio.load();
      delete activeAudios[id];
    }

    const audio = new Audio();
    audio.src = config.src;
    audio.loop = true;
    audio.preload = 'auto';
    audio.muted = true;
    audio.autoplay = true;
    audio.setAttribute('playsinline', '');

    // 새 작가 추가
    const artistInfo = {
      name: config.artistName,
      audioId: id
    };
    const updatedArtists = [...activeArtists.filter(a => a.audioId !== id), artistInfo];
    set({ activeArtists: updatedArtists });
    localStorage.setItem('activeArtists', JSON.stringify(updatedArtists));

    const playAndUnmute = () => {
      const gesture = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      });
      document.dispatchEvent(gesture);

      audio.play().then(() => {
        audio.muted = false;
      }).catch(() => {
        setTimeout(playAndUnmute, 100);
      });
    };

    playAndUnmute();

    // duration이 있는 경우 타이머 설정
    if (config.duration > 0) {
      const cleanupAudio = () => {
        // 오디오 정지 및 리소스 해제
        audio.pause();
        audio.currentTime = 0;
        audio.src = '';
        audio.load();

        const { activeAudios, activeArtists, playedAudios } = get();
        
        // 상태에서 제거
        const newActiveAudios = { ...activeAudios };
        delete newActiveAudios[id];
        
        const updatedArtists = activeArtists.filter(artist => artist.audioId !== id);
        const updatedPlayedAudios = playedAudios.filter(audioId => audioId !== id);
        
        // 상태 업데이트
        set({ 
          activeAudios: newActiveAudios,
          activeArtists: updatedArtists,
          playedAudios: updatedPlayedAudios
        });

        // 로컬 스토리지 업데이트
        localStorage.removeItem(`audio_${id}`); // 개별 오디오 데이터 제거
        localStorage.setItem('activeArtists', JSON.stringify(updatedArtists));
        localStorage.setItem('playedAudios', JSON.stringify(updatedPlayedAudios));
      };

      setTimeout(cleanupAudio, config.duration);
    }

    // 현재 오디오 상태 저장
    set(state => ({
      activeAudios: { ...state.activeAudios, [id]: audio },
      playedAudios: [...new Set([...state.playedAudios, id])]
    }));

    localStorage.setItem('playedAudios', JSON.stringify([...new Set([...playedAudios, id])]));
  },

  setHasInteracted: () => {
    set({ hasInteracted: true });
  },
})); 