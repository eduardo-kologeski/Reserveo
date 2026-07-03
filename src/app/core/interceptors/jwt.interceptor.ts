import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { TokenStorageService } from '../services/token-storage.service';

export const jwtInterceptor: HttpInterceptorFn = (request, next) => {
  const token = inject(TokenStorageService).accessToken;
  const isApiRequest = request.url.startsWith(environment.authCoreApiUrl) || request.url.startsWith(environment.reserveoApiUrl);

  if (!token || !isApiRequest || request.url.endsWith('/auth/login') || request.url.endsWith('/auth/refresh')) {
    return next(request);
  }

  return next(request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  }));
};
