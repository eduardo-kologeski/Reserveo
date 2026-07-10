import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, of, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse, JwtClaims, LoginRequest } from '../models/auth.models';
import { User, UserRole } from '../models/user.model';
import { TokenStorageService } from './token-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly authUrl = `${environment.authCoreApiUrl}/auth`;
  private readonly usersUrl = `${environment.authCoreApiUrl}/users`;
  private readonly currentUserSignal = signal<User | null>(null);

  readonly currentUser = this.currentUserSignal.asReadonly();

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly tokenStorage: TokenStorageService
  ) {
    this.currentUserSignal.set(this.userFromToken());
  }

  login(request: LoginRequest): Observable<User | null> {
    return this.http.post<AuthResponse>(`${this.authUrl}/login`, request).pipe(
      tap(response => this.tokenStorage.save(response.accessToken, response.refreshToken)),
      switchMap(() => this.loadCurrentUser())
    );
  }

  isAuthenticated(): boolean {
    return !!this.tokenStorage.accessToken && !this.isTokenExpired();
  }

  refresh(): Observable<boolean> {
    const refreshToken = this.tokenStorage.refreshToken;
    if (!refreshToken) {
      return of(false);
    }

    return this.http.post<AuthResponse>(`${this.authUrl}/refresh`, { refreshToken }).pipe(
      tap(response => {
        this.tokenStorage.updateAccessToken(response.accessToken);
        if (response.refreshToken) {
          this.tokenStorage.save(response.accessToken, response.refreshToken);
        }
        this.currentUserSignal.set(this.userFromToken());
      }),
      map(() => true),
      catchError(() => {
        this.logout(false);
        return of(false);
      })
    );
  }

  loadCurrentUser(): Observable<User | null> {
    if (!this.tokenStorage.accessToken) {
      this.currentUserSignal.set(null);
      return of(null);
    }

    return this.http.get<User>(`${this.usersUrl}/me`).pipe(
      tap(user => this.currentUserSignal.set(this.normalizeRole(user))),
      catchError(() => {
        const user = this.userFromToken();
        this.currentUserSignal.set(user);
        return of(user);
      })
    );
  }

  logout(callApi = true): void {
    const refreshToken = this.tokenStorage.refreshToken;
    if (callApi && refreshToken) {
      this.http.post<void>(`${this.authUrl}/logout`, { refreshToken }).subscribe();
    }
    this.tokenStorage.clear();
    this.currentUserSignal.set(null);
    this.router.navigateByUrl('/login');
  }

  hasAnyRole(roles: UserRole[]): boolean {
    const user = this.currentUser();
    if (!user) {
      return false;
    }

    if (roles.includes(user.role)) {
      return true;
    }

    return user.role === 'ADMIN';
  }

  private userFromToken(): User | null {
    const token = this.tokenStorage.accessToken;
    if (!token || this.isTokenExpired(token)) {
      return null;
    }

    const claims = this.decodeToken(token);
    if (!claims) {
      return null;
    }

    return this.normalizeRole({
      id: claims.userId,
      name: claims.name,
      email: claims.sub,
      role: claims.role
    });
  }

  private isTokenExpired(token = this.tokenStorage.accessToken): boolean {
    const claims = token ? this.decodeToken(token) : null;
    if (!claims?.exp) {
      return true;
    }
    return claims.exp * 1000 <= Date.now();
  }

  private decodeToken(token: string): JwtClaims | null {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/'))) as JwtClaims;
    } catch {
      return null;
    }
  }

  private normalizeRole(user: User): User {
    return user.role === 'USER' ? { ...user, role: 'CUSTOMER' } : user;
  }
}
