import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
// import { SharedService } from '../shared.service';

@Component({
  selector: 'app-profile-dropdown',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile-dropdown.component.html',
  styleUrls: ['./profile-dropdown.component.css']
})
export class ProfileDropdownComponent implements OnInit {

  isOpen = false;
  userName = "";

  constructor(public _AuthService: AuthService) {
    this._AuthService.fullName$.subscribe(fullname => {
      console.log("name:", fullname);
      
        this.userName = fullname
    });
  }
  

  ngOnInit(): void {

  }


  
  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.profile-dropdown')) {
      this.isOpen = false;
    }
  }

  logout() {
    this._AuthService.logout();
  }

  
}
