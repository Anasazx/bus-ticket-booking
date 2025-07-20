import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
// import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private _AuthService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    const isAdmin = this._AuthService.isAdminUser();

    if (token && isAdmin) {
      return true;
    }

    // Redirect to login or home if not authorized
    this.router.navigate(['/']);
    return false;
  }
}
