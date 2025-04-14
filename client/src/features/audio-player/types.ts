export interface AudioConfig {
  id: string;
  artistId: number;
  artistName: string;
  src: string;
  duration: number; // milliseconds, -1 for infinite
}

export interface QRParams {
  id: string;
  lang: 'kr' | 'en';
}

export interface Artist {
  name: string;
  audioId: string;
}

export interface AudioStore {
  activeAudios: Record<string, HTMLAudioElement>;
  activeArtists: Array<{
    name: string;
    audioId: string;
  }>;
  playedAudios: string[];
  hasInteracted: boolean;
  audioConfigs: AudioConfig[];
  currentAudio: string | null;
  isPlaying: boolean;
  initializeAudio: () => void;
  addNewAudio: (id: string) => Promise<void>;
  setHasInteracted: () => void;
  playAudio: (id: string) => void;
} 