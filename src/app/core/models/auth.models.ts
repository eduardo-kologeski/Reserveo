import { UserRole } from './user.model';

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
  deviceName?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
}

export interface JwtClaims {
  sub: string;
  userId: number;
  name: string;
  role: UserRole;
  exp: number;
  iat: number;
}
