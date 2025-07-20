import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public _AuthService: AuthService){

  }



  onToggle() {
    this.toggle.emit();
  }

  userName = "";

  ngOnInit() {
    // this._AuthService.name$.subscribe(name => {
    //   this.userName = name;
    // });

    this._AuthService.fullName$.subscribe(fullName => {
        this.userName = fullName
    });

  }



  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
  @Input() isCollapsed: boolean = false;
  @Output() toggle = new EventEmitter<void>();

  emitToggle() {
    this.toggle.emit();
  }

  logout() {
    this._AuthService.logout();
  }
}