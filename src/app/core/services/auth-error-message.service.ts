import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthErrorMessageService {
  loginMessage(error: unknown): string {
    if (!(error instanceof HttpErrorResponse)) {
      return 'Nao foi possivel autenticar. Tente novamente em instantes.';
    }

    switch (error.status) {
      case 0:
        return 'Nao foi possivel conectar ao AuthCore. Verifique se o servico esta rodando e se o CORS permite a origem do Reserveo.';
      case 400:
        return 'Dados de login invalidos. Confira o formato do email e da senha.';
      case 401:
        return 'E-mail ou senha invalidos.';
      case 403:
        return 'Acesso negado pelo AuthCore.';
      case 500:
        return 'Erro interno do AuthCore. Tente novamente em instantes.';
      default:
        return 'Nao foi possivel autenticar. Tente novamente em instantes.';
    }
  }
}
