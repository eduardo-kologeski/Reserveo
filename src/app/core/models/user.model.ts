export type UserRole = 'ADMIN' | 'PROFESSIONAL' | 'CUSTOMER' | 'USER';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}
