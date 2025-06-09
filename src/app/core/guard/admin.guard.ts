import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './../../auth/auth.service';
import { Router } from '@angular/router';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const currentUser = auth.currentUser;

  if (!currentUser) {
    router.navigate(['/login']);
    return false;
  }

  if (currentUser.role !== 'admin') {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    router.navigate(['/login']); // or /unauthorized
    return false;
  }

  return true;
};
