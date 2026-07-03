import { Injectable } from '@angular/core';

const ACCESS_TOKEN_KEY = 'reserveo.accessToken';
const REFRESH_TOKEN_KEY = 'reserveo.refreshToken';

@Injectable({ providedIn: 'root' })
export class TokenStorageService {
  get accessToken(): string | null {
    return sessionStorage.getItem(ACCESS_TOKEN_KEY) ?? localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  get refreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  save(accessToken: string, refreshToken?: string): void {
    sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    if (refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    }
  }

  updateAccessToken(accessToken: string): void {
    if (localStorage.getItem(ACCESS_TOKEN_KEY)) {
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      return;
    }
    sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  }

  clear(): void {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
}
