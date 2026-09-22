import { ChangeDetectionStrategy, Component, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from './services/portfolio';
import { HeaderComponent } from './components/header/header';
import { MediaGridComponent } from './components/media-grid/media-grid';
import { PhotoFullscreenComponent } from './components/photo-fullscreen/photo-fullscreen';
import { AddModalComponent } from './components/add-modal/add-modal';
import { AboutDrawerComponent } from './components/about-drawer/about-drawer';
import { BioSectionComponent } from './components/bio-section/bio-section';
import { FooterComponent } from './components/footer/footer';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    MediaGridComponent,
    BioSectionComponent,
    PhotoFullscreenComponent,
    AddModalComponent,
    AboutDrawerComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  host: {
    '[class.dark]': 'portfolioService.isDarkMode()'
  }
})
export class App {
  portfolioService = inject(PortfolioService);

  constructor() {
    effect(() => {
      const isDark = this.portfolioService.isDarkMode();
      if (typeof document !== 'undefined') {
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    });
  }
}
