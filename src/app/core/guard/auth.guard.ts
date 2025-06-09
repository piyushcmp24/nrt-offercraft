import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './../../auth/auth.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const currentUser = auth.currentUser;

  if (!currentUser) {
    router.navigate(['/login']);
    return false;
  }

  // If requiredRole is passed in route data
  // const requiredRole = route.data['requiredRole'] as 'admin' | 'user' | undefined;
  // if (requiredRole && currentUser.role !== requiredRole) {
  //   console.warn(`Access denied: ${currentUser.role} does not match ${requiredRole}`);
  //   router.navigate(['/login']); // or redirect to /unauthorized page if desired
  //   return false;
  // }

  return true;

};
