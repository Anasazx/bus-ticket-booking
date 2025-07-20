import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent {
  // Tunisian cities and lines
  cities = [
    { id: 1, name: 'Tunis' },
    { id: 2, name: 'Sfax' },
    { id: 3, name: 'Sousse' },
    { id: 4, name: 'Kairouan' },
    { id: 5, name: 'Bizerte' },
    { id: 6, name: 'Gabès' },
    { id: 7, name: 'Ariana' },
    { id: 8, name: 'Gafsa' }
  ];

  lines = [
    { id: 1, name: 'Ligne 101', from: 'Tunis', to: 'Sousse', type: 'Intercity' },
    { id: 2, name: 'Ligne 201', from: 'Tunis', to: 'Sfax', type: 'Intercity' },
    { id: 3, name: 'Ligne 301', from: 'Sousse', to: 'Kairouan', type: 'Regional' },
    { id: 4, name: 'Ligne 401', from: 'Tunis', to: 'Bizerte', type: 'Regional' },
    { id: 5, name: 'Ligne 501', from: 'Sfax', to: 'Gabès', type: 'Intercity' }
  ];

  // Sample schedule data for Tunisian buses
  schedules = [
    {
      id: 1,
      line: 'Ligne 101',
      from: 'Tunis',
      to: 'Sousse',
      departure: '06:00',
      arrival: '08:30',
      frequency: 'Every 30 minutes',
      price: '7.500 DT',
      stops: ['Ariana', 'La Soukra', 'Hammamet', 'Enfidha']
    },
    {
      id: 2,
      line: 'Ligne 201',
      from: 'Tunis',
      to: 'Sfax',
      departure: '05:30',
      arrival: '10:00',
      frequency: 'Every hour',
      price: '12.000 DT',
      stops: ['Mohamedia', 'Sousse', 'Mahdia', 'El Jem']
    },
    {
      id: 3,
      line: 'Ligne 301',
      from: 'Sousse',
      to: 'Kairouan',
      departure: '07:00',
      arrival: '08:15',
      frequency: 'Every 45 minutes',
      price: '4.000 DT',
      stops: ['Msaken', 'Sidi Bou Ali']
    },
    {
      id: 4,
      line: 'Ligne 401',
      from: 'Tunis',
      to: 'Bizerte',
      departure: '06:15',
      arrival: '07:30',
      frequency: 'Every 20 minutes',
      price: '5.000 DT',
      stops: ['Menzel Bourguiba']
    },
    {
      id: 5,
      line: 'Ligne 501',
      from: 'Sfax',
      to: 'Gabès',
      departure: '08:00',
      arrival: '09:30',
      frequency: 'Every hour',
      price: '6.000 DT',
      stops: ['Skhira']
    }
  ];

  selectedCity: string = '';
  selectedLine: string = '';
  filteredSchedules: any[] = this.schedules;
  selectedSchedule: any = null;

  filterSchedules() {
    this.filteredSchedules = this.schedules.filter(schedule => {
      const cityMatch = !this.selectedCity || 
                       schedule.from === this.selectedCity || 
                       schedule.to === this.selectedCity;
      const lineMatch = !this.selectedLine || 
                        schedule.line === this.selectedLine;
      return cityMatch && lineMatch;
    });
  }

  showScheduleDetails(schedule: any) {
    this.selectedSchedule = schedule;
  }

  clearSelection() {
    this.selectedSchedule = null;
  }
}