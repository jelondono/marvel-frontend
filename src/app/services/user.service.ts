import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Environments } from '../utils/environments';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${Environments.API_BASE_URL}/users`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getFavorites(): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/favorites`, { headers });
  }

  addFavorite(comicId: string, title: string, thumbnail: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/favorites`, { comicId, title, thumbnail }, { headers });
  }

  removeFavorite(comicId: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiUrl}/favorites`, { headers, body: { comicId } });
  }
}
