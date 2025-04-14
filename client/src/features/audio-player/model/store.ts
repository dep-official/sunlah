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
  CURRENT_TAB: 'currentTab'
};

if (typeof window !== 'undefined') {
  const existingTabId = sessionStorage.getItem(STORAGE_KEYS.CURRENT_TAB);
  
  if (!existingTabId) {
    const newTabId = Math.random().toString(36).substring(2, 9);
    sessionStorage.setItem(STORAGE_KEYS.CURRENT_TAB, newTabId);
    localStorage.setItem(STORAGE_KEYS.CURRENT_TAB, newTabId);
    console.log('New tab created:', newTabId);

    const currentTabId = sessionStorage.getItem(STORAGE_KEYS.CURRENT_TAB);
    const storedTabId = localStorage.getItem(STORAGE_KEYS.CURRENT_TAB);


    window.addEventListener('unload', ()=> {
      if(currentTabId == storedTabId) {
        console.log('Closing last active tab, clearing localStorage');
        Object.values(STORAGE_KEYS).forEach(key => {
          localStorage.removeItem(key);
        });
      } 
    })
  } else {
    console.log('Existing tab:', existingTabId);
  }
}

export const useAudioStore = create<AudioStore>((set, get) => ({
  activeAudios: {},
  activeArtists: [],
  playedAudios: [],
  hasInteracted: false,
  audioConfigs,
  currentAudio: null,
  isPlaying: false,

  playAudio: (id: string) => {
    set({ 
      isPlaying: true,
      currentAudio: id,
      playedAudios: [...get().playedAudios, id]
    });
  },

  setHasInteracted: () => {
    set({ hasInteracted: true });
    localStorage.setItem(STORAGE_KEYS.HAS_INTERACTED, 'true');

    const { activeAudios } = get();
    Object.values(activeAudios).forEach(async (audio) => {
      try {
        audio.muted = true;
        await audio.play();
        audio.muted = false;
      } catch (error) {
        console.error('Failed to play audio:', error);
      }
    });
  },

  initializeAudio: () => {
    try {
      const savedAudios = localStorage.getItem(STORAGE_KEYS.PLAYED_AUDIOS);
      const savedArtists = localStorage.getItem(STORAGE_KEYS.ACTIVE_ARTISTS);
      const savedHasInteracted = localStorage.getItem(STORAGE_KEYS.HAS_INTERACTED) === 'true';

      if (savedHasInteracted) {
        set({ hasInteracted: true });
      }

      if (savedAudios) {
        const savedIds = JSON.parse(savedAudios);
        set({ playedAudios: savedIds });

        if (savedArtists) {
          const artists = JSON.parse(savedArtists);
          set({ activeArtists: artists });
        }

        savedIds.forEach((id: string) => {
          const config = get().audioConfigs.find(cfg => cfg.id === id);
          if (config) {
            const audio = new Audio();
            audio.src = config.src;
            audio.loop = true;
            audio.preload = 'auto';

            set(state => ({
              activeAudios: { ...state.activeAudios, [id]: audio }
            }));

            if (get().hasInteracted) {
              audio.play().then(() => {
                audio.muted = false;
              }).catch(console.error);
            }
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

      const storedPlayedAudios = JSON.parse(localStorage.getItem(STORAGE_KEYS.PLAYED_AUDIOS) || '[]');
      const storedActiveArtists = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACTIVE_ARTISTS) || '[]');

      const updatedPlayedAudios = [...new Set([...storedPlayedAudios, ...playedAudios, id])];
      const updatedArtists = [...storedActiveArtists, artistInfo];

      set({
        activeAudios: { ...activeAudios, [id]: audio },
        activeArtists: updatedArtists,
        playedAudios: updatedPlayedAudios,
        currentAudio: id,
        isPlaying: true
      });

      localStorage.setItem(STORAGE_KEYS.ACTIVE_ARTISTS, JSON.stringify(updatedArtists));
      localStorage.setItem(STORAGE_KEYS.PLAYED_AUDIOS, JSON.stringify(updatedPlayedAudios));

      if (hasInteracted) {
        try {
          audio.muted = true;
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