import { Component } from '@angular/core';
import { HeroComponent } from "./hero/hero.component";
import { InformationsComponent } from "./informations/informations.component";
import { FeaturesComponent } from "./features/features.component";
import { FaqComponent } from "./faq/faq.component";

@Component({
  selector: 'app-home',
  imports: [HeroComponent, InformationsComponent, FeaturesComponent, FaqComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
