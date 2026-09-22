import { Injectable, signal, computed } from '@angular/core';
import { PortfolioItem, MediaCategory, ContactMessage } from '../models/portfolio.model';

const STORAGE_KEY = 'minimalist_portfolio_items_v7';
const CONTACT_STORAGE_KEY = 'minimalist_portfolio_contacts_v1';

const INITIAL_ITEMS: PortfolioItem[] = [
  // 4 Main Cinematography Videos
  {
    id: 'ancorar',
    title: 'Ancorar',
    category: 'video',
    description: 'Obra audiovisual e cinematográfica realizada por Alexandre Vieira.',
    url: 'https://www.youtube.com/watch?v=-U6N08nG0mE',
    thumbnailUrl: 'https://img.youtube.com/vi/-U6N08nG0mE/hqdefault.jpg',
    youtubeId: '-U6N08nG0mE',
    aspectRatio: 'landscape',
    year: '2024',
    client: 'Alexandre Vieira',
    tags: ['Vídeo', 'Cinematografia', 'Curta-metragem'],
    featured: true,
    details: {
      camera: 'Cinema 4K',
      lens: 'Anamorphic 35mm',
      resolution: '4K Ultra HD',
      duration: 'Curta-metragem',
      location: 'Portugal'
    },
    createdAt: 1735000000000
  },
  {
    id: 'doze-dias-de-natal',
    title: 'Os Doze Dias de Natal',
    category: 'video',
    description: 'Produção narrativa audiovisual realizada por Alexandre Vieira.',
    url: 'https://www.youtube.com/watch?v=U-d6wV1gW2A',
    thumbnailUrl: 'https://img.youtube.com/vi/U-d6wV1gW2A/hqdefault.jpg',
    youtubeId: 'U-d6wV1gW2A',
    aspectRatio: 'landscape',
    year: '2024',
    client: 'Alexandre Vieira',
    tags: ['Vídeo', 'Curta-metragem', 'Narrativa'],
    featured: true,
    details: {
      camera: 'Cinema 4K',
      lens: 'Prime 50mm',
      resolution: '4K Ultra HD',
      duration: 'Narrativa Cinematográfica',
      location: 'Portugal'
    },
    createdAt: 1735000001000
  },
  {
    id: 'sombra',
    title: 'Sombra',
    category: 'video',
    description: 'Ensaio visual e cinematográfico explorando luz, silhuetas e contraste por Alexandre Vieira.',
    url: 'https://www.youtube.com/watch?v=bZfUaYDWYio',
    thumbnailUrl: 'https://img.youtube.com/vi/bZfUaYDWYio/hqdefault.jpg',
    youtubeId: 'bZfUaYDWYio',
    aspectRatio: 'landscape',
    year: '2024',
    client: 'Alexandre Vieira',
    tags: ['Cinematografia', 'Sombra', 'Luz Natural'],
    featured: true,
    details: {
      camera: 'Cinema 4K',
      lens: 'Anamorphic 50mm',
      resolution: '4K Ultra HD',
      duration: 'Ensaio Visual',
      location: 'Portugal'
    },
    createdAt: 1735000002000
  },
  {
    id: 'reencontro',
    title: 'Reencontro',
    category: 'video',
    description: 'Obra cinematográfica e narrativa realizada por Alexandre Vieira.',
    url: 'https://www.youtube.com/watch?v=GQfRQLMDrdg',
    thumbnailUrl: 'https://img.youtube.com/vi/GQfRQLMDrdg/hqdefault.jpg',
    youtubeId: 'GQfRQLMDrdg',
    aspectRatio: 'landscape',
    year: '2024',
    client: 'Alexandre Vieira',
    tags: ['Vídeo', 'Cinematografia', 'Narrativa'],
    featured: true,
    details: {
      camera: 'Cinema 4K',
      lens: '35mm / 85mm',
      resolution: '4K Ultra HD',
      duration: 'Curta-metragem',
      location: 'Portugal'
    },
    createdAt: 1735000003000
  },

  // Animations & Motion Graphics
  {
    id: 'anim-dark-horse',
    title: 'Dark Horse',
    category: 'animation',
    description: 'Animação e Motion Graphics por Alexandre Vieira.',
    url: 'https://www.youtube.com/watch?v=DxMgJex0coo',
    thumbnailUrl: 'https://img.youtube.com/vi/DxMgJex0coo/hqdefault.jpg',
    youtubeId: 'DxMgJex0coo',
    aspectRatio: 'landscape',
    year: '2024',
    client: 'Alexandre Vieira',
    tags: ['Animação', 'Motion Graphics', '2D/3D'],
    featured: true,
    details: {
      software: 'After Effects / Premiere',
      resolution: '1080p Full HD',
      fps: '24fps',
      location: 'Portugal'
    },
    createdAt: 1735000003500
  },
  {
    id: 'anim-slow-moves',
    title: 'José González - Slow Moves',
    category: 'animation',
    description: 'Motion Graphic Video por Alexandre Vieira.',
    url: 'https://www.youtube.com/watch?v=9Rhu36StLiE',
    thumbnailUrl: 'https://img.youtube.com/vi/9Rhu36StLiE/hqdefault.jpg',
    youtubeId: '9Rhu36StLiE',
    aspectRatio: 'landscape',
    year: '2024',
    client: 'Alexandre Vieira',
    tags: ['Animação', 'Motion Graphics', 'Música'],
    featured: true,
    details: {
      software: 'After Effects / Illustrator',
      resolution: '1080p Full HD',
      fps: '24fps',
      location: 'Portugal'
    },
    createdAt: 1735000003600
  },

  // Spotify Album / Single Cover Designs
  {
    id: 'design-unfelling',
    title: 'Unfelling',
    category: 'design',
    description: 'Capa de álbum / single design para Spotify por Alexandre Vieira.',
    url: '/covers/cover-unfelling.jpg',
    thumbnailUrl: '/covers/cover-unfelling.jpg',
    spotifyUrl: 'https://open.spotify.com/track/2a7dyfTWBRZZrgakpwOcrZ',
    spotifyEmbedUrl: 'https://open.spotify.com/embed/track/2a7dyfTWBRZZrgakpwOcrZ?utm_source=generator&theme=0',
    aspectRatio: 'square',
    year: '2024',
    client: 'Spotify / Artista',
    tags: ['Design de Capa', 'Spotify', 'Artwork'],
    featured: true,
    details: {
      software: 'Photoshop / Illustrator',
      resolution: '3000x3000px',
      location: 'Portugal'
    },
    createdAt: 1735000003700
  },
  {
    id: 'design-dark-horse',
    title: 'Dark Horse',
    category: 'design',
    description: 'Capa de álbum / single design para Spotify por Alexandre Vieira.',
    url: '/covers/cover-dark-horse.jpg',
    thumbnailUrl: '/covers/cover-dark-horse.jpg',
    spotifyUrl: 'https://open.spotify.com/track/7pOwFrgTqFMpOFZ72b1WlB',
    spotifyEmbedUrl: 'https://open.spotify.com/embed/track/7pOwFrgTqFMpOFZ72b1WlB?utm_source=generator&theme=0',
    aspectRatio: 'square',
    year: '2024',
    client: 'Spotify / Artista',
    tags: ['Design de Capa', 'Spotify', 'Artwork'],
    featured: true,
    details: {
      software: 'Photoshop / Illustrator',
      resolution: '3000x3000px',
      location: 'Portugal'
    },
    createdAt: 1735000003800
  },
  {
    id: 'design-move-your-hipes',
    title: 'Move your hipes',
    category: 'design',
    description: 'Capa de álbum / single design para Spotify por Alexandre Vieira.',
    url: '/covers/cover-move-your-hipes.jpg',
    thumbnailUrl: '/covers/cover-move-your-hipes.jpg',
    spotifyUrl: 'https://open.spotify.com/track/2lR1cKDUOztbHEm7pw6o8i',
    spotifyEmbedUrl: 'https://open.spotify.com/embed/track/2lR1cKDUOztbHEm7pw6o8i?utm_source=generator&theme=0',
    aspectRatio: 'square',
    year: '2024',
    client: 'Spotify / Artista',
    tags: ['Design de Capa', 'Spotify', 'Artwork'],
    featured: true,
    details: {
      software: 'Photoshop / Illustrator',
      resolution: '3000x3000px',
      location: 'Portugal'
    },
    createdAt: 1735000003900
  },

  // Photography Series from Google Drive
  {
    id: 'photo-drive-1',
    title: 'Fotografia I',
    category: 'photo',
    description: 'Ensaio fotográfico por Alexandre Vieira.',
    url: '/photos/photo-1.jpg',
    thumbnailUrl: '/photos/photo-1.jpg',
    aspectRatio: 'landscape',
    year: '2025',
    client: 'Alexandre Vieira',
    tags: ['Fotografia', 'Luz Natural'],
    featured: true,
    details: {
      camera: 'Sony / Leica',
      resolution: 'Alta Resolução',
      location: 'Portugal'
    },
    createdAt: 1735000004000
  },
  {
    id: 'photo-drive-2',
    title: 'Fotografia II',
    category: 'photo',
    description: 'Ensaio fotográfico por Alexandre Vieira.',
    url: '/photos/photo-2.jpg',
    thumbnailUrl: '/photos/photo-2.jpg',
    aspectRatio: 'landscape',
    year: '2025',
    client: 'Alexandre Vieira',
    tags: ['Fotografia', 'Composição'],
    featured: true,
    details: {
      camera: 'Sony / Leica',
      resolution: 'Alta Resolução',
      location: 'Portugal'
    },
    createdAt: 1735000005000
  },
  {
    id: 'photo-drive-3',
    title: 'Fotografia III',
    category: 'photo',
    description: 'Ensaio fotográfico por Alexandre Vieira.',
    url: '/photos/photo-3.jpg',
    thumbnailUrl: '/photos/photo-3.jpg',
    aspectRatio: 'landscape',
    year: '2025',
    client: 'Alexandre Vieira',
    tags: ['Fotografia', 'Retrato'],
    featured: true,
    details: {
      camera: 'Sony / Leica',
      resolution: 'Alta Resolução',
      location: 'Portugal'
    },
    createdAt: 1735000006000
  },
  {
    id: 'photo-drive-5',
    title: 'Fotografia IV',
    category: 'photo',
    description: 'Ensaio fotográfico por Alexandre Vieira.',
    url: '/photos/photo-5.jpg',
    thumbnailUrl: '/photos/photo-5.jpg',
    aspectRatio: 'landscape',
    year: '2025',
    client: 'Alexandre Vieira',
    tags: ['Fotografia', 'Texturas'],
    details: {
      camera: 'Sony / Leica',
      resolution: 'Alta Resolução',
      location: 'Portugal'
    },
    createdAt: 1735000008000
  },
  {
    id: 'photo-drive-6',
    title: 'Fotografia V',
    category: 'photo',
    description: 'Ensaio fotográfico por Alexandre Vieira.',
    url: '/photos/photo-6.jpg',
    thumbnailUrl: '/photos/photo-6.jpg',
    aspectRatio: 'landscape',
    year: '2025',
    client: 'Alexandre Vieira',
    tags: ['Fotografia', 'Cores'],
    details: {
      camera: 'Sony / Leica',
      resolution: 'Alta Resolução',
      location: 'Portugal'
    },
    createdAt: 1735000009000
  },
  {
    id: 'photo-drive-7',
    title: 'Fotografia VI',
    category: 'photo',
    description: 'Ensaio fotográfico por Alexandre Vieira.',
    url: '/photos/photo-7.jpg',
    thumbnailUrl: '/photos/photo-7.jpg',
    aspectRatio: 'landscape',
    year: '2025',
    client: 'Alexandre Vieira',
    tags: ['Fotografia', 'P&B'],
    details: {
      camera: 'Sony / Leica',
      resolution: 'Alta Resolução',
      location: 'Portugal'
    },
    createdAt: 1735000010000
  }
];

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  readonly items = signal<PortfolioItem[]>(this.loadItems());
  readonly selectedCategory = signal<MediaCategory>('all');
  readonly searchQuery = signal<string>('');
  readonly activeTag = signal<string | null>(null);
  readonly selectedItem = signal<PortfolioItem | null>(null);
  readonly selectedPhoto = signal<PortfolioItem | null>(null);
  readonly isAddModalOpen = signal<boolean>(false);
  readonly isAboutOpen = signal<boolean>(false);
  readonly isDarkMode = signal<boolean>(this.loadTheme());

  readonly filteredItems = computed(() => {
    let list = this.items();
    const cat = this.selectedCategory();
    const query = this.searchQuery().toLowerCase().trim();
    const tag = this.activeTag();

    if (cat !== 'all') {
      list = list.filter(item => item.category === cat);
    }

    if (tag) {
      list = list.filter(item => item.tags.includes(tag));
    }

    if (query) {
      list = list.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.tags.some(t => t.toLowerCase().includes(query)) ||
        (item.client && item.client.toLowerCase().includes(query)) ||
        item.year.includes(query)
      );
    }

    return list;
  });

  readonly allTags = computed(() => {
    const set = new Set<string>();
    this.items().forEach(item => {
      item.tags.forEach(t => set.add(t));
    });
    return Array.from(set).sort();
  });

  readonly counts = computed(() => {
    const all = this.items();
    return {
      all: all.length,
      video: all.filter(i => i.category === 'video').length,
      animation: all.filter(i => i.category === 'animation').length,
      design: all.filter(i => i.category === 'design').length,
      photo: all.filter(i => i.category === 'photo').length
    };
  });

  private loadItems(): PortfolioItem[] {
    if (typeof window === 'undefined') return INITIAL_ITEMS;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const initialMap = new Map(INITIAL_ITEMS.map(item => [item.id, item]));
          const customItems: PortfolioItem[] = [];
          for (const item of parsed) {
            if (!initialMap.has(item.id)) {
              customItems.push(item);
            }
          }
          return [...INITIAL_ITEMS, ...customItems];
        }
      }
    } catch {
      // ignore
    }
    return INITIAL_ITEMS;
  }

  reloadWorks(): void {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
    }
    this.items.set(INITIAL_ITEMS);
    this.selectedCategory.set('all');
    this.searchQuery.set('');
    this.activeTag.set(null);
  }

  private saveItems(items: PortfolioItem[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save portfolio items', e);
    }
  }

  private loadTheme(): boolean {
    if (typeof window === 'undefined') return false;
    try {
      const stored = localStorage.getItem('portfolio_theme');
      if (stored !== null) return stored === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  }

  toggleTheme(): void {
    const next = !this.isDarkMode();
    this.isDarkMode.set(next);
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_theme', next ? 'dark' : 'light');
    }
  }

  setCategory(category: MediaCategory): void {
    this.selectedCategory.set(category);
    this.activeTag.set(null);
  }

  setSearchQuery(q: string): void {
    this.searchQuery.set(q);
  }

  setTagFilter(tag: string | null): void {
    if (this.activeTag() === tag) {
      this.activeTag.set(null);
    } else {
      this.activeTag.set(tag);
    }
  }

  openLightbox(item: PortfolioItem): void {
    this.selectedItem.set(item);
  }

  closeLightbox(): void {
    this.selectedItem.set(null);
  }

  openPhoto(photo: PortfolioItem): void {
    this.selectedPhoto.set(photo);
  }

  closePhoto(): void {
    this.selectedPhoto.set(null);
  }

  nextPhoto(): void {
    const current = this.selectedPhoto();
    if (!current) return;
    const list = this.items().filter(i => i.category === current.category);
    const index = list.findIndex(i => i.id === current.id);
    if (index !== -1 && index < list.length - 1) {
      this.selectedPhoto.set(list[index + 1]);
    } else if (list.length > 0) {
      this.selectedPhoto.set(list[0]);
    }
  }

  prevPhoto(): void {
    const current = this.selectedPhoto();
    if (!current) return;
    const list = this.items().filter(i => i.category === current.category);
    const index = list.findIndex(i => i.id === current.id);
    if (index > 0) {
      this.selectedPhoto.set(list[index - 1]);
    } else if (list.length > 0) {
      this.selectedPhoto.set(list[list.length - 1]);
    }
  }

  nextItem(): void {
    const current = this.selectedItem();
    if (!current) return;
    const list = this.filteredItems();
    const index = list.findIndex(i => i.id === current.id);
    if (index !== -1 && index < list.length - 1) {
      this.selectedItem.set(list[index + 1]);
    } else if (list.length > 0) {
      this.selectedItem.set(list[0]);
    }
  }

  prevItem(): void {
    const current = this.selectedItem();
    if (!current) return;
    const list = this.filteredItems();
    const index = list.findIndex(i => i.id === current.id);
    if (index > 0) {
      this.selectedItem.set(list[index - 1]);
    } else if (list.length > 0) {
      this.selectedItem.set(list[list.length - 1]);
    }
  }

  addItem(newItem: Omit<PortfolioItem, 'id' | 'createdAt'>): void {
    const item: PortfolioItem = {
      ...newItem,
      id: 'item-' + Date.now(),
      createdAt: Date.now()
    };
    const updated = [item, ...this.items()];
    this.items.set(updated);
    this.saveItems(updated);
    this.isAddModalOpen.set(false);
  }

  deleteItem(id: string): void {
    const updated = this.items().filter(i => i.id !== id);
    this.items.set(updated);
    this.saveItems(updated);
    if (this.selectedItem()?.id === id) {
      this.closeLightbox();
    }
  }

  resetToDefault(): void {
    this.items.set(INITIAL_ITEMS);
    this.saveItems(INITIAL_ITEMS);
  }

  saveContact(message: Omit<ContactMessage, 'id' | 'date'>): ContactMessage {
    const contact: ContactMessage = {
      ...message,
      id: 'contact-' + Date.now(),
      date: new Date().toLocaleDateString('pt-PT')
    };
    if (typeof window !== 'undefined') {
      try {
        const existing = JSON.parse(localStorage.getItem(CONTACT_STORAGE_KEY) || '[]');
        localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify([contact, ...existing]));
      } catch {
        // ignore
      }
    }
    return contact;
  }
}
