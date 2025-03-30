export interface AudioConfig {
  id: string;
  src: string;
  duration: number; // milliseconds, -1 for infinite
  artistName: string;
  artistId: number;
}

export interface QRParams {
  id: string;
  lang: 'kr' | 'en';
} 