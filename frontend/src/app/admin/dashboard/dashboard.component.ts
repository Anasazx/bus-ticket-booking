import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  stats = [
    { value: '24', label: 'Active Trips', icon: 'bi-signpost-split', color: 'bg-primary' },
    { value: '18', label: 'Available Buses', icon: 'bi-bus-front', color: 'bg-success' },
    { value: '32', label: 'Scheduled Routes', icon: 'bi-calendar-week', color: 'bg-info' },
    { value: '12', label: 'Registered Drivers', icon: 'bi-people', color: 'bg-warning' }
  ];

  recentTrips = [
    { id: 'TN2024001', route: 'Tunis → Sousse', departure: '2024-06-15', status: 'Active' },
    { id: 'TN2024002', route: 'Tunis → Djerba', departure: '2024-06-16', status: 'Active' },
    { id: 'TN2024003', route: 'Sfax → Tozeur', departure: '2024-06-17', status: 'Completed' }
  ];
}