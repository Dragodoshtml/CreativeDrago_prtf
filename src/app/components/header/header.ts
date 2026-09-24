import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { PortfolioService } from '../../services/portfolio';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="relative h-screen min-h-screen flex flex-col justify-between pt-6 pb-8 px-4 sm:px-6 lg:px-8 text-[#fff8f0] overflow-hidden bg-neutral-950">
      <!-- Hero Background Video GIF -->
      <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img 
          src="https://lh3.googleusercontent.com/d/1cUegl7xaEfL72CILW4VmpFyLxfFxx9rZ" 
          alt="Background GIF" 
          class="w-full h-full object-cover"
          referrerpolicy="no-referrer"
        />
        <!-- Subtle gradient overlay -->
        <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-neutral-950"></div>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto w-full flex flex-col justify-between flex-1">
        <!-- Centered Navigation Bar -->
        <div class="flex justify-center items-center w-full">
          <!-- Main Navigation Links -->
          <nav class="flex items-center justify-center gap-8 sm:gap-14 text-[11px] sm:text-xs uppercase tracking-[0.2em] font-medium text-[#fff8f0]/80 drop-shadow-sm">
            <button (click)="scrollToSection('work')" class="hover:text-[#77fe3f] transition-colors cursor-pointer focus:outline-none">MY WORK</button>
            <button (click)="scrollToSection('about')" class="hover:text-[#77fe3f] transition-colors cursor-pointer focus:outline-none">ABOUT ME</button>
          </nav>
        </div>

        <!-- Centered Logo / Animated Loop -->
        <div class="my-auto py-12 flex flex-col items-center justify-center text-center">
          <div class="relative max-w-md sm:max-w-lg w-full flex items-center justify-center">
            <video
              src="/video/logo.webm"
              autoplay
              loop
              muted
              playsinline
              aria-label="Alexandre Vieira"
                class="max-h-[350px] sm:max-h-[450px] w-auto object-contain select-none pointer-events-none drop-shadow-2xl"
                (error)="onLogoError($event)"
            ></video>
          </div>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {
  portfolioService = inject(PortfolioService);

  openAbout(): void {
    this.portfolioService.isAboutOpen.set(true);
  }

  scrollToSection(id: string): void {
    if (typeof document !== 'undefined') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  scrollToWork(): void {
    this.scrollToSection('work');
  }

  onLogoError(event: Event): void {
    const img = event.target as HTMLImageElement;
    console.error('Falha ao carregar logo:', img.src);
  }
}

