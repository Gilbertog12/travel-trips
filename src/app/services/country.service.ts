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

  private url_Base = 'https://restcountries.com/v3.1'


  getCountriesBySubregion(subregion:string){

    return this.httpCLient.get<any[]>(`${this.url_Base}/subregion/${subregion}`)
    .pipe(
      first(),
      map( (countries:any[]) => countries.map( country =>{
        return {
          name : country.name.common,
          flag : country.flags.png,
          lating : country.lating

        } as ICountry
      }))
    )
  }

  getAllSubregions(){

    return this.httpCLient.get<string[]>('/data/subregions.json')
    .pipe(
      first()
    )
  }

}


