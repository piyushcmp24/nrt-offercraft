import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordValidator } from '../../shared/validators/password.validator';

declare var bootstrap: any;

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
      password: ['', [Validators.required, PasswordValidator.passwordComplexity()]],
      confirmPassword: ['', Validators.required]
    }, { validators: PasswordValidator.passwordMatch('password', 'confirmPassword') });
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

  getPasswordErrorMessage(control: AbstractControl): string {
    return PasswordValidator.getPasswordErrorMessage(control);
  }

  getPasswordMatchErrorMessage(): string {
    return this.passwordForm?.errors?.['passwordMismatch'] ? 'Passwords do not match.' : '';
  }
} 