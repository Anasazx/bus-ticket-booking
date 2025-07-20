import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, Router, RouterModule, ActivatedRoute } from '@angular/router';
import { TravelService, Travel } from '../../services/travel.service';
import { SelectionService } from '../../services/selection.service';

@Component({
  selector: 'app-available-bus-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './available-bus-menu.component.html',
  styleUrls: ['./available-bus-menu.component.css']
})


export class AvailableBusMenuComponent implements OnInit {
  travels: Travel[] = [];
  selectedTravel: Travel | null = null;
  showDetailsModal = false;

  constructor(
    private travelService: TravelService,
    private selectionService: SelectionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const departure = this.route.snapshot.paramMap.get('departure');
    const destination = this.route.snapshot.paramMap.get('destination');

    if (departure && destination) {
      this.travelService.getTravelByDepartureDestination(departure, destination).subscribe(travels => {
        this.travels = travels;
      });
    } else {
      console.warn('No valid departure or destination found in selection.');
    }
  }

  showTravelDetails(travel: Travel): void {
    this.selectedTravel = travel;
    this.showDetailsModal = true;
  }

  closeModal(): void {
    this.showDetailsModal = false;
  }

  bookTravel(travel: Travel): void {
    this.selectionService.setSelectedTravel(travel);
    this.router.navigate(['/booking/confirmBooking', travel._id]);
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}