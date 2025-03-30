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
  isPlaying: (id: string) => boolean;
  setHasInteracted: () => void;  // 상호작용 상태 설정
}

export const useAudioStore = create<AudioStore>((set, get) => ({
  activeAudios: {},
  playedAudios: [],
  activeArtists: [],
  hasInteracted: false,
  audioConfigs: [
    { 
      id: '1',
      artistId: 1,
      artistName: 'Chris Succo',
      src: '/audio/01.mp3', 
      duration: 30000
    },
    { 
      id: '2',
      artistId: 2,
      artistName: 'Hana Lee',
      src: '/audio/02.mp3', 
      duration: -1 
    },
    { 
      id: '3',
      artistId: 3,
      artistName: 'Luke Hart',
      src: '/audio/03.mp3', 
      duration: 45000 
    },
    { 
      id: '4',
      artistId: 4,
      artistName: 'Sun Lah',
      src: '/audio/04.mp3', 
      duration: 20000
    },
    { 
      id: '5',
      artistId: 5,
      artistName: 'Claire Poulter',
      src: '/audio/05.mp3', 
      duration: -1 
    },
    { 
      id: '6',
      artistId: 6,
      artistName: 'Claire Poulter',
      src: '/audio/06.mp3', 
      duration: 500000 
    },
    { 
      id: '7',
      artistId: 7,
      artistName: 'Claire Poulter',
      src: '/audio/07.mp3', 
      duration: -1 
    },
  ],

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

  isPlaying: (id: string) => {
    return !!get().activeAudios[id];
  },

  setHasInteracted: () => {
    set({ hasInteracted: true });
  },
})); 