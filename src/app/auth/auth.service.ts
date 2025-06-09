import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, delay, of, tap, throwError } from 'rxjs';
import { User } from './models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const user = localStorage.getItem('user');
    if (user) {
      this.userSubject.next(JSON.parse(user));
    }
  }

  // login(username: string, password: string) {
  //   return this.http.post<User>('/api/login', { username, password }).pipe(
  //     tap(user => {
  //       console.log("user: ", user);

  //       localStorage.setItem('user', JSON.stringify(user));
  //       this.userSubject.next(user);
  //     })
  //   );
  // }

  login(email: string, password: string) {

    const MAX_ATTEMPTS = 5;
    const LOCK_DURATION_MS = 1 * 60 * 1000; // 1 minute
    const loginAttempts = JSON.parse(localStorage.getItem('loginAttempts') || '{}');
    const userAttempt = loginAttempts[email] || { count: 0, lockUntil: 0 };

    const now = Date.now();
    if (userAttempt.lockUntil && now < userAttempt.lockUntil) {
      return throwError(() => new Error(`Account locked. Try again in ${Math.ceil((userAttempt.lockUntil - now) / 1000)}s`));
    }

    return of({
      email,
      role: email === 'superadmin@offercraft.net' ? 'admin' : 'user',
      token: 'dummy-token'
    }).pipe(
      delay(500),
      tap(() => {
        const isValid =
          (email === 'superadmin@offercraft.net' && password === 'OfferCraft@2025') ||
          (email === 'user@example.com' && password === 'user');

        if (!isValid) {
          userAttempt.count += 1;
          if (userAttempt.count >= MAX_ATTEMPTS) {
            userAttempt.lockUntil = Date.now() + LOCK_DURATION_MS;
          }
          loginAttempts[email] = userAttempt;
          localStorage.setItem('loginAttempts', JSON.stringify(loginAttempts));
          throw new Error('Invalid credentials');
        }

        // On success: reset failed attempt counter
        delete loginAttempts[email];
        localStorage.setItem('loginAttempts', JSON.stringify(loginAttempts));

        const user: any = { email, role: email === 'superadmin@offercraft.net' ? 'admin' : 'user', token: 'dummy-token' };
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
      })
    );
  }

  logout() {
    localStorage.clear();
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  get currentUser(): User | null {
    return this.userSubject.value;
  }

  // hasRole(role: 'admin' | 'user'): boolean {
  //   return this.currentUser?.role === role;
  // }

  getToken(): string | null {
    return this.currentUser?.token || null;
  }

  requestPasswordReset(email: string) {
    return this.http.post('/api/auth/forgot-password', { email });
  }
}
