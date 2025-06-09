import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../auth/auth.service';
import { ForgotPasswordService } from '../../core/service/forgot-password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: 'forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  form: FormGroup;
  message: string = '';
  error: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, 
    private forgotService: ForgotPasswordService) {
    this.form = this.fb.group({
      email: '',
    });
  }

   ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    // const email = this.form.value;
    if (this.form.valid) {
      const email = this.form.value.email;
      this.forgotService.sendForgotPasswordEmail(email).subscribe({
        next: () => { console.log(email); this.message = 'A password reset link has been sent to your email'; },
        error: () => { this.error = `We couldn't find an account with that email address.`; }
      });

      // this.authService.requestPasswordReset(email).subscribe({
      //   next: () => {
      //     this.message = 'Reset link sent. Check your email.';
      //     this.error = '';
      //   },
      //   error: (err) => {
      //     this.error = 'Error sending reset link.';
      //     this.message = '';
      //   }
      // });
    }
  }

  get email() {
    return this.form.get('email');
  }
}
