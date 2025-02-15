import { Component, inject } from '@angular/core';
import { MapCountriesComponent } from '../components/map-countries/map-countries.component';
import { CountryService } from '../../services/country.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ICountry } from '../../models/country.model';

@Component({
  selector: 'app-list-countries',
  imports: [MapCountriesComponent, AsyncPipe , FormsModule],
  templateUrl: './list-countries.component.html',
  styleUrl: './list-countries.component.scss'
})
export class ListCountriesComponent {

private countryService = inject(CountryService)
public listCountries : ICountry[] = []
public listCountriesToVisit : ICountry[] = []

public subregion$ : Observable<string[]> = this.countryService.getAllSubregions()
public subregionSelected = 'South America'


ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.filterCountries()
}

filterCountries() {
  console.log(this.subregionSelected);
  this.countryService.getCountriesBySubregion(this.subregionSelected).subscribe({
    next: (countries: ICountry[]) => {
        this.listCountries = countries.filter(country => !this.listCountriesToVisit.some(countryVisit => country.name == countryVisit.name))
        console.log(this.listCountries);

    }
  })
}
}



