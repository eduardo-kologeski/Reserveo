import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private activeRequests = 0;
  private readonly loadingSignal = signal(false);

  readonly loading = this.loadingSignal.asReadonly();

  show(): void {
    this.activeRequests += 1;
    this.loadingSignal.set(true);
  }

  hide(): void {
    this.activeRequests = Math.max(0, this.activeRequests - 1);
    this.loadingSignal.set(this.activeRequests > 0);
  }
}
