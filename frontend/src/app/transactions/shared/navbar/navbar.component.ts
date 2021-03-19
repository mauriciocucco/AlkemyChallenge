import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  get user() {
    return this.authService.user;
  }
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }
}
