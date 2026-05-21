import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TicketService } from '../services/ticket.service';
import { TravelService } from '../services/travel.service';
import { SharedService } from '../services/shared.service';
import { ActivatedRoute } from '@angular/router';
import { Travel } from '../models/travel.model';
import { Ticket } from '../models/ticket.model';


@Component({
  selector: 'app-purchased-ticket',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './purchased-ticket.component.html',
  styleUrl: './purchased-ticket.component.css'
})
export class PurchasedTicketComponent implements OnInit {
  ticket: Ticket | null = null;
  isLoading: boolean = true;
  error: string | null = null;
  userId: string = '';
  travelInfo!: Travel;
  choosenName: string | null = null;

  ticketId: string | null = null;


  constructor(
    private _TicketService: TicketService,
    private router: Router,
    public _TravelService: TravelService,
    public _sharedService: SharedService,
    private route: ActivatedRoute

  ) {}
 
ngOnInit(): void {
  this.ticketId = this.route.snapshot.paramMap.get('id');

  if (this.ticketId) {
    this._TicketService.getTicketById(this.ticketId).subscribe({
      next: (ticket) => {
        this.ticket = ticket;

        this._TravelService.getTravelById(ticket.travelId).subscribe((travel) => {
          if (travel) {
            this.travelInfo = {
              _id: travel._id,
              departure: travel.departure,
              destination: travel.destination,
              date: travel.date,
              departureTime: travel.departureTime,
              busType: travel.busType,
              price: travel.price,
              seatsAvailable: travel.seatsAvailable ?? 0,
              numberOfSeats: travel.numberOfSeats ?? 0,
              amenities: travel.amenities ?? [],
              description: travel.description ?? ''
            };
          } else {
            console.warn('Travel info not found for travelId:', ticket.travelId);
          }
        });

        



        this.choosenName = ticket.nameOnTicket;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Could not fetch ticket.';
        console.error('Error fetching ticket:', err);
        this.isLoading = false;
      }
    });
  } else {
    this.error = 'No ticket ID found in the URL.';
    this.isLoading = false;
  }
}

    
  


  loadMostRecentTicket(): void {
    this.isLoading = true;
    this.error = null;
    
    if (this.userId) {
      this._TicketService.getUserTickets(this.userId).subscribe({
        next: (tickets) => {
          // You can modify this to pick the ticket you want (e.g., newest)
          this.ticket = tickets.length > 0 ? tickets[0] : null;
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'Failed to load the ticket. Please try again later.';
          this.isLoading = false;
          console.error('Error loading ticket:', err);
        }
      });
    } else {
      this.error = 'User ID is missing. Unable to load the ticket.';
      this.isLoading = false;
    }
  }

  viewTicketDetails(ticketId: string): void {
    this.router.navigate(['/tickets', ticketId]);
  }











}
