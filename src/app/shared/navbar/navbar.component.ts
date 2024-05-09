import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private router: Router) {}


  // router link dosent work so i had to improvise with these 
  goToLogin() {
    this.router.navigate(['/auth']);
  }

  goToSignup() {
    this.router.navigate(['/auth/signup']);
  }
}
