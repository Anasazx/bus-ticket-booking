import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TicketService } from '../services/ticket.service';
import { LoadingComponent } from "../loading/loading.component";
import { TravelService  } from '../services/travel.service';
import { forkJoin, map } from 'rxjs';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ticketInfo } from '../models/ticketInfo.model';
import { Ticket } from '../models/ticket.model';


  

@Component({
  selector: 'app-owned-tickets',
  standalone: true,
  templateUrl: './owned-tickets.component.html',
  styleUrls: ['./owned-tickets.component.css'],
  imports: [CommonModule, RouterLink, LoadingComponent]
})



export class OwnedTicketsComponent implements OnInit {
  tickets: Ticket[] = [];

  ticketsInfo: ticketInfo[] = [];


  isLoading = true;
  error: string | null = null;
  filters: ('upcoming' | 'past' | 'cancelled' | 'all')[] = ['upcoming', 'past', 'cancelled', 'all'];
  currentFilter: 'upcoming' | 'past' | 'cancelled' | 'all' = 'upcoming';
  userId = '';

  constructor(
    private ticketService: TicketService,
    private travelService: TravelService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('id') || '';
    
    this.loadTickets();
  }

  loadTickets(): void {
    this.isLoading = true;
    this.error = null;

    if (!this.userId) {
      this.error = 'User ID is missing. Unable to load tickets.';
      return;
    }
    this.ticketService.getUserTickets(this.userId).subscribe({
      next: (tickets) => {
        this.tickets = tickets;
        this.getTicketInfo(tickets); 
      },
      error: (err) => {
        this.error = 'Failed to load tickets. Please try again later.';
        console.error('Error loading tickets:', err);
      }
    });

  }

  setFilter(filter: 'upcoming' | 'past' | 'cancelled' | 'all'): void {
    this.currentFilter = filter;
  }

  viewTicketDetails(ticketId: string): void {
    this.router.navigate(['/tickets', ticketId]);
  }

  private getDepartureDate(ticket: Ticket): Date {
    return new Date((ticket as any).date ?? ticket.createdAt ?? new Date());
  }

  get filteredTickets(): ticketInfo[] {
    const now = new Date();

    return this.ticketsInfo.filter(ticket => {
      if (ticket.isCancelled) {
        return this.currentFilter === 'cancelled';
      }

      const datePart = ticket.date.split('T')[0];
      const departureDateTime = new Date(`${datePart}T${ticket.departureTime}`);

      if (isNaN(departureDateTime.getTime())) {
        console.warn(`Invalid date/time for ticket id ${ticket.id}:`, ticket.date, ticket.departureTime);
        return this.currentFilter === 'all'; // or false to skip invalid entries
      }

      switch (this.currentFilter) {
        case 'upcoming':
          return departureDateTime > now;
        case 'past':
          return departureDateTime <= now;
        case 'all':
          return true;
        default:
          return false;
      }
    });
  }

  getTicketInfo(tickets: Ticket[]) {

    if (!tickets || tickets.length === 0) {
      this.ticketsInfo = [];
      this.isLoading = false;
      return;
    }
    
    const requests = tickets.map(ticket =>
      this.travelService.getTravelById(ticket.travelId).pipe(
        map((travel: any) => ({
          id: ticket._id ?? '',
          date: travel.date,
          departure: travel.departure,
          destination: travel.destination,
          departureTime: travel.departureTime,
          price: travel.price,
          nameOnTicket: ticket.nameOnTicket,
          isCancelled: ticket.isCancelled
        }))
      )
    );

    forkJoin(requests).subscribe({
      next: (infoArray) => {
        this.ticketsInfo = infoArray;
        this.isLoading = false; // ✅ move it here
      },
      error: (err) => {
        this.error = 'Failed to load ticket details.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  isUpcoming(date: string, departureTime: string): boolean {
    const ticketDateTime = new Date(`${date.split('T')[0]}T${departureTime}`);
    return ticketDateTime > new Date();
  }


  cancelTicket(ticketId: string) {
    this.ticketService.cancelTicket(ticketId).subscribe({
      next: (updatedTicket) => {
        console.log('Ticket cancelled:', updatedTicket);
        this.loadTickets(); // refresh tickets after cancellation
      },
      error: (error) => {
        console.error('Failed to cancel ticket:', error);
      }
    });
  }






  /////// for the model

  showCancelConfirm = false;
  ticketIdToCancel: string | null = null;

  // When clicking "Cancel Ticket" button
  openCancelConfirm(ticketId: string) {
    this.ticketIdToCancel = ticketId;
    this.showCancelConfirm = true;
  }

  // When clicking "No, Keep Ticket"
  closeCancelConfirm() {
    this.ticketIdToCancel = null;
    this.showCancelConfirm = false;
  }

  // When clicking "Yes, Cancel"
  confirmCancel() {
    if (!this.ticketIdToCancel) return;

    this.ticketService.cancelTicket(this.ticketIdToCancel).subscribe({
      next: updatedTicket => {
        console.log('Ticket cancelled:', updatedTicket);
        this.loadTickets(); // refresh tickets after cancellation
        this.closeCancelConfirm();
      },
      error: error => {
        console.error('Failed to cancel ticket:', error);
        this.closeCancelConfirm();
      }
    });
  }

  //////




/// for download ticket as pdf



downloadTicket(ticket: ticketInfo) {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('Bus Ticket', 14, 22);

  doc.setFontSize(12);
  doc.text(`Ticket ID: ${ticket.id}`, 14, 32);
  doc.text(`Name on Ticket: ${ticket.nameOnTicket}`, 14, 40);
  doc.text(`Departure: ${ticket.departure}`, 14, 48);
  doc.text(`Destination: ${ticket.destination}`, 14, 56);
  doc.text(`Date: ${ticket.date}`, 14, 64);
  doc.text(`Departure Time: ${ticket.departureTime}`, 14, 72);
  doc.text(`Price: TND ${ticket.price}`, 14, 80);
  doc.text(`Status: ${ticket.isCancelled ? 'Cancelled' : 'Active'}`, 14, 88);

  // Optional: Add table
  autoTable(doc, {
    startY: 100,
    head: [['Field', 'Value']],
    body: [
      ['Ticket ID', ticket.id],
      ['Departure', ticket.departure],
      ['Destination', ticket.destination],
      ['Date', ticket.date],
      ['Time', ticket.departureTime],
      ['Price', `TND ${ticket.price}`],
      ['Status', ticket.isCancelled ? 'Cancelled' : 'Active']
    ]
  });

  doc.save(`ticket_${ticket.id}.pdf`);
}
/////




}