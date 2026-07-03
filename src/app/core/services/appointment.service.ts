import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment, AppointmentFilters } from '../models/appointment.model';
import { CrudApiService } from './crud-api.service';

@Injectable({ providedIn: 'root' })
export class AppointmentService extends CrudApiService<Appointment, AppointmentFilters> {
  constructor(http: HttpClient) {
    super(http, 'appointments');
  }
}
