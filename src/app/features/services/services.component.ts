import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Service } from '../../core/models/service.model';
import { SchedulerServiceService } from '../../core/services/scheduler-service.service';

@Component({
  selector: 'app-services',
  imports: [ReactiveFormsModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements OnInit {
  protected readonly services = signal<Service[]>([]);
  protected readonly apiMessage = signal('');
  protected editingId: number | null = null;
  protected readonly form;

  constructor(
    formBuilder: FormBuilder,
    private readonly serviceApi: SchedulerServiceService
  ) {
    this.form = formBuilder.nonNullable.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      durationMinutes: [60, [Validators.required, Validators.min(5)]],
      price: [0, [Validators.required, Validators.min(0)]],
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
      ? this.serviceApi.update(this.editingId, { ...payload, id: this.editingId })
      : this.serviceApi.create(payload);

    request.subscribe({
      next: () => {
        this.reset();
        this.load();
      },
      error: () => this.apiMessage.set('API de servicos indisponivel.')
    });
  }

  edit(service: Service): void {
    this.editingId = service.id ?? null;
    this.form.patchValue(service);
  }

  remove(service: Service): void {
    if (!service.id) {
      return;
    }
    this.serviceApi.delete(service.id).subscribe({
      next: () => this.load(),
      error: () => this.apiMessage.set('Nao foi possivel excluir o servico.')
    });
  }

  reset(): void {
    this.editingId = null;
    this.form.reset({ name: '', description: '', durationMinutes: 60, price: 0, active: true });
  }

  private load(): void {
    this.serviceApi.list().subscribe({
      next: services => {
        this.services.set(services);
        this.apiMessage.set('');
      },
      error: () => this.apiMessage.set('A listagem sera carregada quando a API REST do Reserveo estiver disponivel.')
    });
  }
}
