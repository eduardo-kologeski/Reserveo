import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Professional } from '../../core/models/professional.model';
import { ProfessionalService } from '../../core/services/professional.service';

@Component({
  selector: 'app-professionals',
  imports: [ReactiveFormsModule],
  templateUrl: './professionals.component.html',
  styleUrl: './professionals.component.scss'
})
export class ProfessionalsComponent implements OnInit {
  protected readonly professionals = signal<Professional[]>([]);
  protected readonly apiMessage = signal('');
  protected editingId: number | null = null;
  protected readonly form;

  constructor(
    formBuilder: FormBuilder,
    private readonly professionalService: ProfessionalService
  ) {
    this.form = formBuilder.nonNullable.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      specialty: ['', Validators.required],
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
      ? this.professionalService.update(this.editingId, { ...payload, id: this.editingId })
      : this.professionalService.create(payload);

    request.subscribe({
      next: () => {
        this.reset();
        this.load();
      },
      error: () => this.apiMessage.set('API de profissionais indisponivel.')
    });
  }

  edit(professional: Professional): void {
    this.editingId = professional.id ?? null;
    this.form.patchValue(professional);
  }

  remove(professional: Professional): void {
    if (!professional.id) {
      return;
    }
    this.professionalService.delete(professional.id).subscribe({
      next: () => this.load(),
      error: () => this.apiMessage.set('Nao foi possivel excluir o profissional.')
    });
  }

  reset(): void {
    this.editingId = null;
    this.form.reset({ name: '', email: '', phone: '', specialty: '', active: true });
  }

  private load(): void {
    this.professionalService.list().subscribe({
      next: professionals => {
        this.professionals.set(professionals);
        this.apiMessage.set('');
      },
      error: () => this.apiMessage.set('A listagem sera carregada quando a API REST do Reserveo estiver disponivel.')
    });
  }
}
