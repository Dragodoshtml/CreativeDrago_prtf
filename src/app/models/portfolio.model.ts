export type MediaCategory = 'all' | 'video' | 'animation' | 'design' | 'photo';

export interface ItemDetails {
  camera?: string;
  lens?: string;
  iso?: string;
  shutter?: string;
  duration?: string;
  fps?: string;
  software?: string;
  resolution?: string;
  location?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'photo' | 'video' | 'animation' | 'design';
  description: string;
  url: string;
  thumbnailUrl?: string;
  youtubeId?: string;
  spotifyUrl?: string;
  spotifyEmbedUrl?: string;
  aspectRatio: 'square' | 'portrait' | 'landscape' | 'wide';
  year: string;
  client?: string;
  tags: string[];
  featured?: boolean;
  details?: ItemDetails;
  createdAt: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  projectType: string;
  message: string;
  date: string;
}
