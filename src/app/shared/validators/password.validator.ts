import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class PasswordValidator {
  /**
   * Validates password complexity requirements:
   * - At least 8 characters
   * - Contains uppercase letter
   * - Contains lowercase letter
   * - Contains number
   * - Contains special character (!@#$%^&*)
   */
  static passwordComplexity(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const hasUpperCase = /[A-Z]/.test(control.value);
      const hasLowerCase = /[a-z]/.test(control.value);
      const hasNumber = /[0-9]/.test(control.value);
      const hasSpecialChar = /[!@#$%^&*]/.test(control.value);
      const hasMinLength = control.value.length >= 8;

      const valid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && hasMinLength;

      return valid ? null : { passwordComplexity: true };
    };
  }

  /**
   * Validates that password and confirm password match
   */
  static passwordMatch(passwordControlName: string, confirmPasswordControlName: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const passwordControl = formGroup.get(passwordControlName);
      const confirmPasswordControl = formGroup.get(confirmPasswordControlName);

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        return { passwordMismatch: true };
      }

      return null;
    };
  }

  /**
   * Helper function to get password validation error message
   */
  static getPasswordErrorMessage(control: AbstractControl): string {
    if (!control.errors) {
      return '';
    }

    if (control.errors['required']) {
      return 'Password is required.';
    }

    if (control.errors['passwordComplexity']) {
      return 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character (!@#$%^&*).';
    }

    return '';
  }
} 