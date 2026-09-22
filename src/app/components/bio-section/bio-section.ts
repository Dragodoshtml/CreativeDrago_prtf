import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bio-section',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section 
      id="about" 
      aria-label="Sobre Alexandre Vieira"
      class="w-full bg-[#342A21] overflow-hidden transition-colors duration-300 border-t border-black/30"
    >
      <div class="w-full grid grid-cols-1 lg:grid-cols-2 min-h-[580px] lg:min-h-[640px]">
        
        <!-- Left Half: Photography / Portrait -->
        <div class="relative w-full h-[400px] sm:h-[500px] lg:h-full min-h-[400px] sm:min-h-[500px] lg:min-h-[640px] bg-black overflow-hidden flex items-center justify-center">
          <img 
            [src]="photoUrl()"
            (error)="onPhotoError()"
            alt="Alexandre Vieira - Perfil e Obra" 
            loading="lazy"
            referrerpolicy="no-referrer"
            class="w-full h-full object-cover object-[32%_center] sm:object-[34%_center] lg:object-[36%_center] select-none"
          />
          <!-- Subtle fade on the edge into the coffee tone -->
          <div class="hidden lg:block absolute inset-y-0 right-0 w-16 bg-gradient-to-r from-transparent to-[#342A21] pointer-events-none"></div>
          <div class="lg:hidden absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-[#342A21] pointer-events-none"></div>
        </div>

        <!-- Right Half: Bio Text & Social Links with Dark Coffee Background -->
        <div class="w-full h-full flex flex-col justify-center px-8 sm:px-14 md:px-20 lg:px-20 xl:px-24 py-16 sm:py-20 lg:py-24 text-[#fff8f0] bg-[#342A21]">
          <div class="max-w-xl mx-auto lg:mx-0 w-full flex flex-col justify-center">
            
            <!-- Bio Paragraphs -->
            <div class="space-y-6 text-[15px] sm:text-[16px] leading-[1.75] text-[#fff8f0]/95 font-light">
              <p>
                Olá! Sou o Alexandre Vieira, mais conhecido por Drago ou Creative Drago, sou um videógrafo e fotógrafo, proveniente de Fátima, Portugal.
              </p>

              <p>
                Tirei o curso de Multimédia no Centro de Estudos de Fátima, tendo posteriormente ingressado na Escola Superior de Artes e Design das Caldas da Rainha, onde concluí um TeSP de Audiovisual e Multimédia e uma licenciatura em Som e Imagem.
              </p>

              <p>
                Atualmente encontro-me a tirar um mestrado em Documentário e Reportagem na Escola Superior de Tecnologia de Abrantes.
              </p>

              <p>
                Em baixo estão as redes sociais que uso para divulgar o meu trabalho!
              </p>
            </div>

            <!-- Horizontal Divider Line -->
            <div class="w-24 sm:w-28 border-t border-[#fff8f0]/30 my-8 sm:my-10"></div>

            <!-- Social Networks Links -->
            <div class="flex items-center gap-6 text-[#fff8f0]">
              
              <!-- Instagram -->
              <a 
                href="https://instagram.com/creativedrago" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram de Alexandre Vieira (@creativedrago)"
                title="Instagram"
                class="text-[#fff8f0]/90 hover:text-[#77fe3f] hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#77fe3f] rounded-md p-1"
              >
                <svg class="w-7 h-7 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              <!-- YouTube -->
              <a 
                href="https://youtube.com/@creativedrago" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Canal YouTube de Alexandre Vieira (@creativedrago)"
                title="YouTube"
                class="text-[#fff8f0]/90 hover:text-[#77fe3f] hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#77fe3f] rounded-md p-1"
              >
                <svg class="w-8 h-8 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              <!-- Vimeo -->
              <a 
                href="https://vimeo.com/creativedrago" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Vimeo de Alexandre Vieira"
                title="Vimeo"
                class="text-[#fff8f0]/90 hover:text-[#77fe3f] hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#77fe3f] rounded-md p-1"
              >
                <svg class="w-7 h-7 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881l-1.917-7.114c-.718-2.587-1.487-3.881-2.31-3.881-.176 0-.792.37-1.85 1.111L0 7.217c1.164-1.021 2.308-2.049 3.447-3.083 1.571-1.353 2.748-2.062 3.524-2.135 1.834-.176 2.966.974 3.393 3.45.459 2.651.777 4.305.955 4.962.534 2.459 1.122 3.688 1.761 3.688.497 0 1.218-.781 2.161-2.344.945-1.562 1.45-2.734 1.517-3.515.118-1.294-.374-1.941-1.474-1.941-.519 0-1.058.118-1.618.353 1.07-3.501 3.12-5.187 6.155-5.059 2.253.097 3.308 1.464 3.156 4.103z"/>
                </svg>
              </a>

            </div>

          </div>
        </div>

      </div>
    </section>
  `
})
export class BioSectionComponent {
  photoUrl = signal<string>('https://lh3.googleusercontent.com/d/1SdaTJe6KiR13-0PWPKMWmrqtUiQ7Hgj7');

  onPhotoError(): void {
    // Fallback to local copy if external resource encounters network issues
    if (this.photoUrl() !== '/photos/profile.jpg') {
      this.photoUrl.set('/photos/profile.jpg');
    }
  }
}
