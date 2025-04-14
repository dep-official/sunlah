'use client';

import { create } from 'zustand';
import type { AudioStore, AudioConfig } from '../types';

const audioConfigs: AudioConfig[] = [
  { 
    id: '1',
    artistId: 1,
    artistName: 'Daeho Chung',
    src: '/audio/1_Cheung_Deho.mp3', 
    duration: -1
  },
  { 
    id: '2',
    artistId: 2,
    artistName: 'Luke Hart',
    src: '/audio/2_Luke_Hart.mp3', 
    duration: -1
  },
  { 
    id: '3',
    artistId: 3,
    artistName: 'Oknah Kim Lah',
    src: '/audio/3_Kim_Okla.mp3', 
    duration: -1
  },
  { 
    id: '4',
    artistId: 4,
    artistName: 'Koh Gyeol',
    src: '/audio/4_Kogyol.mp3', 
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
    src: '/audio/6_SunLah.mp3', 
    duration: -1
  },
  { 
    id: '7',
    artistId: 7,
    artistName: 'Hana Lee',
    src: '/audio/7_Hana_Lee.mp3', 
    duration: -1
  },
  { 
    id: '8',
    artistId: 8,
    artistName: 'Yana Naidenov',
    src: '/audio/8_Yana.mp3', 
    duration: -1
  },
  { 
    id: '9',
    artistId: 9,
    artistName: 'Chris Succo',
    src: '/audio/9_Chris_Succo.mp3', 
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
    src: '/audio/11_Claire.mp3', 
    duration: -1
  },
  { 
    id: '12',
    artistId: 12,
    artistName: 'Alexandre Renoux',
    src: '/audio/12_Alex.mp3', 
    duration: -1
  }
];

export const STORAGE_KEYS = {
  PLAYED_AUDIOS: 'playedAudios',
  ACTIVE_ARTISTS: 'activeArtists',
  HAS_INTERACTED: 'hasInteracted',
};

export const useAudioStore = create<AudioStore>((set, get) => ({
  activeAudios: {},
  activeArtists: [],
  playedAudios: [],
  hasInteracted: false,
  audioConfigs,

  setHasInteracted: () => {
    set({ hasInteracted: true });
    
    // localStorage에 상호작용 상태 저장
    localStorage.setItem(STORAGE_KEYS.HAS_INTERACTED, 'true');

    // 모든 저장된 오디오 재생 시도
    const { activeAudios } = get();
    Object.values(activeAudios).forEach(async (audio) => {
      try {
        // 오디오 요소 초기화
        audio.muted = true;
        await audio.play();
        // 재생이 시작되면 음소거 해제
        audio.muted = false;
      } catch (error) {
        console.error('Failed to play audio:', error);
      }
    });
  },

  initializeAudio: () => {
    try {
      // localStorage에서 상태 복원
      const savedHasInteracted = localStorage.getItem(STORAGE_KEYS.HAS_INTERACTED);
      const savedAudios = localStorage.getItem(STORAGE_KEYS.PLAYED_AUDIOS);
      const savedArtists = localStorage.getItem(STORAGE_KEYS.ACTIVE_ARTISTS);

      // hasInteracted 상태는 localStorage에서 가져오지 않고 항상 false로 시작
      set({ hasInteracted: false });

      if (savedAudios) {
        const savedIds = JSON.parse(savedAudios);
        set({ playedAudios: savedIds });

        if (savedArtists) {
          const artists = JSON.parse(savedArtists);
          set({ activeArtists: artists });
        }

        // 각 오디오 초기화
        savedIds.forEach((id: string) => {
          const config = get().audioConfigs.find(cfg => cfg.id === id);
          if (config) {
            const audio = new Audio();
            audio.src = config.src;
            audio.loop = true;
            audio.preload = 'auto';
            audio.muted = true; // 초기에는 음소거 상태로 설정

            set(state => ({
              activeAudios: { ...state.activeAudios, [id]: audio }
            }));
          }
        });
      }
    } catch (error) {
      console.error('Error initializing audio:', error);
    }
  },

  addNewAudio: async (id: string) => {
    try {
      const { activeAudios, audioConfigs, playedAudios, activeArtists, hasInteracted } = get();

      if (playedAudios.includes(id)) {
        console.log('Audio already playing for ID:', id);
        return;
      }

      const config = audioConfigs.find(cfg => cfg.id === id);
      if (!config) {
        console.log('No audio config found for ID:', id);
        return;
      }

      const audio = new Audio();
      audio.src = config.src;
      audio.loop = true;
      audio.preload = 'auto';

      const artistInfo = {
        name: config.artistName,
        audioId: id
      };

      const updatedArtists = [...activeArtists, artistInfo];
      const updatedPlayedAudios = [...new Set([...playedAudios, id])];

      set({
        activeAudios: { ...activeAudios, [id]: audio },
        activeArtists: updatedArtists,
        playedAudios: updatedPlayedAudios
      });

      localStorage.setItem(STORAGE_KEYS.ACTIVE_ARTISTS, JSON.stringify(updatedArtists));
      localStorage.setItem(STORAGE_KEYS.PLAYED_AUDIOS, JSON.stringify(updatedPlayedAudios));

      if (hasInteracted) {
        try {
          await audio.play();
          audio.muted = false;
        } catch (error) {
          console.error('Failed to play audio:', error);
        }
      }
    } catch (error) {
      console.error('Error adding new audio:', error);
    }
  }
})); 