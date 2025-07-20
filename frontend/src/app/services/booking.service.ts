import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private numberOfTickets = 1;
  private totalPrice = 0;
  private passengerName = '';

  setNumberOfTickets(count: number) {
    this.numberOfTickets = count;
  }

  getNumberOfTickets(): number {
    return this.numberOfTickets;
  }

  setTotalPrice(price: number) {
    this.totalPrice = price;
  }

  getTotalPrice(): number {
    return this.totalPrice;
  }

  setPassengerName(name: string) {
    this.passengerName = name;
  }

  getPassengerName(): string {
    return this.passengerName;
  }

  clear() {
    this.numberOfTickets = 1;
    this.totalPrice = 0;
    this.passengerName = '';
  }
}