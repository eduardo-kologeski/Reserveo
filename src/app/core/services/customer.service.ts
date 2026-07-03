import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';
import { CrudApiService } from './crud-api.service';

@Injectable({ providedIn: 'root' })
export class CustomerService extends CrudApiService<Customer> {
  constructor(http: HttpClient) {
    super(http, 'customers');
  }
}
