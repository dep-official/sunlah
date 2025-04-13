export interface Work {
  slug: string;
  title: string;
  src: string;
  year?: number;
  medium?: string;
  dimensions?: string;
  category?: '7-billion-project' | 'and-more';
} 