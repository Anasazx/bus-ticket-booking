import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasedTicketComponent } from './purchased-ticket.component';

describe('PurchasedTicketComponent', () => {
  let component: PurchasedTicketComponent;
  let fixture: ComponentFixture<PurchasedTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchasedTicketComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchasedTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
