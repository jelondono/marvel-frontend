import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {  Comic } from '../models/Comic';
import { Environments } from '../utils/environments';

@Injectable({
  providedIn: 'root'
})
export class ComicService {
  private apiUrl = `${Environments.API_BASE_URL}`;

  constructor(private http: HttpClient) {}

  getComics(): Observable<any> {
    return this.http.get<Comic>(`${this.apiUrl}/comics`).pipe(
      map(response => response)
    );
  }
  getComicById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/comics/${id}`);
  }

}
