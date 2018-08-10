import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MapService } from './map.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'pms-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {

  @Input() location: string;
  hasPositionError: boolean = false;

  lat: number;
  lng: number;
  @Input() locationSubject: Subject<any>;

  constructor(
    private mapService: MapService,
    private ref: ChangeDetectorRef) { }

  ngOnInit() {
    if (this.locationSubject) {
      this.locationSubject.subscribe((location: string) => {
        this.getLocation(location);
      });
    }
  }

  getLocation(location) {
    let currentLocation = this.location;
    let value = Math.round(Math.random() * 10);
    console.log('value ', value);
    if (value > 5) {
      currentLocation = '9946288290020';
    }
    this.mapService.getGeoLocation(currentLocation).subscribe(
      (coordinates) => {
        this.lat = coordinates.lat;
        this.lng = coordinates.lng;
        this.ref.detectChanges();
      }, () => {
        this.hasPositionError = true;
        this.ref.detectChanges();
      });
  }

  onMapReady() {
    this.getLocation(this.location);
  }

  ngOnDestroy() {
    if (this.locationSubject) {
      this.locationSubject.unsubscribe();
    }
  }

}
