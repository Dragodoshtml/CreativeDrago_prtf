import { Component, ChangeDetectionStrategy, input, inject, ElementRef, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PortfolioItem } from '../../models/portfolio.model';
import { PortfolioService } from '../../services/portfolio';

@Component({
  selector: 'app-media-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div 
      tabindex="0"
      role="button"
      [attr.aria-label]="item().title"
      (click)="portfolioService.openLightbox(item())"
      (keydown.enter)="portfolioService.openLightbox(item())"
      (keydown.space)="portfolioService.openLightbox(item())"
      (mouseenter)="onMouseEnter()"
      (mouseleave)="onMouseLeave()"
      class="group relative overflow-hidden rounded-xl bg-neutral-200 dark:bg-neutral-900 cursor-pointer border border-neutral-200/80 dark:border-neutral-800/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-neutral-400"
      [class.aspect-[4/5]]="item().aspectRatio === 'portrait'"
      [class.aspect-[16/10]]="item().aspectRatio === 'landscape'"
      [class.aspect-square]="item().aspectRatio === 'square'"
      [class.aspect-[21/9]]="item().aspectRatio === 'wide'"
    >
      <!-- Media Element -->
      @if (item().category === 'photo') {
        <img 
          [src]="item().url" 
          [alt]="item().title"
          loading="lazy"
          referrerpolicy="no-referrer"
          class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      } @else if (item().category === 'video' || item().category === 'animation') {
        <!-- Video or Animation Preview -->
        <video
          #videoPlayer
          [src]="item().url"
          [poster]="item().thumbnailUrl || ''"
          muted
          loop
          playsinline
          preload="metadata"
          class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        ></video>
      }

      <!-- Badge Overlay Top Left -->
      <div class="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-950/70 backdrop-blur-md text-[#fff8f0] text-[11px] font-medium tracking-wide">
        @if (item().category === 'photo') {
          <mat-icon class="!w-3.5 !h-3.5 text-xs text-[#77fe3f]">photo_camera</mat-icon>
          <span>Fotografia</span>
        } @else if (item().category === 'video') {
          <mat-icon class="!w-3.5 !h-3.5 text-xs text-sky-300">play_circle</mat-icon>
          <span>Vídeo</span>
        } @else {
          <mat-icon class="!w-3.5 !h-3.5 text-xs text-purple-300">auto_awesome</mat-icon>
          <span>Animação</span>
        }
      </div>

      <!-- Year Badge Top Right -->
      <div class="absolute top-3 right-3 z-10 px-2 py-0.5 rounded-full bg-neutral-950/50 backdrop-blur-md text-[#fff8f0]/80 text-[10px] font-mono">
        {{ item().year }}
      </div>

      <!-- Play Button Overlay for Video/Animation -->
      @if (item().category === 'video' || item().category === 'animation') {
        <div class="absolute inset-0 flex items-center justify-center z-10 opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div class="w-12 h-12 rounded-full bg-neutral-950/60 backdrop-blur-md border border-[#fff8f0]/20 flex items-center justify-center text-[#fff8f0] transform group-hover:scale-110 transition-transform">
            <mat-icon class="!w-6 !h-6 text-2xl ml-0.5">play_arrow</mat-icon>
          </div>
        </div>
      }

      <!-- Bottom Gradient Caption -->
      <div class="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-[#fff8f0] z-10">
        <h3 class="text-sm font-semibold tracking-tight font-serif text-[#fff8f0] leading-snug">
          {{ item().title }}
        </h3>
        
        <p class="text-xs text-neutral-300 line-clamp-1 mt-1 font-light">
          {{ item().description }}
        </p>

        <!-- Tags -->
        <div class="flex flex-wrap gap-1 mt-2.5">
          @for (tag of item().tags.slice(0, 3); track tag) {
            <span class="text-[10px] px-2 py-0.5 rounded bg-white/10 text-neutral-200 backdrop-blur-xs">
              #{{ tag }}
            </span>
          }
        </div>
      </div>
    </div>
  `
})
export class MediaCardComponent {
  item = input.required<PortfolioItem>();
  portfolioService = inject(PortfolioService);

  videoRef = viewChild<ElementRef<HTMLVideoElement>>('videoPlayer');

  onMouseEnter(): void {
    const video = this.videoRef()?.nativeElement;
    if (video) {
      video.play().then(() => {
        // Autoplay started
      }).catch((err: unknown) => {
        // Autoplay prevented by browser
        console.debug('Video autoplay prevented', err);
      });
    }
  }

  onMouseLeave(): void {
    const video = this.videoRef()?.nativeElement;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  }
}
