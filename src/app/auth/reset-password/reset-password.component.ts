import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { PasswordValidator } from '../../shared/validators/password.validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: 'reset-password.component.scss'
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  message = '';
  error = '';
  token = '';

  // Simulated user object
  mockUser = {
    email: 'user@example.com',
    password: 'oldPassword123'
  };

  constructor(private fb: FormBuilder, private authService: AuthService, private route: ActivatedRoute) {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';

    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, PasswordValidator.passwordComplexity()]],
      confirmPassword: ['', Validators.required]
    }, { validators: PasswordValidator.passwordMatch('password', 'confirmPassword') });
  }

  get passwordCtrl() { return this.resetPasswordForm.get('password'); }
  get confirmPasswordCtrl() { return this.resetPasswordForm.get('confirmPassword'); }

  getPasswordErrorMessage(control: AbstractControl): string {
    return PasswordValidator.getPasswordErrorMessage(control);
  }

  getPasswordMatchErrorMessage(): string {
    return this.resetPasswordForm?.errors?.['passwordMismatch'] ? 'Passwords do not match.' : '';
  }

  get password() {
    return this.resetPasswordForm.get('password');
  }

  get confirmPassword() {
    return this.resetPasswordForm.get('confirmPassword');
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
    if (this.resetPasswordForm.valid) {
      const newPassword = this.password?.value;
      console.log("password value: ", newPassword);

      // Call backend service to update the password
      this.authService.resetPassword({ password: newPassword, token: this.token }).subscribe({
        next: () => {
          this.message = 'Password has been reset successfully.';
          this.error = '';
          this.resetPasswordForm.reset();
        },
        error: (err) => {
          this.message = '';
          this.error = err.error?.message || 'Failed to reset password.';
        }
      });
    } else {
      this.resetPasswordForm.markAllAsTouched();
      this.error = 'Please fix the errors above.';
      this.message = '';
    }
  }

}

