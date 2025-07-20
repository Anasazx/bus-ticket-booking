import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookingPageComponent } from './booking-page/booking-page.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RoutesComponent } from './bus-routes/routes.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './guards/admin.guard';
import { OwnedTicketsComponent } from './owned-tickets/owned-tickets.component';
import { ticketGuard } from './guards/ticket.guard';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { PurchasedTicketComponent } from './purchased-ticket/purchased-ticket.component';

export const routes: Routes = [

    { 
        path: '',
        component: HomeComponent,
        title: 'TunisiaBus - Home' 
    },
    { 
        path: 'booking',
        component: BookingPageComponent,
        title: 'Book Your Trip',
        children: [
            { 
                path: 'available-bus/:departure/:destination', 
                loadComponent: () => import('./booking-page/available-bus-menu/available-bus-menu.component').then(m => m.AvailableBusMenuComponent),
                title: 'Available Bus'
              },
              { 
                path: 'confirmBooking/:id', 
                loadComponent: () => import('./booking-page/confirm-booking/confirm-booking.component').then(m => m.ConfirmBookingComponent),
                title: 'Confirm Booking'
              },

              { path: '', redirectTo: 'available-bus', pathMatch: 'full' },
              { path: '**', redirectTo: 'available-bus', pathMatch: 'full' }

            ]
    },
    { 
        path: 'login', 
        component: LoginComponent,
        title: "TunisiaBus - Login"
    },
    { 
        path: 'signup', 
        component: SignupComponent,
        title: "TunisiaBus - Sign Up" 
    },
    { 
        path: 'routes', 
        component: RoutesComponent,
        title: "TunisiaBus - Routes" 
    },
    { 
        path: 'schedule', 
        component: ScheduleComponent,
        title: "TunisiaBus - schedule" 
    },
    {
      path: 'admin',
      canActivate: [AdminGuard],
      loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent),
      title: 'TunisiaBus - Admin',
      children: [
        {
          path: 'dashboard',
          loadComponent: () => import('./admin/dashboard/dashboard.component').then(m => m.DashboardComponent),
          title: 'Dashboard'
        },
        {
          path: 'addtravel',
          loadComponent: () => import('./admin/add-travel/add-travel.component').then(m => m.AddTravelComponent),
          title: 'Add Travel'
        },
        {
          path: 'travel-management',
          loadComponent: () => import('./admin/travel-management/travel-management.component').then(m => m.TravelManagementComponent),
          title: 'Travel Management'
        },
        {
          path: 'schedule',
          loadComponent: () => import('./admin/schedule/schedule.component').then(m => m.ScheduleComponent),
          title: 'Schedule'
        },
        {
          path: 'reports',
          loadComponent: () => import('./admin/reports/reports.component').then(m => m.ReportsComponent),
          title: 'Reports'
        },
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
      ]
    },
    {
      path: 'ticket',
      component: OwnedTicketsComponent,
      canActivate: [ticketGuard]
      
    },
    {
      path: 'profile',
      component: EditProfileComponent,
      title: "Edit Profile"

    },
    {
      path: 'purchasedTicket/:id',
      component: PurchasedTicketComponent,
      title: "Your Ticket"

    },
    
    
    { 
        path: '**', // 404 page
        redirectTo: ''
    }

    
    
];
