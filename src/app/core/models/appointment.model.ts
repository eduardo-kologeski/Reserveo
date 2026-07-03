export type AppointmentStatus = 'AGENDADO' | 'CONFIRMADO' | 'CANCELADO' | 'CONCLUIDO';

export interface Appointment {
  id?: number;
  customerId: number;
  professionalId: number;
  serviceId: number;
  startDateTime: string;
  endDateTime: string;
  status: AppointmentStatus;
  notes?: string;
}

export interface AppointmentFilters {
  date?: string | null;
  customerId?: number | null;
  professionalId?: number | null;
  status?: AppointmentStatus | '' | null;
}
