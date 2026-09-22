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
    <footer class="border-t border-[#fff8f0]/10 bg-neutral-950/80 backdrop-blur-md text-[#fff8f0]/70 transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-col sm:flex-row items-center justify-between text-xs text-[#fff8f0]/60 gap-4 font-mono">
          <p>© Alexandre Vieira. Todos os direitos reservados.</p>
          
          <button 
            (click)="scrollToTop()" 
            class="flex items-center gap-1 hover:text-[#77fe3f] transition-colors cursor-pointer"
          >
            <span>Voltar ao topo</span>
            <mat-icon class="!w-4 !h-4 text-sm">arrow_upward</mat-icon>
          </button>
        </div>
      </div>
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
