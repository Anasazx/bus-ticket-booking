import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TravelService } from '../../services/travel.service';
import { SelectionService } from '../../services/selection.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-destination-field',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './destination-field.component.html',
  styleUrls: ['./destination-field.component.css']
})
export class DestinationFieldComponent implements OnInit {
  departure = '';
  destination = '';
  date: Date = new Date();
  departureCities: string[] = [];
  destinationCities: string[] = [];

  constructor(
    public travelService: TravelService,
    private selectionService: SelectionService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.departureCities = this.sharedService.departureCities  
    this.destinationCities = this.sharedService.destinationCities
  }

  onSearch(): void {
    if (this.departure && this.destination) {
      this.selectionService.setSelection({
        departure: this.departure,
        destination: this.destination,
        date: this.date
      });
      this.router.navigate(['/booking/available-bus', this.departure, this.destination]);
    } else {
      alert('Please select both departure and destination');
    }
  }

}