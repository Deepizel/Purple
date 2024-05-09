import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvVariable } from 'src/assets/domain';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private server = EnvVariable;
  baseUrl = `${this.server.baseUrl}`;
  constructor(private http: HttpClient) {}

  getUsers(page: number, perPage: number): Observable<any> {
    const url = `${this.baseUrl}users?page=${page}&per_page=${perPage}`;
    return this.http.get<any>(url);
  }

  updateUser(id: number, userData: any): Observable<any> {
    const url = `${this.baseUrl}users/${id}`;
    return this.http.put<any>(url, userData);
  }

  getUserById(id: number): Observable<any> {
    const url = `${this.baseUrl}users/${id}`;
    return this.http.get<any>(url);
  }

  deleteUserById(id: number): Observable<any> {
    const url = `${this.baseUrl}${id}`;
    return this.http.delete(url);
  }
}
