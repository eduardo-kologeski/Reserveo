import { Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthErrorMessageService } from '../../../core/services/auth-error-message.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  protected readonly loading = signal(false);
  protected readonly errorMessage = signal('');
  protected readonly form;

  constructor(
    formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly authErrorMessageService: AuthErrorMessageService,
    private readonly router: Router
  ) {
    this.form = formBuilder.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [true],
      deviceName: ['Reserveo Web']
    });
  }

  submit(): void {
    this.errorMessage.set('');
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.authService.login(this.form.getRawValue()).subscribe({
      next: () => this.router.navigateByUrl('/dashboard'),
      error: error => {
        this.loading.set(false);
        this.errorMessage.set(this.authErrorMessageService.loginMessage(error));
      }
    });
  }
}
