import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationFieldComponent } from './destination-field.component';

describe('DestinationFieldComponent', () => {
  let component: DestinationFieldComponent;
  let fixture: ComponentFixture<DestinationFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinationFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestinationFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
