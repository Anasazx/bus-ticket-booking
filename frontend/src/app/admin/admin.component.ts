import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule, 
    FormsModule, 
    SidebarComponent 
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  // Sidebar state
  isCollapsed = false;
  
  // Travel form model
  newTravel = {
    departureCity: '',
    arrivalCity: '',
    departureTime: '',
    arrivalTime: '',
    busNumber: '',
    price: 0,
    seats: 40,
    date: new Date().toISOString().split('T')[0]
  };

  // Sample existing travels
  travels = [
    {
      id: 1,
      departureCity: 'Tunis',
      arrivalCity: 'Sfax',
      departureTime: '08:00',
      arrivalTime: '11:30',
      busNumber: 'TN-2054',
      price: 25,
      seats: 40,
      date: '2023-12-15'
    },
    // Add more sample data as needed
  ];

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  addTravel() {
    // In a real app, you would call a service here
    const newTravel = {
      id: this.travels.length + 1,
      ...this.newTravel
    };
    this.travels.unshift(newTravel);
    
    // Reset form
    this.newTravel = {
      departureCity: '',
      arrivalCity: '',
      departureTime: '',
      arrivalTime: '',
      busNumber: '',
      price: 0,
      seats: 40,
      date: new Date().toISOString().split('T')[0]
    };
  }

  deleteTravel(id: number) {
    this.travels = this.travels.filter(travel => travel.id !== id);
  }
}