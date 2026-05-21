import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TravelService } from '../../services/travel.service';
import { SharedService } from '../../services/shared.service';
import { Travel } from '../../models/travel.model';

@Component({
  selector: 'app-add-travel',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-travel.component.html'
})
export class AddTravelComponent {
  travelForm!: FormGroup;
  departureCities!: string[];
  destinationCities!: string[];
  statusOptions = ['Scheduled', 'Delayed', 'Cancelled'];
  today = new Date().toISOString().split('T')[0];
  selectedAmenities: string[] = [];

  constructor(private fb: FormBuilder, public _TravelService: TravelService, public _sharedService: SharedService) {
    this.departureCities = this._sharedService.departureCities;
    this.destinationCities = this._sharedService.destinationCities;

    this.travelForm = this.fb.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      departureDate: ['', Validators.required],
      departureTime: ['', Validators.required],
      arrivalTime: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      seatsAvailable: [1, [Validators.required, Validators.min(1)]],
      busType: ['', Validators.required],
      numberOfSeats: [16, Validators.required],
      amenities: [[]],
      status: ['Scheduled', Validators.required],
      description: ['']
    });
  }

  validateDates() {
    const selectedDate = new Date(this.travelForm.get('departureDate')?.value);
    const todayDate = new Date(this.today);

    if (selectedDate < todayDate) {
      alert('Departure date cannot be in the past.');
      this.travelForm.get('departureDate')?.setValue('');
    }
  }

  onAmenityChange(event: any) {
    const amenity = event.target.value;
    if (event.target.checked) {
      this.selectedAmenities.push(amenity);
    } else {
      this.selectedAmenities = this.selectedAmenities.filter(a => a !== amenity);
    }
    this.travelForm.get('amenities')?.setValue(this.selectedAmenities);
  }

  onSubmit() {
    if (this.travelForm.valid) {
      const travel: Travel = {
        date: this.travelForm.get('departureDate')?.value,
        departure: this.travelForm.get('from')?.value,
        destination: this.travelForm.get('to')?.value,
        departureTime: this.travelForm.get('departureTime')?.value,
        price: this.travelForm.get('price')?.value,
        seatsAvailable: this.travelForm.get('seatsAvailable')?.value,
        busType: this.travelForm.get('busType')?.value,
        numberOfSeats: this.travelForm.get('numberOfSeats')?.value,
        amenities: this.travelForm.get('amenities')?.value || [],
        description: this.travelForm.get('description')?.value || '',
      };

      console.log('Ready to submit travel:', travel);

      // Send to server
      this._TravelService.addTravel(travel).subscribe({
        next: (response) => {
          console.log('Travel added successfully', response);
          window.alert('Travel added successfully! ✅');
          this.travelForm.reset();

        },
        error: (error) => {
          console.error('Error adding travel', error);
          window.alert('failed to add Travel');
        }
      });

    } else {
      alert('Please fill all required fields!');
    }
  }
}
