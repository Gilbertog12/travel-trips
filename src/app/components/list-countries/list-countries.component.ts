import { Component } from '@angular/core';
import { MapCountriesComponent } from '../components/map-countries/map-countries.component';

@Component({
  selector: 'app-list-countries',
  imports: [MapCountriesComponent],
  templateUrl: './list-countries.component.html',
  styleUrl: './list-countries.component.scss'
})
export class ListCountriesComponent {

}
