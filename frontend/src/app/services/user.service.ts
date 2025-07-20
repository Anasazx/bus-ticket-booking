import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  private url = 'http://127.0.0.1:3000/user';

  getCurrentUser(): Observable<User> {
    const userId = localStorage.getItem('id');
    return this.http.get<User>(`${this.url}/getbyid/${userId}`);
  }

  updateUserProfile(userId: string, formData: FormData): Observable<User> {
    return this.http.put<User>(`${this.url}/update/${userId}`, formData);
  }

  getUserId(): string | null {
    return localStorage.getItem('id');
  }
}