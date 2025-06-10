// forgot-password.service.ts (optional approach)
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ForgotPasswordService {

  constructor(private http: HttpClient) {}
  
  sendForgotPasswordEmail(email: string) {
    console.log('Simulating API call with email:', email);
    return of({ success: true }).pipe(delay(1000)); // simulate network delay
  }

  resetPassword(data: { password: string, token: string }): Observable<any> {
    // Adjust the API URL based on your backend
    return this.http.post('/api/auth/reset-password', data);
  }
}
