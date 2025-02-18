import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { first, map } from 'rxjs';
import { ICountry } from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private httpCLient = inject(HttpClient)

  constructor() { }

  private URL_BASE = 'https://restcountries.com/v3.1'
  private http = inject(HttpClient);

  getCountriesBySubregion(subregion: string){
    return this.http.get<any[]>(`${this.URL_BASE}/subregion/${subregion}`).pipe(
      first(),
      map( (countries: any[]) => countries.map( country => {
        return {
          name: country.name.common,
          flag: country.flags.png,
          latlng: country.latlng
        } as ICountry
      }))
    )
  }


  getAllSubregions(){
    return this.http.get<string[]>('/data/subregions.json').pipe(first())
  }

}


