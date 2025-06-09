import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../auth/auth.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  menuOpen = false;
  isCollapsed  = true;
 
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
 
  isAdmin:boolean = false;
 
  isMobileMenuOpen = false;
  isMobileDropdownOpen = false;
 
  navLinks = [
    { path: '/home', label: 'OVERVIEW' },
    { path: '/campaign', label: 'CAMPAIGNS' },
    { path: '/rewards', label: 'REWARDS' },
    { path: '/instant-rewards', label: 'INSTANT REWARDS' },
    { path: '/questions', label: 'QUESTIONS' },
    { path: '/lobbies', label: 'LOBBIES' },
    { path: '/snapshots', label: 'SNAPSHOTS' },
    { path: '/reports', label: 'REPORTS' },
    { path: '/player-management', label: 'PLAYER MANAGEMENT' },
    { path: '/admin', label: 'ADMIN', adminOnly: true }
  ];
 
  constructor(private authService: AuthService, private router: Router){}
  ngOnInit(): void {
    // this.isAdmin = this.authService.isAdmin();
 
    this.authService.user$.subscribe(user=>{
      this.isAdmin = user?.role==='admin'
      console.log("Header - isAdmin:", this.isAdmin);
    })
  }
 
 
 ngOnDestroy() {
    // Clean up body class when component is destroyed
    document.body.classList.remove('mobile-menu-open');
  }
 
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (!this.isMobileMenuOpen) {
      this.isMobileDropdownOpen = false;
    }
  }
 
  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    this.isMobileDropdownOpen = false;
  }
 
  SignOut(event: Event) {
    event.preventDefault();
    this.authService.logout();
  }
 
  toggleMobileDropdown() {
    this.isMobileDropdownOpen = !this.isMobileDropdownOpen;
  } 

  onLogout(){
      this.authService.logout()
      this.router.navigate(['/login']); // redirect to login page
  }
}
