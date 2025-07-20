import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { ticketGuard } from './ticket.guard';

describe('ticketGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => ticketGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
