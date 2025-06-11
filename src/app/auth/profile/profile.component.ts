import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

declare var bootstrap: any;

function passwordComplexityValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value || '';
  const hasUpper = /[A-Z]/.test(value);
  const hasLower = /[a-z]/.test(value);
  const hasNumber = /[0-9]/.test(value);
  const hasSpecial = /[!@#$%^&*]/.test(value);
  const valid = value.length >= 8 && hasUpper && hasLower && hasNumber && hasSpecial;
  return valid ? null : { passwordComplexity: true };
}

function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;
  return password === confirm ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit {
  profileForm: FormGroup;
  passwordForm: FormGroup;
  showPasswordFields = false;
  loading = true;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  twoFactorOptions = [
    { value: 'disabled', label: 'Disabled' },
    { value: 'enabled', label: 'Enabled' },
    { value: 'required', label: 'Required' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      email: [{ value: '', disabled: true }],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      pinCode: [''],
      twoFactorAuth: ['disabled'],
      allowUserSearch: [false],
      allowUserPrint: [false],
      allowUserReprint: [false],
      helpMode: [false]
    });
    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      password: ['', [Validators.required, passwordComplexityValidator]],
      confirmPassword: ['', Validators.required]
    }, { validators: passwordMatchValidator });
  }

  ngOnInit(): void {
    this.loadProfileData();
  }

  ngAfterViewInit(): void {
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach((tooltipTriggerEl: any) => {
      new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  loadProfileData(): void {
    // TODO: Replace with your actual service call
    this.loading = true;
    // this.adminService.getProfile().subscribe({
    //   next: (data) => {
    //     this.profileForm.patchValue(data);
    //     this.loading = false;
    //   },
    //   error: (error) => {
    //     this.showError('Failed to load profile data');
    //     this.loading = false;
    //   }
    // });
  }

  onSubmit(): void {
    if (this.profileForm.valid && (!this.showPasswordFields || this.passwordForm.valid)) {
      const formData = this.profileForm.getRawValue();
      // TODO: Replace with your actual service call
      // this.adminService.updateProfile(formData).subscribe({
      //   next: () => {
      //     this.showSuccess('Profile updated successfully');
      //   },
      //   error: (error) => {
      //     this.showError('Failed to update profile');
      //   }
      // });
      if (this.showPasswordFields) {
        // TODO: Call password change API and log out other sessions
        // this.authService.changePassword(this.passwordForm.value).subscribe(...)
        this.showSuccess('Password changed successfully. You have been logged out of other sessions.');
        this.showPasswordFields = false;
        this.passwordForm.reset();
      } else {
        this.showSuccess('Profile updated successfully (demo)');
      }
    } else if (this.showPasswordFields && this.passwordForm.invalid) {
      this.showError('Please fix password errors before saving.');
    }
  }

  togglePasswordFields(): void {
    this.showPasswordFields = !this.showPasswordFields;
    if (!this.showPasswordFields) {
      this.passwordForm.reset();
    }
  }

  onEditPassword(): void {
    this.togglePasswordFields();
  }

  showSuccess(message: string): void {
    this.successMessage = message;
    setTimeout(() => this.successMessage = null, 4000);
  }

  showError(message: string): void {
    this.errorMessage = message;
    setTimeout(() => this.errorMessage = null, 4000);
  }

  get passwordCtrl() { return this.passwordForm.get('password'); }
  get confirmPasswordCtrl() { return this.passwordForm.get('confirmPassword'); }
} 