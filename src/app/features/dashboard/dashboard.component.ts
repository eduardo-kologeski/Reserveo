import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  protected readonly metrics = [
    { label: 'Agendamentos hoje', value: '18' },
    { label: 'Confirmados', value: '12' },
    { label: 'Profissionais ativos', value: '7' },
    { label: 'Receita prevista', value: 'R$ 4.280' }
  ];
}
