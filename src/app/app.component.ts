import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListCountriesComponent } from './components/list-countries/list-countries.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ListCountriesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dreams-trips';
}
