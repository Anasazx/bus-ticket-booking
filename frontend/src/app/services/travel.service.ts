import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Travel } from '../models/travel.model';



@Injectable({
  providedIn: 'root'
})
export class TravelService {

  private readonly baseUrl = 'http://127.0.0.1:3000/travel';

  // Reactive list of travels
  private travelsSubject = new BehaviorSubject<Travel[]>([]);
  travels$ = this.travelsSubject.asObservable();

  constructor(private http: HttpClient) {}

  /** POST: Add a new travel */
  addTravel(travel: Travel): Observable<any> {
    return this.http.post(`${this.baseUrl}/addTravel`, travel);
  }

  /** GET: Fetch all travels */
  getAllTravels(): Observable<Travel[]> {
    return this.http.get<Travel[]>(`${this.baseUrl}/getAll`).pipe(
      tap(travels => this.travelsSubject.next(travels))
    );
  }

  /** POST: Fetch travels by departure and destination */
  getTravelByDepartureDestination(dep: string, dest: string): Observable<Travel[]> {
    return this.http.post<Travel[]>(`${this.baseUrl}/getTravelByRoute`, {
      departure: dep,
      destination: dest
    }).pipe(
      tap(travels => this.travelsSubject.next(travels))
    );
  }

  /** GET: Get a single travel by ID */
  getTravelById(id: string): Observable<Travel> {
    return this.http.get<Travel>(`${this.baseUrl}/getTravelById/${id}`);
  }

  /** PUT: Update seats after booking */
  updateTravelSeats(id: string, numberOfPurchasedSeats: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateTravelSeats`, {
      id,
      numberOfPurchasedSeats
    });
  }

  /** Duration calculator (can move to utility if reused elsewhere) */
  calculateDuration(departure: string, arrival: string): string {
    const dep = new Date(`2000-01-01T${departure}`);
    const arr = new Date(`2000-01-01T${arrival}`);
    const diff = arr.getTime() - dep.getTime();

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours === 0) return `${minutes} minutes`;
    if (minutes === 0) return `${hours} hours`;
    return `${hours}h ${minutes}m`;
  }

  /** Reset the travels list */
  clearTravels(): void {
    this.travelsSubject.next([]);
  }
}