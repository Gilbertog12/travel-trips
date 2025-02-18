import { GoogleMap, MapAdvancedMarker } from '@angular/google-maps';

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-map-countries',
  imports: [GoogleMap, MapAdvancedMarker],
  templateUrl: './map-countries.component.html',
  styleUrl: './map-countries.component.scss'
})
export class MapCountriesComponent {

  @Input() markers : google.maps.LatLngLiteral[] = []

 public center :google.maps.LatLngLiteral = { lat :0 , lng:0}
}
