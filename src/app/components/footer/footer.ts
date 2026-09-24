import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PortfolioService } from '../../services/portfolio';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="w-full bg-black py-10 flex items-center justify-center transition-colors duration-300">
      <button 
        (click)="scrollToTop()" 
        class="group flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#fff8f0]/60 hover:text-[#77fe3f] transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#77fe3f] px-4 py-2 rounded-full hover:bg-white/[0.04]"
        aria-label="Voltar ao topo"
      >
        <span>Voltar ao topo</span>
        <mat-icon class="!w-4 !h-4 text-sm transition-transform duration-300 group-hover:-translate-y-1">arrow_upward</mat-icon>
      </button>
    </footer>
  `
})
export class FooterComponent {
  portfolioService = inject(PortfolioService);

  scrollToTop(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
