import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Professional } from '../models/professional.model';
import { CrudApiService } from './crud-api.service';

@Injectable({ providedIn: 'root' })
export class ProfessionalService extends CrudApiService<Professional> {
  constructor(http: HttpClient) {
    super(http, 'professionals');
  }
}
