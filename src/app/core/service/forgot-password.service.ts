// forgot-password.service.ts (optional approach)
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ForgotPasswordService {
  sendForgotPasswordEmail(email: string) {
    console.log('Simulating API call with email:', email);
    return of({ success: true }).pipe(delay(1000)); // simulate network delay
  }
}
