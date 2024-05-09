import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private notify: ToastrService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const urlSegments = state.url.split('/'); // Split the URL into segments

    const credentials = this.authService.getUserCredentials();
    console.log( credentials, 'credentials')

    if (!credentials) {
      this.router.navigate(['/auth']);
      this.notify.warning('Kindly login to continue');
      return false;
    }

   else{
    return true;
   }
   
  }
}
