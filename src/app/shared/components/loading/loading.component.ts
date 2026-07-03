import { Component, inject } from '@angular/core';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'app-loading',
  template: `
    @if (loadingService.loading()) {
      <div class="loading-bar" aria-label="Carregando"></div>
    }
  `,
  styles: [`
    .loading-bar {
      position: fixed;
      inset: 0 auto auto 0;
      z-index: 1000;
      height: 3px;
      width: 100%;
      background: linear-gradient(90deg, #14b8a6, #f59e0b, #2563eb);
      animation: pulse 1.2s ease-in-out infinite;
      transform-origin: left;
    }

    @keyframes pulse {
      0% { transform: scaleX(.2); opacity: .55; }
      50% { transform: scaleX(.75); opacity: 1; }
      100% { transform: scaleX(1); opacity: .55; }
    }
  `]
})
export class LoadingComponent {
  protected readonly loadingService = inject(LoadingService);
}
