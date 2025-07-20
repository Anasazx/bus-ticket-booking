import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableBusMenuComponent } from './available-bus-menu.component';

describe('AvailableBusMenuComponent', () => {
  let component: AvailableBusMenuComponent;
  let fixture: ComponentFixture<AvailableBusMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailableBusMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailableBusMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
