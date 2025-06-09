import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'OfferCraft';
  private logoutTimer: any;
  private readonly TIMEOUT = 2 * 60 * 1000; // 2 minutes

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.startLogoutTimer();
  }
  
  @HostListener('document:mousemove')
  @HostListener('document:keydown')
  @HostListener('document:click')
  @HostListener('document:scroll')
  resetTimer() {
    this.startLogoutTimer();
  }

  startLogoutTimer() {
    clearTimeout(this.logoutTimer);
    const token = localStorage.getItem('token');
    if (!token) return;

    this.logoutTimer = setTimeout(() => {
      localStorage.clear();
      alert('Session expired due to inactivity.');
      this.router.navigate(['/login']);
    }, this.TIMEOUT);
  }

  isLoginPage(): boolean {
    return (this.router.url === '/login' || this.router.url === '/forgot-password' || this.router.url === '/reset-password');
  }

  showSidebar(): boolean {
    return ['/campaign', '/rewards', '/instant-rewards'].includes(this.router.url);
  }
}
