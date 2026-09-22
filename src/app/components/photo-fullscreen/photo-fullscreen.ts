import { Component, ChangeDetectionStrategy, inject, HostListener, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PortfolioService } from '../../services/portfolio';

@Component({
  selector: 'app-photo-fullscreen',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (photo(); as item) {
      <div 
        tabindex="0"
        role="dialog"
        aria-label="Visualizador de Fotografia em Ecrã Completo"
        class="fixed inset-0 z-50 bg-black/98 backdrop-blur-md flex flex-col items-center justify-between transition-all duration-300 select-none animate-in fade-in duration-200 focus:outline-none"
        (click)="onBackdropClick($event)"
        (keydown.escape)="portfolioService.closePhoto()"
      >
        <!-- Top Toolbar -->
        <header class="w-full flex items-center justify-between px-4 sm:px-8 py-4 z-20 text-white/80">
          <!-- Counter -->
          <div class="flex items-center gap-2 text-xs font-mono tracking-widest text-neutral-400">
            <span class="text-[#77fe3f] font-bold">0{{ currentIndex() + 1 }}</span>
            <span>/</span>
            <span>0{{ totalPhotos() }}</span>
          </div>

          <!-- Action Controls -->
          <div class="flex items-center gap-3">
            @if (item.spotifyUrl) {
              <a 
                [href]="item.spotifyUrl" 
                target="_blank" 
                rel="noopener noreferrer"
                class="px-3.5 py-1.5 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-semibold text-xs tracking-wider flex items-center gap-1.5 shadow-lg transition-transform hover:scale-105"
                title="Ouvir no Spotify"
              >
                <mat-icon class="!w-4 !h-4 text-base">music_note</mat-icon>
                <span>SPOTIFY</span>
              </a>
            }

            <!-- Zoom Toggle -->
            <button 
              (click)="toggleZoom($event)"
              class="p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-white/90 hover:text-white transition-all backdrop-blur-sm focus:outline-none"
              [title]="isZoomed() ? 'Ajustar ao ecrã' : 'Zoom 100%'"
              aria-label="Alternar zoom"
            >
              <mat-icon class="!w-5 !h-5 text-xl">{{ isZoomed() ? 'zoom_out' : 'zoom_in' }}</mat-icon>
            </button>

            <!-- Fullscreen API Toggle -->
            <button 
              (click)="toggleNativeFullscreen($event)"
              class="p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-white/90 hover:text-white transition-all backdrop-blur-sm focus:outline-none hidden sm:flex"
              title="Ecrã Completo (F)"
              aria-label="Ecrã completo"
            >
              <mat-icon class="!w-5 !h-5 text-xl">{{ isNativeFullscreen() ? 'fullscreen_exit' : 'fullscreen' }}</mat-icon>
            </button>

            <!-- Close Button -->
            <button 
              (click)="portfolioService.closePhoto()"
              class="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white hover:text-[#77fe3f] transition-all backdrop-blur-sm focus:outline-none"
              title="Fechar (Esc)"
              aria-label="Fechar visualizador"
            >
              <mat-icon class="!w-5 !h-5 text-xl">close</mat-icon>
            </button>
          </div>
        </header>

        <!-- Center Image Display -->
        <main class="relative flex-1 w-full flex items-center justify-center p-2 sm:p-6 overflow-hidden">
          <!-- Previous Arrow -->
          <button 
            (click)="prev($event)"
            class="absolute left-3 sm:left-6 z-20 p-3 rounded-full bg-black/40 hover:bg-black/80 text-white/70 hover:text-white hover:scale-110 transition-all backdrop-blur-md focus:outline-none border border-white/5"
            title="Anterior (←)"
            aria-label="Foto anterior"
          >
            <mat-icon class="!w-6 !h-6 text-2xl">chevron_left</mat-icon>
          </button>

          <!-- Main High-Res Image -->
          <div 
            tabindex="0"
            role="button"
            [attr.aria-label]="isZoomed() ? 'Reduzir foto' : 'Ampliar foto'"
            class="relative flex items-center justify-center max-w-full max-h-full transition-transform duration-300 ease-out focus:outline-none"
            [class.cursor-zoom-out]="isZoomed()"
            [class.cursor-zoom-in]="!isZoomed()"
            (click)="toggleZoom($event)"
            (keydown.enter)="toggleZoom($event)"
            (keydown.space)="toggleZoom($event)"
          >
            <img 
              [src]="item.url" 
              [alt]="item.title"
              referrerpolicy="no-referrer"
              class="max-w-full max-h-[85vh] object-contain rounded-sm transition-all duration-300 shadow-2xl"
              [class.scale-125]="isZoomed()"
              [class.scale-100]="!isZoomed()"
            />
          </div>

          <!-- Next Arrow -->
          <button 
            (click)="next($event)"
            class="absolute right-3 sm:right-6 z-20 p-3 rounded-full bg-black/40 hover:bg-black/80 text-white/70 hover:text-white hover:scale-110 transition-all backdrop-blur-md focus:outline-none border border-white/5"
            title="Próxima (→)"
            aria-label="Próxima foto"
          >
            <mat-icon class="!w-6 !h-6 text-2xl">chevron_right</mat-icon>
          </button>
        </main>

        <!-- Bottom subtle caption / metadata -->
        <footer class="w-full px-6 py-3 flex items-center justify-between text-neutral-500 text-[11px] font-mono z-20">
          <span>{{ item.title }} • {{ item.category === 'design' ? 'Design de Capa' : 'Fotografia' }} • Alexandre Vieira</span>
          <span class="hidden sm:inline">Use as setas ← → para navegar ou Esc para sair</span>
        </footer>
      </div>
    }
  `
})
export class PhotoFullscreenComponent {
  portfolioService = inject(PortfolioService);

  photo = computed(() => this.portfolioService.selectedPhoto());
  isZoomed = signal<boolean>(false);
  isNativeFullscreen = signal<boolean>(false);

  photoList = computed(() => {
    const current = this.photo();
    if (!current) return [];
    return this.portfolioService.items().filter(i => i.category === current.category);
  });

  currentIndex = computed(() => {
    const current = this.photo();
    if (!current) return 0;
    const index = this.photoList().findIndex(p => p.id === current.id);
    return index >= 0 ? index : 0;
  });

  totalPhotos = computed(() => this.photoList().length);

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).tagName === 'IMG' || (event.target as HTMLElement).closest('button')) {
      return;
    }
    this.portfolioService.closePhoto();
    this.isZoomed.set(false);
  }

  toggleZoom(event?: Event): void {
    if (event) event.stopPropagation();
    this.isZoomed.update(z => !z);
  }

  next(event?: MouseEvent): void {
    if (event) event.stopPropagation();
    this.isZoomed.set(false);
    this.portfolioService.nextPhoto();
  }

  prev(event?: MouseEvent): void {
    if (event) event.stopPropagation();
    this.isZoomed.set(false);
    this.portfolioService.prevPhoto();
  }

  toggleNativeFullscreen(event: MouseEvent): void {
    event.stopPropagation();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        this.isNativeFullscreen.set(true);
      }).catch(() => {
        // ignore
      });
    } else {
      document.exitFullscreen().then(() => {
        this.isNativeFullscreen.set(false);
      }).catch(() => {
        // ignore
      });
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (!this.photo()) return;

    if (event.key === 'Escape') {
      this.portfolioService.closePhoto();
      this.isZoomed.set(false);
    } else if (event.key === 'ArrowRight') {
      this.next();
    } else if (event.key === 'ArrowLeft') {
      this.prev();
    } else if (event.key === 'f' || event.key === 'F') {
      this.toggleNativeFullscreen(event as unknown as MouseEvent);
    }
  }
}
