# Agendamentos

Agendamentos representam a reserva de um servico com cliente e profissional em um intervalo de horario.

## Entidade

```ts
interface Appointment {
  id?: number;
  customerId: number;
  professionalId: number;
  serviceId: number;
  startDateTime: string;
  endDateTime: string;
  status: 'AGENDADO' | 'CONFIRMADO' | 'CANCELADO' | 'CONCLUIDO';
  notes?: string;
}
```

## Operacoes

- Criar agendamento.
- Editar dados e status.
- Cancelar, alterando status para `CANCELADO`.
- Excluir registro quando permitido.
- Filtrar por data, cliente, profissional e status.

## Endpoints Esperados Da API Reserveo

| Metodo | Endpoint |
| --- | --- |
| `GET` | `/api/appointments` |
| `POST` | `/api/appointments` |
| `PUT` | `/api/appointments/{id}` |
| `DELETE` | `/api/appointments/{id}` |
