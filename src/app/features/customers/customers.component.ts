import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Customer } from '../../core/models/customer.model';
import { CustomerService } from '../../core/services/customer.service';

@Component({
  selector: 'app-customers',
  imports: [ReactiveFormsModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent implements OnInit {
  protected readonly customers = signal<Customer[]>([]);
  protected readonly apiMessage = signal('');
  protected editingId: number | null = null;
  protected readonly form;

  constructor(
    formBuilder: FormBuilder,
    private readonly customerService: CustomerService
  ) {
    this.form = formBuilder.nonNullable.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      document: ['', Validators.required],
      active: [true]
    });
  }

  ngOnInit(): void {
    this.load();
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const payload = this.form.getRawValue();
    const request = this.editingId
      ? this.customerService.update(this.editingId, { ...payload, id: this.editingId })
      : this.customerService.create(payload);

    request.subscribe({
      next: () => {
        this.reset();
        this.load();
      },
      error: () => this.apiMessage.set('API de clientes indisponivel. Configure reserveoApiUrl quando o backend estiver pronto.')
    });
  }

  edit(customer: Customer): void {
    this.editingId = customer.id ?? null;
    this.form.patchValue(customer);
  }

  remove(customer: Customer): void {
    if (!customer.id) {
      return;
    }
    this.customerService.delete(customer.id).subscribe({
      next: () => this.load(),
      error: () => this.apiMessage.set('Nao foi possivel excluir o cliente.')
    });
  }

  reset(): void {
    this.editingId = null;
    this.form.reset({ name: '', email: '', phone: '', document: '', active: true });
  }

  private load(): void {
    this.customerService.list().subscribe({
      next: customers => {
        this.customers.set(customers);
        this.apiMessage.set('');
      },
      error: () => this.apiMessage.set('A listagem sera carregada quando a API REST do Reserveo estiver disponivel.')
    });
  }
}
