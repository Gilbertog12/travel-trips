import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapCountriesComponent } from './map-countries.component';

describe('MapCountriesComponent', () => {
  let component: MapCountriesComponent;
  let fixture: ComponentFixture<MapCountriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapCountriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
