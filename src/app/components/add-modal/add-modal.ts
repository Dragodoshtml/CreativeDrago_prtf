import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { PortfolioService } from '../../services/portfolio';
import { PortfolioItem } from '../../models/portfolio.model';

@Component({
  selector: 'app-add-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (portfolioService.isAddModalOpen()) {
      <div 
        tabindex="0"
        role="dialog"
        aria-modal="true"
        aria-label="Adicionar Novo Trabalho"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in focus:outline-none"
        (click)="closeModal()"
        (keydown.escape)="closeModal()"
      >
        <div 
          tabindex="0"
          role="document"
          class="relative w-full max-w-2xl max-h-[90vh] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col focus:outline-none"
          (click)="$event.stopPropagation()"
          (keydown)="$event.stopPropagation()"
        >
          <!-- Header -->
          <div class="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
            <div>
              <h2 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 font-serif">
                Adicionar Novo Trabalho
              </h2>
              <p class="text-xs text-neutral-500 dark:text-neutral-400">
                Adicione fotografia, vídeo ou animação ao seu portefólio
              </p>
            </div>
            <button 
              (click)="closeModal()"
              class="p-1.5 rounded-full text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <mat-icon class="!w-5 !h-5 text-lg">close</mat-icon>
            </button>
          </div>

          <!-- Form Body -->
          <form (ngSubmit)="submitForm()" class="p-6 overflow-y-auto space-y-4 text-xs">
            <!-- Category Selection -->
            <div>
              <span class="block font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                Categoria *
              </span>
              <div class="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  (click)="category.set('photo')"
                  class="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border text-xs font-medium transition-all"
                  [class]="category() === 'photo' 
                    ? 'border-neutral-900 dark:border-neutral-100 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900' 
                    : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800'"
                >
                  <mat-icon class="!w-4 !h-4 text-sm">photo_camera</mat-icon>
                  <span>Fotografia</span>
                </button>

                <button
                  type="button"
                  (click)="category.set('video')"
                  class="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border text-xs font-medium transition-all"
                  [class]="category() === 'video' 
                    ? 'border-neutral-900 dark:border-neutral-100 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900' 
                    : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800'"
                >
                  <mat-icon class="!w-4 !h-4 text-sm">videocam</mat-icon>
                  <span>Vídeo</span>
                </button>

                <button
                  type="button"
                  (click)="category.set('animation')"
                  class="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border text-xs font-medium transition-all"
                  [class]="category() === 'animation' 
                    ? 'border-neutral-900 dark:border-neutral-100 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900' 
                    : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800'"
                >
                  <mat-icon class="!w-4 !h-4 text-sm">auto_awesome</mat-icon>
                  <span>Animação</span>
                </button>
              </div>
            </div>

            <!-- Title & Client -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label for="work-title" class="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Título do Trabalho *
                </label>
                <input 
                  id="work-title"
                  type="text" 
                  [(ngModel)]="title" 
                  name="title" 
                  required
                  placeholder="Ex: Luz & Geometria" 
                  class="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400"
                />
              </div>

              <div>
                <label for="work-client" class="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Cliente / Projeto (opcional)
                </label>
                <input 
                  id="work-client"
                  type="text" 
                  [(ngModel)]="client" 
                  name="client" 
                  placeholder="Ex: Studio Lisboa" 
                  class="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400"
                />
              </div>
            </div>

            <!-- Media Upload / URL Input -->
            <div>
              <span class="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Ficheiro de Mídia / URL *
              </span>

              <!-- Upload File dropzone -->
              <div class="mb-2 p-4 border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl bg-neutral-50 dark:bg-neutral-900 text-center hover:border-neutral-400 transition-colors">
                <mat-icon class="!w-6 !h-6 text-2xl text-neutral-400 mb-1">cloud_upload</mat-icon>
                <p class="text-neutral-600 dark:text-neutral-300 font-medium">Carregar ficheiro do computador</p>
                <p class="text-[10px] text-neutral-400 mt-0.5">Suporta Imagens (JPG, PNG, GIF) ou Vídeos (MP4, WebM)</p>
                
                <input 
                  id="file-upload-input"
                  type="file" 
                  accept="image/*,video/*"
                  (change)="onFileSelected($event)" 
                  class="mt-2 text-[11px] block w-full mx-auto text-neutral-500 file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-neutral-200 dark:file:bg-neutral-800 file:text-neutral-800 dark:file:text-neutral-200 hover:file:bg-neutral-300"
                />
              </div>

              <!-- OR Direct URL Input -->
              <div>
                <label for="work-url" class="block text-[10px] text-neutral-400 mb-1">Ou cole o link direto da imagem/vídeo:</label>
                <input 
                  id="work-url"
                  type="url" 
                  [(ngModel)]="url" 
                  name="url" 
                  placeholder="https://..." 
                  class="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none"
                />
              </div>
            </div>

            <!-- Aspect Ratio & Year -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label for="work-aspect" class="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Proporção de Exibição
                </label>
                <select 
                  id="work-aspect"
                  [(ngModel)]="aspectRatio" 
                  name="aspectRatio" 
                  class="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none"
                >
                  <option value="portrait">Vertical (4:5)</option>
                  <option value="landscape">Horizontal (16:10)</option>
                  <option value="square">Quadrado (1:1)</option>
                  <option value="wide">Cinematográfico (21:9)</option>
                </select>
              </div>

              <div>
                <label for="work-year" class="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Ano *
                </label>
                <input 
                  id="work-year"
                  type="text" 
                  [(ngModel)]="year" 
                  name="year" 
                  required
                  placeholder="2026" 
                  class="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none"
                />
              </div>
            </div>

            <!-- Description -->
            <div>
              <label for="work-desc" class="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Descrição
              </label>
              <textarea 
                id="work-desc"
                [(ngModel)]="description" 
                name="description" 
                rows="2"
                placeholder="Breve história ou conceito do projeto..."
                class="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none"
              ></textarea>
            </div>

            <!-- Tags -->
            <div>
              <label for="work-tags" class="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Tags (separadas por vírgula)
              </label>
              <input 
                id="work-tags"
                type="text" 
                [(ngModel)]="tagsInput" 
                name="tagsInput" 
                placeholder="Ex: Arquitetura, P&B, 3D, Minimalista" 
                class="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none"
              />
            </div>

            <!-- Technical Details Accordion / Fields -->
            <div class="pt-2 border-t border-neutral-200 dark:border-neutral-800">
              <h3 class="text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
                Especificações Técnicas (Opcional)
              </h3>

              @if (category() === 'photo') {
                <div class="grid grid-cols-2 gap-2">
                  <input id="camera-spec" type="text" [(ngModel)]="camera" name="camera" placeholder="Câmara (ex: Leica M11)" class="px-2.5 py-1.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded text-neutral-900 dark:text-neutral-100" />
                  <input id="lens-spec" type="text" [(ngModel)]="lens" name="lens" placeholder="Lente (ex: 35mm f/1.4)" class="px-2.5 py-1.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded text-neutral-900 dark:text-neutral-100" />
                  <input id="iso-spec" type="text" [(ngModel)]="iso" name="iso" placeholder="ISO (ex: 100)" class="px-2.5 py-1.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded text-neutral-900 dark:text-neutral-100" />
                  <input id="loc-spec" type="text" [(ngModel)]="location" name="location" placeholder="Localização" class="px-2.5 py-1.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded text-neutral-900 dark:text-neutral-100" />
                </div>
              } @else {
                <div class="grid grid-cols-2 gap-2">
                  <input id="sw-spec" type="text" [(ngModel)]="software" name="software" placeholder="Software (ex: Blender, After Effects)" class="px-2.5 py-1.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded text-neutral-900 dark:text-neutral-100" />
                  <input id="fps-spec" type="text" [(ngModel)]="fps" name="fps" placeholder="FPS (ex: 24fps / 60fps)" class="px-2.5 py-1.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded text-neutral-900 dark:text-neutral-100" />
                  <input id="dur-spec" type="text" [(ngModel)]="duration" name="duration" placeholder="Duração (ex: 01:30)" class="px-2.5 py-1.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded text-neutral-900 dark:text-neutral-100" />
                  <input id="res-spec" type="text" [(ngModel)]="resolution" name="resolution" placeholder="Resolução (ex: 4K 3840x2160)" class="px-2.5 py-1.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded text-neutral-900 dark:text-neutral-100" />
                </div>
              }
            </div>

            <!-- Submit Buttons -->
            <div class="pt-4 flex items-center justify-end gap-2">
              <button 
                type="button" 
                (click)="closeModal()"
                class="px-4 py-2 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                [disabled]="!title || !url"
                class="px-5 py-2 text-xs font-medium bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-full hover:opacity-90 disabled:opacity-40 transition-opacity shadow-xs"
              >
                Guardar Trabalho
              </button>
            </div>
          </form>
        </div>
      </div>
    }
  `
})
export class AddModalComponent {
  portfolioService = inject(PortfolioService);

  category = signal<'photo' | 'video' | 'animation'>('photo');
  title = '';
  client = '';
  url = '';
  aspectRatio: 'square' | 'portrait' | 'landscape' | 'wide' = 'portrait';
  year = new Date().getFullYear().toString();
  description = '';
  tagsInput = '';

  camera = '';
  lens = '';
  iso = '';
  location = '';

  software = '';
  fps = '';
  duration = '';
  resolution = '';

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          this.url = e.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  submitForm(): void {
    if (!this.title || !this.url) return;

    const tags = this.tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const item: Omit<PortfolioItem, 'id' | 'createdAt'> = {
      title: this.title,
      category: this.category(),
      description: this.description || 'Sem descrição.',
      url: this.url,
      aspectRatio: this.aspectRatio,
      year: this.year || '2026',
      client: this.client || undefined,
      tags: tags.length > 0 ? tags : [this.category() === 'photo' ? 'Fotografia' : this.category() === 'video' ? 'Vídeo' : 'Animação'],
      details: {
        camera: this.camera || undefined,
        lens: this.lens || undefined,
        iso: this.iso || undefined,
        location: this.location || undefined,
        software: this.software || undefined,
        fps: this.fps || undefined,
        duration: this.duration || undefined,
        resolution: this.resolution || undefined
      }
    };

    this.portfolioService.addItem(item);
    this.resetForm();
  }

  closeModal(): void {
    this.portfolioService.isAddModalOpen.set(false);
  }

  private resetForm(): void {
    this.title = '';
    this.client = '';
    this.url = '';
    this.description = '';
    this.tagsInput = '';
    this.camera = '';
    this.lens = '';
    this.iso = '';
    this.location = '';
    this.software = '';
    this.fps = '';
    this.duration = '';
    this.resolution = '';
  }
}
