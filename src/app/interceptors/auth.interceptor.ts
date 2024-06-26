import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
// import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
// import { AuthService } from './auth.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      // if(token && !req.url.includes('common')){
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
      return next.handle(cloned).pipe(
        map((event: HttpEvent<any>) => {
          return event;
        }),
        catchError((err: HttpErrorResponse) => {
          if (err.status == 401) {
            if (this.router.url !== '/auth/login') {
            //   this.authService.logout();
              this.router.navigate(['/auth/login']);
              this.toastr.info(
                'Your session has expired and you have been logged out'
              );
            }
          }
          return throwError(err);
        })
      );
    } else {
      return next.handle(req).pipe(
        map((event: HttpEvent<any>) => {
          return event;
        }),
        catchError((err: HttpErrorResponse) => {
          if (err.status == 401) {
            if (this.router.url !== '/auth/login') {
            //   this.authService.logout();
            //   this.router.navigate(['/auth/login']);
            //   this.toastr.info(
            //     'Your session has expired and you have been logged out'
            //   );
            }
          }
          return throwError(err);
        })
      );
    }
  }
}
