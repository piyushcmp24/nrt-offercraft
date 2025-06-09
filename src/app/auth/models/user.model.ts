export interface User {
  email: string;
  token: string;
  role: 'admin' | 'user';
}
