import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Property } from './property.model';


@Injectable()
export class PropertyService {
    private properties: Property[] = [{
        id: "1",
        title: "Central Apartment 1",
        city: "New York",
        street: "Times Sqaure",
        category: "apartment",
        image: "http://via.placeholder.com/350x250",
        bedrooms: 3,
        description: "Very nice apartment",
        dailyRate: 34,
        monthlyRate: 340,
        shared: false,
        createdDate: "24/12/2017"
    },
    {
        id: "2",
        title: 'Central Apartment 2',
        city: 'San Francisco',
        street: 'Main street',
        category: 'condo',
        image: 'http://via.placeholder.com/350x250',
        bedrooms: 2,
        description: 'Very nice apartment',
        dailyRate: 12,
        monthlyRate: 120,
        shared: true,
        createdDate: '24/12/2017'
    },
    {
        id: "3",
        title: 'Central Apartment 3',
        city: 'Bratislava',
        street: 'Hlavna',
        category: 'condo',
        image: 'http://via.placeholder.com/350x250',
        bedrooms: 2,
        description: 'Very nice apartment',
        dailyRate: 334,
        monthlyRate: 3340,
        shared: true,
        createdDate: '24/12/2017'
    },
    {
        id: "4",
        title: 'Central Apartment 4',
        city: 'Berlin',
        street: 'Haupt strasse',
        category: 'house',
        image: 'http://via.placeholder.com/350x250',
        bedrooms: 9,
        description: 'Very nice apartment',
        dailyRate: 33,
        monthlyRate: 330,
        shared: true,
        createdDate: '24/12/2017'
    }];

    //   public getProperties(){
    //       return this.properties;
    //   }
    public getPropertyById(propertyId: string): Observable<Property> {
        return new Observable((observer) => {
            setTimeout(() => {
                const propertyObservable = this.properties.find((property) => {
                    return property.id === propertyId
                });
                observer.next(propertyObservable);
            }, 2000)
        });
    }

    public getProperties(): Observable<Property[]> {
        return new Observable((observer) => {
            setTimeout(() => {
                observer.next(this.properties);
            }, 2000);
        });
    }
}