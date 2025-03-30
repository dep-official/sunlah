export interface AudioConfig {
  id: string;
  artistId: number;
  artistName: string;
  src: string;
  duration: number;
}

export interface QRParams {
  id: string;
  lang: 'kr' | 'en';
} 