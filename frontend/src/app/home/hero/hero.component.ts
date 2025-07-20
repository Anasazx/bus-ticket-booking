import { Component } from '@angular/core';
import { DestinationFieldComponent } from '../destination-field/destination-field.component';

@Component({
  selector: 'app-hero',
  imports: [DestinationFieldComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {

}
