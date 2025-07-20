import { Injectable } from '@angular/core';
import { Travel } from '../models/travel.model';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {
  private departure = '';
  private destination = '';
  private date: Date | null = null;
  private selectedTravel: Travel | null = null;

  setSelection(selection: { departure: string; destination: string; date: Date }) {
    this.departure = selection.departure;
    this.destination = selection.destination;
    this.date = selection.date;
  }

  getSelection() {
    return {
      departure: this.departure,
      destination: this.destination,
      date: this.date,
    };
  }

  setSelectedTravel(travel: Travel) {
    this.selectedTravel = travel;
  }

  getSelectedTravel(): Travel | null {
    return this.selectedTravel;
  }

  clear() {
    this.departure = '';
    this.destination = '';
    this.date = null;
    this.selectedTravel = null;
  }
}