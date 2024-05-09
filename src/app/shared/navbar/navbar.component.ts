import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}
  isAuth: any;
  ngOnInit(): void {
    console.log(this.authService.getUserCredentials());
    this.isAuth = this.authService.getUserCredentials();
  }

  // router link dosent work so i had to improvise with these
  goToLogin() {
    this.router.navigate(['/auth']);
  }

logout(){
  this.authService.logout()
}

  goToSignup() {
    this.router.navigate(['/auth/signup']);
  }
}
