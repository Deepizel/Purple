import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvVariable } from 'src/assets/domain';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private userType = new BehaviorSubject<string>('');

  

  constructor(
    private router: Router,
    private http: HttpClient,
    // private notify: ToastyService
  ) {}
  private server = EnvVariable;
  baseUrl = `${this.server.baseUrl}User`;
  login(loginDto: any): Observable<any> {
    const apiUrl = `${this.baseUrl}/Users`;
    // const credentials = { userId: userId, password: password };

    return this.http.post<any>(apiUrl, loginDto);
  }

  

  
 
 

  setCredentials(user: any) {
    console.log('setCredentials', user);
    console.log('user.userType', user[0].userType);
    if (user && user[0].userType) {
      this.loggedIn.next(true);
      this.userType.next(user[0].userType);

      // Store user details in local storage
      // localStorage.setItem('accessToken', user.accessToken);
      localStorage.setItem('userType', user[0].userType);
      localStorage.setItem('userData', JSON.stringify(user));
     

      
    }
  }

  getUserCredentials(): any {
    const userDataString = localStorage.getItem('userData');
    return userDataString ? JSON.parse(userDataString) : null;
  }

  logout() {
    // console.log('Logout method called');
    localStorage.removeItem('userType');
    localStorage.removeItem('userData');
    // this.notify.success('Logged out Successfully', 4000);
    this.loggedIn.next(false);
    this.userType.next('');
    this.router.navigate(['/auth']);
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  getUserType() {
    return this.userType.asObservable();
  }

  // Additional methods for auth guard
  isLoggedInValue(): boolean {
    return this.loggedIn.value;
  }

  getUserTypeValue(): string {
    return this.userType.value;
  }
}
