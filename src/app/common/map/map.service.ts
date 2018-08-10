import { Injectable } from '@angular/core';

import { of as observableOf, Observable } from 'rxjs';
import { CamelizePipe } from 'ngx-pipes';

@Injectable()
export class MapService {

    private geoCoder;
    private locationCached: any = {};

    constructor(private camelizePipe: CamelizePipe) {

    }

    private camelize(value: string): string {
        return this.camelizePipe.transform(value);
    }

    private cacheLocation(location, coordinates) {

        this.locationCached[this.camelize(location)] = coordinates;
        console.log('cashed', this.locationCached);
    }

    private isLocationCashed(location): boolean {
        return this.locationCached[this.camelize(location)];
    }

    private getGeocodeLocation(location: string): Observable<any> {

        if (!this.geoCoder) {
            this.geoCoder = new (<any>window).google.maps.Geocoder();
        }
        return new Observable((observer) => {
            this.geoCoder.geocode({ address: location }, (result, status) => {
                if (status === 'OK') {
                    const geometry = result[0].geometry.location;
                    const coordinates = { lat: geometry.lat(), lng: geometry.lng() };
                    this.cacheLocation(location, coordinates);
                    observer.next(coordinates);
                } else {
                    observer.error('Could not find location');
                }
            });
        })
    }

    public getGeoLocation(location: string): Observable<any> {
        if (this.isLocationCashed(location)) {
            return observableOf(this.locationCached[this.camelize(location)]);
        } else {
            return this.getGeocodeLocation(location);
        }
    }
}