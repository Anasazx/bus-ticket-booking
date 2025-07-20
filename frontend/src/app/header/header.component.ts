import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfileDropdownComponent } from "../profile-dropdown/profile-dropdown.component";
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
// import { SharedService } from '../shared.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, ProfileDropdownComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  isLoggedIn = false;
  isAdmin = false;




  constructor(public _AuthService: AuthService){
    this._AuthService.loginStatus$.subscribe(status => this.isLoggedIn = status);
    this._AuthService.adminStatus$.subscribe(status => this.isAdmin = status);
 
  }
  
  logout() {
    this._AuthService.logout();
    // optionally route to login
  }


  ngOnInit(): void {

    
  }
  
}
