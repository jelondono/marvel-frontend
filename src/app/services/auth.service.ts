import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Environments } from '../utils/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${Environments.API_BASE_URL}/auth`;

  constructor(private http: HttpClient, private router: Router) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  getUserId(): string {
    return localStorage.getItem('userId') || '';
  }

  getUsername(): string {
    return localStorage.getItem('username') || '';
  }
}
