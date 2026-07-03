import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { LoginComponent } from './features/auth/login/login.component';
import { LayoutComponent } from './features/layout/layout.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'customers',
        canActivate: [roleGuard],
        data: { roles: ['ADMIN', 'CUSTOMER'] },
        loadComponent: () => import('./features/customers/customers.component').then(m => m.CustomersComponent)
      },
      {
        path: 'services',
        canActivate: [roleGuard],
        data: { roles: ['ADMIN'] },
        loadComponent: () => import('./features/services/services.component').then(m => m.ServicesComponent)
      },
      {
        path: 'professionals',
        canActivate: [roleGuard],
        data: { roles: ['ADMIN', 'PROFESSIONAL'] },
        loadComponent: () => import('./features/professionals/professionals.component').then(m => m.ProfessionalsComponent)
      },
      {
        path: 'appointments',
        canActivate: [roleGuard],
        data: { roles: ['ADMIN', 'PROFESSIONAL', 'CUSTOMER'] },
        loadComponent: () => import('./features/appointments/appointments.component').then(m => m.AppointmentsComponent)
      },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
