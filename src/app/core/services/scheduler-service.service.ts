import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from '../models/service.model';
import { CrudApiService } from './crud-api.service';

@Injectable({ providedIn: 'root' })
export class SchedulerServiceService extends CrudApiService<Service> {
  constructor(http: HttpClient) {
    super(http, 'services');
  }
}
