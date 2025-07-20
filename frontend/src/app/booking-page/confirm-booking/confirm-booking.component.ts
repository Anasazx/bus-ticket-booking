import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TravelService, Travel } from '../../services/travel.service';
import { AuthService } from '../../services/auth.service';
import { TicketService, Ticket } from '../../services/ticket.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-confirm-booking',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './confirm-booking.component.html',
  styleUrl: './confirm-booking.component.css'
})
export class ConfirmBookingComponent implements OnInit {
  travelInfo!: Travel;
  passengerName = '';
  paymentMethod = 'credit';
  seatsNumber = 1;
  totalPrice = 0;
  maxSeats = 0;

  isProcessing = false;
  showConfirmation = true;
  purchaseSuccess = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public _TravelService: TravelService,
    public _AuthService: AuthService,
    public _TickeService: TicketService, 
    public _UserService: UserService
  ) {
    // Pre-fill passenger name if user is logged in
    // this._AuthService.name$.subscribe(name => {
    //   this.passengerName = name;
    // });

    this._AuthService.firstname$.subscribe(firstname => {
      this._AuthService.firstname$.subscribe(lastname => {
        this.passengerName = firstname+' '+lastname;
      });
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (!idParam) {
      console.error('Travel ID parameter is missing');
      return;
    }


    this._TravelService.getTravelById(idParam)?.subscribe({
      next: (travel) => {
        if (!travel) {
          console.error('No travel found for ID:', idParam);
          return;
        }

        this.travelInfo = { ...travel };
        this.maxSeats = travel.seatsAvailable;
        this.totalPrice = this.seatsNumber * this.travelInfo.price;
      },
      error: (err) => {
        console.error('Failed to fetch travel:', err);
      }
    });

    
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getUserId(): string {
    return this._UserService.getUserId() ?? '';
  }





  processPurchase(): void {
    if (!this.passengerName.trim()) {
      alert('Please enter passenger name');
      return;
    }

    if (!this.travelInfo || !this.travelInfo._id) {
      alert('Invalid travel information');
      return;
    }

    this.isProcessing = true;

    const ticket: Ticket = {
      travelId: String(this.travelInfo._id),
      ownerId: this.getUserId(),
      nameOnTicket: this.passengerName,
      isCancelled: false,
      createdAt: new Date().toISOString()
    };

    this._TickeService.addTicket(ticket).subscribe({
      next: (createdTicket) => {

        this.isProcessing = false;
        this.purchaseSuccess = true;

        // Redirect to purchased ticket
        this.router.navigate(['/purchasedTicket', createdTicket._id]);
      },
      error: (err) => {
        this.isProcessing = false;
        alert('Failed to book ticket: ' + err.message);
      }
    });
  }
}