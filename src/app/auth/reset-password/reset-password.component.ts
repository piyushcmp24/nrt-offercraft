import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../auth/auth.service';
import { ForgotPasswordService } from '../../core/service/forgot-password.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: 'reset-password.component.scss'
})
export class ResetPasswordComponent {
  form: FormGroup;
  message = '';
  error = '';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      })
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

  onSubmit() {
    if (this.form.valid) {
      console.log('New Password:', this.password?.value);
      this.message = 'Password has been reset successfully.';
      this.error = '';
      // Optionally call a service to update password
    } else {
      this.form.markAllAsTouched();
      this.error = 'Please fix the errors above.';
      this.message = '';
    }
  }
}

