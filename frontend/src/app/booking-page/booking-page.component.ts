import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-booking-page',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './booking-page.component.html',
  styleUrl: './booking-page.component.css'
})


export class BookingPageComponent {

  


  selectedSeats: string[] = [];
  bookingTotal: number = 0;


  onSeatsSelected(selection: {seats: string[], total: number}) {
    console.log('Current selection:', selection);
  }
  
  onPurchaseComplete(purchase: {seats: string[], total: number, reference: string}) {
    console.log('Purchase completed:', purchase);
    // Save to database, navigate to receipt, etc.
  }



}


