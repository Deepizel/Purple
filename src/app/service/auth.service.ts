import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvVariable } from 'src/assets/domain';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
 

  constructor(
    private router: Router,
    private http: HttpClient,
    private notify: ToastrService
  ) {}
  private server = EnvVariable;
  baseUrl = `${this.server.baseUrl}`;
  login(loginDto: any): Observable<any> {
    const apiUrl = `${this.baseUrl}login`;

    return this.http.post<any>(apiUrl, loginDto).pipe(
      map((response: any) => {
        // To Check if the response contains a token
        if (response && response.token) {
          // System should Return the token
          return response.token;
        }
        // If token is not present in the response, we should handle accordingly (throw error, etc.)
        throw new Error('Invalid response format');
      })
    );
  }

  registerUser(userData: any): Observable<any> {
    const apiUrl = `${this.baseUrl}/register`;
    return this.http.post<any>(apiUrl, userData);
  }
  
  setCredentials(user: any) {
    console.log('setCredentials', user);
   
    if (user) {
      this.loggedIn.next(true);
    

      // Store user details in local storage
      // localStorage.setItem('accessToken', user.accessToken);
      
      localStorage.setItem('userData', JSON.stringify(user));
    }
  }

  getUserCredentials(): any {
    const userDataString = localStorage.getItem('userData');
    return userDataString ? JSON.parse(userDataString) : null;
  }

  logout() {
    // console.log('Logout method called');
    localStorage.removeItem('userData');
    this.notify.success('Logged out Successfully');
    this.loggedIn.next(false);
   
    this.router.navigate(['/auth']);
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

 

  // Additional methods for auth guard
  isLoggedInValue(): boolean {
    return this.loggedIn.value;
  }

 
}
