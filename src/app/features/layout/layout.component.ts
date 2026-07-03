import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { LoadingComponent } from '../../shared/components/loading/loading.component';

@Component({
  selector: 'app-layout',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, LoadingComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  private readonly authService = inject(AuthService);
  protected readonly user = this.authService.currentUser;
  protected readonly initials = computed(() => this.user()?.name.split(' ').map(part => part[0]).slice(0, 2).join('') ?? 'R');

  logout(): void {
    this.authService.logout();
  }
}
