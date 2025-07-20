import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-routes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})
export class RoutesComponent {
  // Sample route data - replace with your actual routes
  routes = [
    {
      id: 1,
      name: 'TGM Express',
      description: 'Direct route from Tunis to La Marsa',
      stops: ['Tunis Marine', 'Carthage Byrsa', 'Sidi Bou Said', 'La Marsa'],
      schedule: 'Every 20 minutes, 6AM-10PM',
      fare: '3 TND'
    },
    {
      id: 2,
      name: 'University Shuttle',
      description: 'Connects Manouba University with surrounding areas',
      stops: ['Manouba University', 'Manouba Center', 'Tunis Station'],
      schedule: 'Every 30 minutes, 7AM-8PM',
      fare: '1.5 TND'
    },
    {
      id: 3,
      name: 'Airport Express',
      description: 'Express service to Tunis-Carthage International Airport',
      stops: ['Tunis Station', 'Lafayette', 'Airport Terminal'],
      schedule: 'Every 40 minutes, 5AM-12AM',
      fare: '5 TND'
    },
    {
      id: 4,
      name: 'Medina Line',
      description: 'Route connecting Tunis Medina with key suburbs',
      stops: ['Tunis Medina', 'Bab El Khadra', 'El Menzah', 'Ariana'],
      schedule: 'Every 15 minutes, 6AM-9PM',
      fare: '2 TND'
    },
    {
      id: 5,
      name: 'Sousse Express',
      description: 'Direct route from Tunis to Sousse',
      stops: ['Tunis Station', 'Enfidha', 'Sousse Station'],
      schedule: 'Every 2 hours, 6AM-8PM',
      fare: '10 TND'
    },
    {
      id: 6,
      name: 'Bardo Shuttle',
      description: 'Local shuttle connecting Bardo Museum and nearby areas',
      stops: ['Bardo Museum', 'Le Bardo', 'Tunis Station'],
      schedule: 'Every 25 minutes, 8AM-6PM',
      fare: '2 TND'
    }
    // {
    //   id: 7,
    //   name: 'Carthage Line',
    //   description: 'Scenic route through Carthage historical sites',
    //   stops: ['Carthage Hannibal', 'Carthage Byrsa', 'Carthage Amilcar'],
    //   schedule: 'Every 30 minutes, 9AM-5PM',
    //   fare: '4 TND'
    // },
    // {
    //   id: 8,
    //   name: 'La Goulette Ferry Link',
    //   description: 'Route connecting Tunis to La Goulette ferry terminal',
    //   stops: ['Tunis Station', 'La Goulette Port'],
    //   schedule: 'Every 45 minutes, 7AM-9PM',
    //   fare: '3.5 TND'
    // },
    // {
    //   id: 9,
    //   name: 'Zaghouan Express',
    //   description: 'Long-distance route to Zaghouan',
    //   stops: ['Tunis Station', 'Mornag', 'Zaghouan'],
    //   schedule: 'Every 3 hours, 6AM-6PM',
    //   fare: '12 TND'
    // }
  ];

  selectedRoute: any = null;

  showRouteDetails(route: any) {
    this.selectedRoute = route;
  }

  clearSelection() {
    this.selectedRoute = null;
  }
}