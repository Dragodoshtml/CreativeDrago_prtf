import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { PortfolioService } from '../../services/portfolio';

@Component({
  selector: 'app-about-drawer',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (portfolioService.isAboutOpen()) {
      <div 
        tabindex="0"
        role="dialog"
        aria-modal="true"
        aria-label="Sobre e Contacto"
        class="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in focus:outline-none"
        (click)="closeDrawer()"
        (keydown.escape)="closeDrawer()"
      >
        <div 
          tabindex="0"
          role="document"
          class="relative w-full max-w-lg h-full bg-neutral-50 dark:bg-neutral-950 border-l border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-y-auto flex flex-col justify-between p-6 sm:p-8 focus:outline-none"
          (click)="$event.stopPropagation()"
          (keydown)="$event.stopPropagation()"
        >
          <!-- Close Button -->
          <div class="flex items-center justify-between pb-6 border-b border-neutral-200 dark:border-neutral-800">
            <span class="text-xs uppercase tracking-widest text-neutral-400 font-semibold font-mono">
              Sobre & Contacto
            </span>
            <button 
              (click)="closeDrawer()"
              class="p-2 rounded-full text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-200/50 dark:hover:bg-neutral-800 transition-colors"
            >
              <mat-icon class="!w-5 !h-5 text-lg">close</mat-icon>
            </button>
          </div>

          <!-- Bio & Statement -->
          <div class="py-6 space-y-8">
            <div>
              <p class="text-sm text-neutral-600 dark:text-neutral-300 font-light leading-relaxed">
                Diretor visual, fotógrafo e artista 3D/2D sediado em Lisboa. A minha abordagem foca-se na essência minimalista, no equilíbrio geométrico da luz e na narrativa em movimento através de imagens fixas, vídeo cinematográfico e animações digitais.
              </p>
            </div>

            <!-- Areas of Expertise -->
            <div>
              <h3 class="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3 font-mono">
                Áreas de Atuação
              </h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div class="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800">
                  <span class="font-semibold block text-neutral-800 dark:text-neutral-200 mb-0.5">Fotografia Editorial</span>
                  <span class="text-neutral-500 text-[11px]">Arquitetura, Retrato, P&B</span>
                </div>
                <div class="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800">
                  <span class="font-semibold block text-neutral-800 dark:text-neutral-200 mb-0.5">Cinematografia</span>
                  <span class="text-neutral-500 text-[11px]">Direção de Fotografia, 4K Drone</span>
                </div>
                <div class="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800">
                  <span class="font-semibold block text-neutral-800 dark:text-neutral-200 mb-0.5">Animação 3D & 2D</span>
                  <span class="text-neutral-500 text-[11px]">Motion Design, Blender, AE</span>
                </div>
                <div class="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800">
                  <span class="font-semibold block text-neutral-800 dark:text-neutral-200 mb-0.5">Pós-Produção</span>
                  <span class="text-neutral-500 text-[11px]">Color Grading, Edição</span>
                </div>
              </div>
            </div>

            <!-- Contact Form -->
            <div class="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs">
              <h3 class="text-sm font-semibold text-neutral-900 dark:text-neutral-100 font-serif mb-1">
                Iniciar um Projeto
              </h3>
              <p class="text-xs text-neutral-500 mb-4">
                Envie uma mensagem direta para orçamentos ou colaborações.
              </p>

              @if (isSubmitted()) {
                <div class="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs">
                  <div class="flex items-center gap-2 font-medium mb-1">
                    <mat-icon class="!w-4 !h-4 text-sm">check_circle</mat-icon>
                    <span>Mensagem enviada com sucesso!</span>
                  </div>
                  <p class="text-[11px] opacity-80">
                    Obrigado pelo contacto. Responderei o mais brevemente possível.
                  </p>
                  <button 
                    (click)="isSubmitted.set(false)"
                    class="mt-3 text-[11px] underline font-medium text-emerald-700 dark:text-emerald-300"
                  >
                    Enviar outra mensagem
                  </button>
                </div>
              } @else {
                <form (ngSubmit)="sendMessage()" class="space-y-3 text-xs">
                  <div>
                    <label for="contact-name" class="block text-neutral-600 dark:text-neutral-400 mb-1 font-medium">Nome</label>
                    <input 
                      id="contact-name"
                      type="text" 
                      [(ngModel)]="name" 
                      name="name" 
                      required 
                      placeholder="Seu nome" 
                      class="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label for="contact-email" class="block text-neutral-600 dark:text-neutral-400 mb-1 font-medium">Email</label>
                    <input 
                      id="contact-email"
                      type="email" 
                      [(ngModel)]="email" 
                      name="email" 
                      required 
                      placeholder="email&#64;exemplo.com" 
                      class="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label for="contact-type" class="block text-neutral-600 dark:text-neutral-400 mb-1 font-medium">Tipo de Projeto</label>
                    <select 
                      id="contact-type"
                      [(ngModel)]="projectType" 
                      name="projectType" 
                      class="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none"
                    >
                      <option value="Fotografia">Fotografia</option>
                      <option value="Vídeo">Vídeo / Cinematografia</option>
                      <option value="Animação">Animação 3D / Motion</option>
                      <option value="Outro">Outro / Geral</option>
                    </select>
                  </div>

                  <div>
                    <label for="contact-msg" class="block text-neutral-600 dark:text-neutral-400 mb-1 font-medium font-medium">Mensagem</label>
                    <textarea 
                      id="contact-msg"
                      [(ngModel)]="message" 
                      name="message" 
                      required 
                      rows="3" 
                      placeholder="Descreva brevemente o seu projeto..." 
                      class="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    [disabled]="!name || !email || !message"
                    class="w-full py-2.5 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-medium rounded-lg hover:opacity-90 disabled:opacity-40 transition-opacity"
                  >
                    Enviar Mensagem
                  </button>
                </form>
              }
            </div>

            <!-- Social Links & Reset -->
            <div class="space-y-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <h3 class="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-mono">
                Redes & Canais
              </h3>

              <div class="flex flex-wrap gap-2 text-xs">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 rounded-full bg-neutral-200/60 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors">
                  Instagram
                </a>
                <a href="https://vimeo.com" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 rounded-full bg-neutral-200/60 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors">
                  Vimeo
                </a>
                <a href="https://behance.net" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 rounded-full bg-neutral-200/60 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors">
                  Behance
                </a>
                <a href="https://artstation.com" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 rounded-full bg-neutral-200/60 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors">
                  ArtStation
                </a>
              </div>

              <!-- Reset Data button for development / demo -->
              <div class="pt-6">
                <button 
                  (click)="portfolioService.resetToDefault()"
                  class="text-[11px] text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 underline"
                >
                  Restaurar trabalhos de exemplo iniciais
                </button>
              </div>
            </div>
          </div>

          <!-- Drawer Footer -->
          <div class="pt-6 border-t border-neutral-200 dark:border-neutral-800 text-[11px] text-neutral-400 font-mono flex items-center justify-between">
            <span>© 2026</span>
            <span>Lisboa, Portugal</span>
          </div>
        </div>
      </div>
    }
  `
})
export class AboutDrawerComponent {
  portfolioService = inject(PortfolioService);

  name = '';
  email = '';
  projectType = 'Fotografia';
  message = '';
  isSubmitted = signal(false);

  closeDrawer(): void {
    this.portfolioService.isAboutOpen.set(false);
  }

  sendMessage(): void {
    if (!this.name || !this.email || !this.message) return;

    this.portfolioService.saveContact({
      name: this.name,
      email: this.email,
      projectType: this.projectType,
      message: this.message
    });

    this.isSubmitted.set(true);
    this.name = '';
    this.email = '';
    this.message = '';
  }
}
