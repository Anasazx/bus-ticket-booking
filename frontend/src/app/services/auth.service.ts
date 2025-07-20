import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  private url = 'http://127.0.0.1:3000/user';

  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private isAdmin = new BehaviorSubject<boolean>(this.hasAdminRole());
  // private name = new BehaviorSubject<string>(this.hasName());


  private firstname = new BehaviorSubject<string>(this.hasFirstName());
  private lastname = new BehaviorSubject<string>(this.hasLastName());

  loginStatus$ = this.loggedIn.asObservable();
  adminStatus$ = this.isAdmin.asObservable();
  firstname$ = this.firstname.asObservable();
  lastname$ = this.lastname.asObservable();

  fullName$ = combineLatest([this.firstname$, this.lastname$]).pipe(
    map(([firstname, lastname]) => `${firstname} ${lastname}`.trim())
  );


  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  private hasAdminRole(): boolean {
    return localStorage.getItem('role') === 'admin';
  }

  private hasFirstName(): string {
    return localStorage.getItem('firstname') || '';
  }

  private hasLastName(): string {
    return localStorage.getItem('lastname') || '';
  }

  updateLoginStatus(isLoggedIn: boolean) {
    this.loggedIn.next(isLoggedIn);
    this.isAdmin.next(localStorage.getItem('role') === 'admin');
  }

  // updateName(newName: string) {
  //   this.name.next(newName);
  // }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    localStorage.removeItem('firstname');
    localStorage.removeItem('lastname');


    localStorage.removeItem('id');

    this.firstname.next('');
    this.lastname.next('');

    this.updateLoginStatus(false);
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.url}/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.url}/login`, credentials);
  }

  isAdminUser(): boolean {
    const role = localStorage.getItem('role');
    console.log(role === 'admin');
    return role === 'admin';
  }
}