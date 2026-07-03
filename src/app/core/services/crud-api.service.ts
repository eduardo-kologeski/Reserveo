import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export abstract class CrudApiService<T extends { id?: number }, TFilters extends object = Record<string, unknown>> {
  protected readonly baseUrl = environment.reserveoApiUrl;

  protected constructor(
    protected readonly http: HttpClient,
    private readonly resourcePath: string
  ) {}

  list(filters?: TFilters): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}/${this.resourcePath}`, {
      params: this.toParams(filters)
    });
  }

  create(payload: T): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${this.resourcePath}`, payload);
  }

  update(id: number, payload: T): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${this.resourcePath}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${this.resourcePath}/${id}`);
  }

  private toParams(filters?: TFilters): HttpParams {
    let params = new HttpParams();
    Object.entries(filters ?? {}).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        params = params.set(key, String(value));
      }
    });
    return params;
  }
}
