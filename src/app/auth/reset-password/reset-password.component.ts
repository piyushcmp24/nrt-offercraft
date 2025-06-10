import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../auth/auth.service';
import { ForgotPasswordService } from '../../core/service/forgot-password.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: 'reset-password.component.scss'
})
export class ResetPasswordComponent {
  form: FormGroup;
  message = '';
  error = '';
  token='';

  // Simulated user object
  mockUser = {
    email: 'user@example.com',
    password: 'oldPassword123'
  };

  constructor(private fb: FormBuilder, private forgotPasswordService: ForgotPasswordService, private route: ActivatedRoute) {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';

    this.form = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  get password() {
    return this.form.get('password');
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  passwordsMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  // onSubmit() {
  //   if (this.form.valid) {
  //     console.log('New Password:', this.password?.value);
  //     this.message = 'Password has been reset successfully.';
  //     this.error = '';
  //     // Optionally call a service to update password
  //   } else {
  //     this.form.markAllAsTouched();
  //     this.error = 'Please fix the errors above.';
  //     this.message = '';
  //   }
  // }

  
  onSubmit() {
  if (this.form.valid) {
    const newPassword = this.password?.value;

    // Call backend service to update the password
    this.forgotPasswordService.resetPassword({ password: newPassword, token: this.token }).subscribe({
      next: () => {
        this.message = 'Password has been reset successfully.';
        this.error = '';
        this.form.reset();
      },
      error: (err) => {
        this.message = '';
        this.error = err.error?.message || 'Failed to reset password.';
      }
    });
  } else {
    this.form.markAllAsTouched();
    this.error = 'Please fix the errors above.';
    this.message = '';
  }
}

}

