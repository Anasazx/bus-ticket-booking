import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  // Those will be variables in the future

  readonly departureCities = ['Medenine']; 
  readonly destinationCities = ['Tunis', 'Sousse', 'Sfax', 'Gabes', 'Kairouan', 'Sidi Bouzid', 'Mahdia'];

  constructor() {}

  formatDate(date: Date | string): string {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }


  
}