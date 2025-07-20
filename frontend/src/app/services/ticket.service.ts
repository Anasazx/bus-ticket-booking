import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket.model';




@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private url = 'http://127.0.0.1:3000/ticket/';

  constructor(private http: HttpClient) {}

  // Create ticket
  addTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(`${this.url}addTicket`, ticket);
  }

  // Get all tickets (for admin or debugging)
  getAllTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.url}getAllTickets`);
  }

  // Get tickets by user (POST)
  getUserTickets(userId: string): Observable<Ticket[]> {
    return this.http.post<Ticket[]>(`${this.url}getTicketsByUser`, { userId });
  }

  // Get tickets by travel (POST)
  getTicketsByTravelId(travelId: string): Observable<Ticket[]> {
    return this.http.post<Ticket[]>(`${this.url}getTicketsByTravel`, { travelId });
  }

  // Get ticket by ID (POST)
  getTicketById(ticketId: string): Observable<Ticket> {
    return this.http.post<Ticket>(`${this.url}getTicketById`, { ticketId });
  }

  // Cancel ticket (PUT)
  cancelTicket(ticketId: string): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.url}cancelTicket`, { ticketId });
  }
}