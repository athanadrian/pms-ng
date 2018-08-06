import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { Property } from './property.model';


@Injectable()
export class PropertyService {

    constructor(private http: HttpClient) {

    }
    //   public getProperties(){
    //       return this.properties;
    //   }

    // public getPropertyById(propertyId: string): Observable<Property> {
    //     return new Observable((observer) => {
    //         setTimeout(() => {
    //             const propertyObservable = this.properties.find((property) => {
    //                 return property.id === propertyId
    //             });
    //             observer.next(propertyObservable);
    //         }, 2000)
    //     });
    // }

    // public getProperties(): Observable<Property[]> {
    //     return new Observable((observer) => {
    //         setTimeout(() => {
    //             observer.next(this.properties);
    //         }, 2000);
    //     });
    // }

    public getPropertyById(propertyId: string): Observable<any> {
        return this.http.get('/api/v1/properties/' + propertyId);
    }

    public getProperties(): Observable<any> {
        return this.http.get('/api/v1/properties');
    }
}