import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ProfileComponent } from './profile.component';
import { PasswordValidator } from '../../shared/validators/password.validator';
import { Validators } from '@angular/forms';

// Mock bootstrap object
declare global {
  interface Window {
    bootstrap: any;
  }
}

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    // Mock bootstrap object
    window.bootstrap = {
      Tooltip: class {
        constructor(element: any) {}
      }
    };

    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [PasswordValidator]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    // Clean up the mock
    delete window.bootstrap;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default form values', () => {
    expect(component.profileForm.get('email')).toBeTruthy();
    expect(component.profileForm.get('firstName')).toBeTruthy();
    expect(component.profileForm.get('lastName')).toBeTruthy();
    expect(component.profileForm.get('pinCode')).toBeTruthy();
    expect(component.profileForm.get('twoFactorAuth')?.value).toBe('disabled');
    expect(component.profileForm.get('allowUserSearch')?.value).toBeFalse();
    expect(component.profileForm.get('allowUserPrint')?.value).toBeFalse();
    expect(component.profileForm.get('allowUserReprint')?.value).toBeFalse();
    expect(component.profileForm.get('helpMode')?.value).toBeFalse();
  });

  it('should initialize password form with required validators', () => {
    expect(component.passwordForm.get('oldPassword')?.hasValidator(Validators.required)).toBeTrue();
    expect(component.passwordForm.get('password')?.hasValidator(Validators.required)).toBeTrue();
    expect(component.passwordForm.get('confirmPassword')?.hasValidator(Validators.required)).toBeTrue();
  });

  it('should toggle password fields visibility', () => {
    expect(component.showPasswordFields).toBeFalse();
    component.togglePasswordFields();
    expect(component.showPasswordFields).toBeTrue();
    component.togglePasswordFields();
    expect(component.showPasswordFields).toBeFalse();
  });

  it('should reset password form when hiding password fields', () => {
    component.showPasswordFields = true;
    component.passwordForm.patchValue({
      oldPassword: 'oldPass',
      password: 'newPass',
      confirmPassword: 'newPass'
    });
    component.togglePasswordFields();
    expect(component.passwordForm.get('oldPassword')?.value).toBeNull();
    expect(component.passwordForm.get('password')?.value).toBeNull();
    expect(component.passwordForm.get('confirmPassword')?.value).toBeNull();
  });

  it('should show success message and clear it after timeout', fakeAsync(() => {
    component.showSuccess('Test success message');
    expect(component.successMessage).toBe('Test success message');
    tick(4000);
    expect(component.successMessage).toBeNull();
  }));

  it('should show error message and clear it after timeout', fakeAsync(() => {
    component.showError('Test error message');
    expect(component.errorMessage).toBe('Test error message');
    tick(4000);
    expect(component.errorMessage).toBeNull();
  }));

  it('should validate password match', () => {
    component.passwordForm.patchValue({
      oldPassword: 'oldPass',
      password: 'newPass123',
      confirmPassword: 'newPass456'
    });
    expect(component.passwordForm.hasError('passwordMismatch')).toBeTrue();
    
    component.passwordForm.patchValue({
      oldPassword: 'oldPass',
      password: 'newPass123',
      confirmPassword: 'newPass123'
    });
    expect(component.passwordForm.hasError('passwordMismatch')).toBeFalse();
  });

  it('should require first name and last name', () => {
    const firstNameControl = component.profileForm.get('firstName');
    const lastNameControl = component.profileForm.get('lastName');

    expect(firstNameControl?.hasValidator(Validators.required)).toBeTrue();
    expect(lastNameControl?.hasValidator(Validators.required)).toBeTrue();

    firstNameControl?.setValue('');
    lastNameControl?.setValue('');

    expect(firstNameControl?.valid).toBeFalse();
    expect(lastNameControl?.valid).toBeFalse();
  });

  it('should have two factor auth options', () => {
    expect(component.twoFactorOptions).toEqual([
      { value: 'disabled', label: 'Disabled' },
      { value: 'enabled', label: 'Enabled' },
      { value: 'required', label: 'Required' }
    ]);
  });

  it('should handle form submission with valid data', () => {
    spyOn(component, 'showSuccess');
    component.profileForm.patchValue({
      firstName: 'John',
      lastName: 'Doe',
      pinCode: '123456',
      twoFactorAuth: 'enabled',
      allowUserSearch: true,
      allowUserPrint: false,
      allowUserReprint: false,
      helpMode: true
    });

    component.onSubmit();
    expect(component.showSuccess).toHaveBeenCalled();
  });

  it('should not submit form with invalid data', () => {
    spyOn(component, 'showError');
    component.profileForm.patchValue({
      firstName: '',
      lastName: '',
      pinCode: '123456',
      twoFactorAuth: 'enabled'
    });

    component.onSubmit();
    expect(component.showError).not.toHaveBeenCalled();
  });

  it('should validate password complexity', () => {
    const passwordControl = component.passwordForm.get('password');
    passwordControl?.setValue('weak');
    expect(passwordControl?.valid).toBeFalse();

    passwordControl?.setValue('StrongPass123!');
    expect(passwordControl?.valid).toBeTrue();
  });
});
