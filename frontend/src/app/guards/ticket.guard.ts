import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const ticketGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token'); // or sessionStorage

  if (token) {
    return true;
  } else {
    const router = inject(Router); 
    router.navigate(['/login']);
    return false;
  }
};
