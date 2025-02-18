import { Component, inject } from '@angular/core';
import { MapCountriesComponent } from '../components/map-countries/map-countries.component';
import { CountryService } from '../../services/country.service';
import { finalize, Observable } from 'rxjs';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ICountry } from '../../models/country.model';
import { CdkDropList,CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop'

@Component({
  selector: 'app-list-countries',
  imports: [MapCountriesComponent, AsyncPipe , FormsModule
    , CdkDropList,CdkDrag , NgTemplateOutlet],
  templateUrl: './list-countries.component.html',
  styleUrl: './list-countries.component.scss'
})
export class ListCountriesComponent {

private countryService = inject(CountryService)
public listCountries : ICountry[] = []
public listCountriesToVisit : ICountry[] = []

public subregion$ : Observable<string[]> = this.countryService.getAllSubregions()
public subregionSelected = 'South America'
public loadCountries = true
public markers :google.maps.LatLngLiteral[] = []


ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.filterCountries()
}

filterCountries() {
  this.loadCountries = false
  console.log(this.subregionSelected);
  this.countryService.getCountriesBySubregion(this.subregionSelected)
  .pipe(
    finalize( () => this.loadCountries = true)
  ).subscribe({
    next : ( countries : ICountry[]) => {
      this.listCountries = countries
      .filter(country => !this.listCountriesToVisit.some
        (countryVisit => country.name == countryVisit.name))
        console.log(this.listCountries)
    }
  })
}


drop(event : CdkDragDrop<ICountry[]>){
  if(event.previousContainer === event.container){

    moveItemInArray(event.container.data , event.previousIndex ,event.currentIndex)

  }else{
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    )
    if(event.previousContainer.id == 'Icountries' && event.container.id =='IcountriesToVisit'){

      console.log(this.listCountriesToVisit)
      this.markers.push({

        lat : this.listCountriesToVisit[event.currentIndex].latlng[0],
        lng : this.listCountriesToVisit[event.currentIndex].latlng[1]
      })
    }else if(event.previousContainer.id == 'IcountriesToVisit' && event.container.id =='Icountries'){

      const indexMarker = this.markers.findIndex( marker =>
        marker.lat == this.listCountries[event.currentIndex].latlng[0]
        && marker.lng == this.listCountries[event.currentIndex].latlng[1]
      );
      this.markers.splice(indexMarker, 1)

    }
  }
}
}



