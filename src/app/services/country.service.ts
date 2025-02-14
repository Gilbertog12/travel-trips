import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private httpCLient = inject(HttpClient)

  constructor() { }

  private url_Base = 'https://restcountries.com/v3.1/'


  getAllSubregions(){

    return this.httpCLient.get<string[]>('/data/subregions.json')
    .pipe(
      first()
    )
  }

}


