'use client';

import { create } from 'zustand';
import { AudioConfig } from '../types';

interface AudioStore {
  activeAudios: Map<string, HTMLAudioElement>;
  activeArtists: Array<{
    name: string;
    audioId: string;
  }>;
  audioConfigs: AudioConfig[];
  hasInteracted: boolean;
  initializeAudio: () => void;
  playAudioById: (id: string) => void;
  setHasInteracted: () => void;
}

interface Artist {
  name: string;
  audioId: string;
}

const STORAGE_KEYS = {
  VISITED_IDS: 'visitedAudioIds',
  HAS_INTERACTED: 'hasInteracted',
};

// 브라우저 종료 시에만 초기화하도록 수정
if (typeof window !== 'undefined') {
  let isUnloading = false;

  window.addEventListener('beforeunload', () => {
    isUnloading = true;
    setTimeout(() => {
      if (isUnloading) {
        localStorage.removeItem(STORAGE_KEYS.VISITED_IDS);
        localStorage.removeItem(STORAGE_KEYS.HAS_INTERACTED);
      }
    }, 0);
  });

  // 새로고침 감지
  window.addEventListener('load', () => {
    isUnloading = false;
  });
}

export const useAudioStore = create<AudioStore>((set, get) => ({
  activeAudios: new Map(),
  activeArtists: [],
  hasInteracted: JSON.parse(localStorage.getItem(STORAGE_KEYS.HAS_INTERACTED) || 'false'),
  audioConfigs: [
    { 
      id: '1',
      artistId: 1,
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

  initializeAudio: () => {
    try {
      // localStorage에서 방문한 ID들을 가져옴
      const visitedIds = JSON.parse(localStorage.getItem(STORAGE_KEYS.VISITED_IDS) || '[]') as string[];
      const savedHasInteracted = JSON.parse(localStorage.getItem(STORAGE_KEYS.HAS_INTERACTED) || 'false');

      // 기존 오디오 정리
      const { activeAudios } = get();
      activeAudios.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });

      if (visitedIds.length > 0) {
        const audios = new Map<string, HTMLAudioElement>();
        const artists: Artist[] = [];

        visitedIds.forEach((id: string) => {
          const config = get().audioConfigs.find(cfg => cfg.id === id);
          if (config) {
            const audio = new Audio(config.src);
            audio.loop = true;
            audios.set(id, audio);
            artists.push({
              name: config.artistName,
              audioId: id
            });
          }
        });

        set({
          activeArtists: artists,
          activeAudios: audios,
          hasInteracted: savedHasInteracted
        });

        // 이미 상호작용했다면 모든 오디오 재생
        if (savedHasInteracted) {
          audios.forEach(audio => {
            audio.play().catch(error => {
              console.warn('Audio playback failed:', error);
            });
          });
        }

        console.log('\n=== 현재 오디오 상태 ===');
        console.log('저장된 ID들:', visitedIds);
        console.log('재생 중인 작가들:', artists.map(a => a.name).join(' + '));
        console.log('========================\n');
      }
    } catch (error) {
      console.error('초기화 중 오류 발생:', error);
    }
  },

  playAudioById: (id: string) => {
    try {
      const { audioConfigs, activeAudios, activeArtists, hasInteracted } = get();
      const config = audioConfigs.find(cfg => cfg.id === id);
      
      if (!config) return;

      // localStorage에서 방문 기록 가져오기
      const visitedIds = JSON.parse(localStorage.getItem(STORAGE_KEYS.VISITED_IDS) || '[]') as string[];
      
      // 새로운 ID 추가
      if (!visitedIds.includes(id)) {
        // localStorage 업데이트
        const updatedVisitedIds = [...visitedIds, id];
        localStorage.setItem(STORAGE_KEYS.VISITED_IDS, JSON.stringify(updatedVisitedIds));
        
        // 새 오디오 생성 및 추가
        const audio = new Audio(config.src);
        audio.loop = true;

        // 새 작가 정보 추가
        const newArtist = {
          name: config.artistName,
          audioId: id
        };

        // 기존 오디오와 작가 정보 유지하면서 새로운 것 추가
        const newActiveAudios = new Map(activeAudios);
        newActiveAudios.set(id, audio);
        
        set({
          activeAudios: newActiveAudios,
          activeArtists: [...activeArtists, newArtist]
        });

        // 이미 상호작용했다면 새 오디오 재생
        if (hasInteracted) {
          audio.play().catch(error => {
            console.warn('Audio playback failed:', error);
          });
        }

        console.log('\n=== 현재 오디오 상태 ===');
        console.log('저장된 ID들:', updatedVisitedIds);
        console.log('재생 중인 작가들:', [...activeArtists, newArtist].map(a => a.name).join(' + '));
        console.log('========================\n');
      }
    } catch (error) {
      console.error('오디오 재생 중 오류 발생:', error);
    }
  },

  setHasInteracted: () => {
    try {
      set({ hasInteracted: true });
      localStorage.setItem(STORAGE_KEYS.HAS_INTERACTED, 'true');
      
      // 모든 저장된 오디오 재생
      const { activeAudios } = get();
      activeAudios.forEach(audio => {
        audio.play().catch(error => {
          console.warn('Audio playback failed:', error);
        });
      });
    } catch (error) {
      console.error('상호작용 설정 중 오류 발생:', error);
    }
  }
})); 