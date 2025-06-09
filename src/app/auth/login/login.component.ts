import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  error = '';

  countdown: number = 0;
  timerSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: '',
      password: ''
    });
  }

  ngOnInit(): void {
    this.checkLockStatus();

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  // ngAfterViewInit() {
  //   setTimeout(() => {
  //     this.form.markAllAsTouched();
  //     this.form.updateValueAndValidity();
  //   });
  // }

  checkLockStatus() {
    const loginAttempts = JSON.parse(localStorage.getItem('loginAttempts') || '{}');
    const email = this.form.get('email')?.value;
    if (!email || !loginAttempts[email]) return;

    const lockUntil = loginAttempts[email].lockUntil;
    const now = Date.now();

    if (lockUntil && now < lockUntil) {
      this.startCountdown(lockUntil);  // Always re-start countdown if still locked
    } else {
      this.countdown = 0;
      this.error = '';
      if (this.timerSubscription) {
        this.timerSubscription.unsubscribe();
      }
    }
  }


  startCountdown(lockUntil: number) {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe(); // Clear any old timer
    }
    this.countdown = Math.ceil((lockUntil - Date.now()) / 1000);
    this.updateErrorMessage();
    this.timerSubscription = interval(1000).subscribe(() => {
      const remaining = Math.ceil((lockUntil - Date.now()) / 1000);
      if (remaining <= 0) {
        this.countdown = 0;
        this.error = '';
        if (this.timerSubscription) {
          this.timerSubscription.unsubscribe();
        }
      } else {
        this.countdown = remaining;
        this.updateErrorMessage();
      }
    });
  }

  updateErrorMessage() {
    this.error = `Account locked. Try again in ${this.countdown}s`;
    // this.error = `Account locked. Try again in ${(this.countdown / 60).toFixed(2)} min`;
  }

  onSubmit() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.value;
    this.authService.login(email, password).subscribe({
      next: (res) => {
        this.router.navigate(['/'])
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);
        this.router.navigate(['/campaign']);
      },
      error: () => this.error = 'The username or password you entered is incorrect. Please try again'
    });
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  goToForgot() {
    this.router.navigate(['/forgot-password']);
  }
}
