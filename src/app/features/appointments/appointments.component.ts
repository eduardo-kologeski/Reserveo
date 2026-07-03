import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Appointment, AppointmentStatus } from '../../core/models/appointment.model';
import { AppointmentService } from '../../core/services/appointment.service';

const STATUSES: AppointmentStatus[] = ['AGENDADO', 'CONFIRMADO', 'CANCELADO', 'CONCLUIDO'];

@Component({
  selector: 'app-appointments',
  imports: [ReactiveFormsModule],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.scss'
})
export class AppointmentsComponent implements OnInit {
  protected readonly appointments = signal<Appointment[]>([]);
  protected readonly statuses = STATUSES;
  protected readonly apiMessage = signal('');
  protected editingId: number | null = null;
  protected readonly form;
  protected readonly filters;

  constructor(
    formBuilder: FormBuilder,
    private readonly appointmentService: AppointmentService
  ) {
    this.form = formBuilder.nonNullable.group({
      customerId: [0, [Validators.required, Validators.min(1)]],
      professionalId: [0, [Validators.required, Validators.min(1)]],
      serviceId: [0, [Validators.required, Validators.min(1)]],
      startDateTime: ['', Validators.required],
      endDateTime: ['', Validators.required],
      status: ['AGENDADO' as AppointmentStatus, Validators.required],
      notes: ['']
    });

    this.filters = formBuilder.group({
      date: [''],
      customerId: [null as number | null],
      professionalId: [null as number | null],
      status: ['' as AppointmentStatus | '']
    });
  }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.appointmentService.list(this.filters.getRawValue()).subscribe({
      next: appointments => {
        this.appointments.set(appointments);
        this.apiMessage.set('');
      },
      error: () => this.apiMessage.set('A agenda sera carregada quando a API REST do Reserveo estiver disponivel.')
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const payload = this.form.getRawValue();
    const request = this.editingId
      ? this.appointmentService.update(this.editingId, { ...payload, id: this.editingId })
      : this.appointmentService.create(payload);

    request.subscribe({
      next: () => {
        this.reset();
        this.load();
      },
      error: () => this.apiMessage.set('Nao foi possivel salvar o agendamento.')
    });
  }

  edit(appointment: Appointment): void {
    this.editingId = appointment.id ?? null;
    this.form.patchValue(appointment);
  }

  cancel(appointment: Appointment): void {
    if (!appointment.id) {
      return;
    }

    this.appointmentService.update(appointment.id, { ...appointment, status: 'CANCELADO' }).subscribe({
      next: () => this.load(),
      error: () => this.apiMessage.set('Nao foi possivel cancelar o agendamento.')
    });
  }

  remove(appointment: Appointment): void {
    if (!appointment.id) {
      return;
    }
    this.appointmentService.delete(appointment.id).subscribe({
      next: () => this.load(),
      error: () => this.apiMessage.set('Nao foi possivel excluir o agendamento.')
    });
  }

  reset(): void {
    this.editingId = null;
    this.form.reset({
      customerId: 0,
      professionalId: 0,
      serviceId: 0,
      startDateTime: '',
      endDateTime: '',
      status: 'AGENDADO',
      notes: ''
    });
  }
}
