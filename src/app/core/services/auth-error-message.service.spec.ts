import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AuthErrorMessageService } from './auth-error-message.service';

describe('AuthErrorMessageService', () => {
  let service: AuthErrorMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthErrorMessageService);
  });

  it('should explain invalid request payloads', () => {
    const message = service.loginMessage(new HttpErrorResponse({ status: 400 }));

    expect(message).toContain('Dados de login invalidos');
  });

  it('should explain invalid credentials', () => {
    const message = service.loginMessage(new HttpErrorResponse({ status: 401 }));

    expect(message).toContain('E-mail ou senha invalidos');
  });

  it('should explain denied access', () => {
    const message = service.loginMessage(new HttpErrorResponse({ status: 403 }));

    expect(message).toContain('Acesso negado');
  });

  it('should explain network or CORS failures', () => {
    const message = service.loginMessage(new HttpErrorResponse({ status: 0 }));

    expect(message).toContain('CORS');
  });

  it('should explain AuthCore internal errors', () => {
    const message = service.loginMessage(new HttpErrorResponse({ status: 500 }));

    expect(message).toContain('Erro interno do AuthCore');
  });
});
