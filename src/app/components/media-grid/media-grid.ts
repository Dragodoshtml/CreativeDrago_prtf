import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PortfolioService } from '../../services/portfolio';
import { PortfolioItem } from '../../models/portfolio.model';

@Component({
  selector: 'app-media-grid',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="work" class="w-full bg-neutral-950 overflow-hidden flex flex-col gap-0">
      
      <!-- 1. Cinematography Videos (2x2 Grid) -->
      @if (videoItems().length > 0) {
        <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-0 bg-neutral-950">
          @for (item of videoItems(); track item.id) {
            <div class="relative w-full aspect-video bg-black overflow-hidden">
              @if (getYoutubeEmbedUrl(item); as ytUrl) {
                <iframe 
                  [src]="ytUrl" 
                  [title]="item.title"
                  class="w-full h-full border-0 block"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowfullscreen
                ></iframe>
              }
            </div>
          }
        </div>
      }

      <!-- 2. Animations & Motion Graphics (2-Column Grid) -->
      @if (animationItems().length > 0) {
        <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-0 bg-neutral-950">
          @for (item of animationItems(); track item.id) {
            <div class="relative w-full aspect-video bg-black overflow-hidden">
              @if (getYoutubeEmbedUrl(item); as ytUrl) {
                <iframe 
                  [src]="ytUrl" 
                  [title]="item.title"
                  class="w-full h-full border-0 block"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowfullscreen
                ></iframe>
              }
            </div>
          }
        </div>
      }

      <!-- 3. Spotify Album / Single Cover Designs (3-Column Grid) -->
      @if (designItems().length > 0) {
        <div class="w-full grid grid-cols-1 sm:grid-cols-3 gap-0 bg-neutral-950">
          @for (item of designItems(); track item.id) {
            <div 
              tabindex="0"
              role="button"
              [attr.aria-label]="item.title + ' - Ver design de capa'"
              (click)="portfolioService.openPhoto(item)"
              (keydown.enter)="portfolioService.openPhoto(item)"
              (keydown.space)="portfolioService.openPhoto(item)"
              class="relative overflow-hidden aspect-square w-full bg-neutral-900 group cursor-pointer focus:outline-none"
            >
              <img 
                [src]="item.url" 
                [alt]="item.title"
                loading="lazy"
                class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <!-- Subtle hover overlay with spotify and expand icon hints -->
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex flex-col items-center justify-center gap-3">
                <div class="flex items-center gap-3 opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300">
                  <div class="w-11 h-11 rounded-full bg-black/70 backdrop-blur-sm text-white flex items-center justify-center shadow-xl">
                    <mat-icon class="!w-5 !h-5 text-xl">fullscreen</mat-icon>
                  </div>
                  @if (item.spotifyUrl) {
                    <a 
                      [href]="item.spotifyUrl" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      (click)="$event.stopPropagation()"
                      class="px-4 py-2 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-semibold text-xs tracking-wider flex items-center gap-1.5 shadow-xl transition-transform hover:scale-105"
                      title="Ouvir no Spotify"
                    >
                      <mat-icon class="!w-4 !h-4 text-base">music_note</mat-icon>
                      <span>SPOTIFY</span>
                    </a>
                  }
                </div>
              </div>
            </div>
          }
        </div>
      }

      <!-- 4. Photography Series Grid (3-Column Grid) -->
      @if (photoItems().length > 0) {
        <div class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 bg-neutral-950">
          @for (item of photoItems(); track item.id) {
            <div 
              tabindex="0"
              role="button"
              [attr.aria-label]="'Ver foto em ecrã completo'"
              (click)="portfolioService.openPhoto(item)"
              (keydown.enter)="portfolioService.openPhoto(item)"
              (keydown.space)="portfolioService.openPhoto(item)"
              class="relative overflow-hidden aspect-[4/3] sm:aspect-square w-full bg-neutral-900 group cursor-pointer focus:outline-none"
            >
              <img 
                [src]="item.url" 
                [alt]="item.title"
                loading="lazy"
                class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <!-- Subtle hover overlay with expand icon hint -->
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300 flex items-center justify-center pointer-events-none">
                <div class="w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 shadow-xl">
                  <mat-icon class="!w-6 !h-6 text-xl">fullscreen</mat-icon>
                </div>
              </div>
            </div>
          }
        </div>
      }
    </section>
  `
})
export class MediaGridComponent {
  portfolioService = inject(PortfolioService);
  sanitizer = inject(DomSanitizer);

  videoItems = computed(() => 
    this.portfolioService.filteredItems().filter(i => i.category === 'video')
  );

  animationItems = computed(() => 
    this.portfolioService.filteredItems().filter(i => i.category === 'animation')
  );

  designItems = computed(() => 
    this.portfolioService.filteredItems().filter(i => i.category === 'design')
  );

  photoItems = computed(() => 
    this.portfolioService.filteredItems().filter(i => i.category === 'photo')
  );

  getYoutubeEmbedUrl(item: PortfolioItem): SafeResourceUrl | null {
    const id = item.youtubeId || this.extractYoutubeId(item.url);
    if (!id) return null;
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`
    );
  }

  private extractYoutubeId(url: string): string | null {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? match[1] : null;
  }
}


