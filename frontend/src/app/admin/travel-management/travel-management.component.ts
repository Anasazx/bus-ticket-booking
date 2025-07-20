import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TravelService, Travel } from '../../services/travel.service';
// import { SharedService } from '../../shared.service';
// import { Travel } from '../../shared.service';



@Component({
  selector: 'app-travel-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './travel-management.component.html',
  styleUrls: ['./travel-management.component.css']
})
export class TravelManagementComponent {

  constructor(public _TravelService: TravelService) {}

  travels: Travel[] = [];

  ngOnInit() {
    this._TravelService.getAllTravels().subscribe((data: any[]) => {
      this.travels = data.map(travel => ({
        id: travel.id,
        from: travel.departure,
        to: travel.destination,
        departure: travel.departure,
        // status: travel.status,
        date: travel.date,
        destination: travel.destination,
        departureTime: travel.departureTime,
        arrivalTime: travel.arrivalTime,
        price: travel.price,
        seatsAvailable: travel.seatsAvailable,
        busType: travel.busType,
        operator: travel.operator,
        route: travel.route,
        busRows: travel.busRows || 0, // Default value if not provided
        numberOfSeats: travel.numberOfSeats || 0, // Default value if not provided
        amenities: travel.amenities || [], // Default value if not provided
        description: travel.description || '', // Default value if not provided
        busNumber: travel.busNumber || '', // Add missing property with default
        duration: travel.duration || '' // Add missing property with default
      }));
    });
  }

  searchTerm: string = '';
  statusFilter: string = 'all';


  applyFilter(){
    console.log("filter work!");
  }



  // get filteredTravels(): Travel[] {
  //   const searchTerm = (this.searchTerm || '').toLowerCase();
  
  //   return this.travels.filter(travel => {
  //     if (!travel) {
  //       console.warn("Skipping undefined or null travel:", travel);
  //       return false; // Skip if the travel object is null or undefined
  //     }
  
  //     const idStr = travel.id ? String(travel.id).toLowerCase() : ''; // Convert to string if not null
  //     const destinationStr = travel.destination ? String(travel.destination).toLowerCase() : ''; // Convert to string if not null
  
  //     // Log values to identify the problematic one
  //     console.log("Checking travel:", { idStr, destinationStr });
  
  //     const matchesSearch = idStr.includes(searchTerm) || destinationStr.includes(searchTerm);
  //     const matchesStatus = this.statusFilter === 'all' || travel.status === this.statusFilter;
  
  //     return matchesSearch && matchesStatus;
  //   });
  // }
  
  
  
  trackById(index: number, travel: Travel): string | undefined {
    return travel._id; // or another unique identifier
  }
  
  

  viewTravel(travel: Travel): void {
    console.log('Viewing travel:', travel);
    // Implement actual view logic
  }

  editTravel(travel: Travel): void {
    console.log('Editing travel:', travel);
    // Implement actual edit logic
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'confirmed': return 'bg-success bg-opacity-10 text-success';
      case 'pending': return 'bg-warning bg-opacity-10 text-warning';
      case 'cancelled': return 'bg-danger bg-opacity-10 text-danger';
      default: return 'bg-secondary bg-opacity-10 text-secondary';
    }
  }

  formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }
}
