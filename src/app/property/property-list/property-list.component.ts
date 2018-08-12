import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

import { PropertyService } from '../shared/property.service';
import { Property } from '../shared/property.model';

@Component({
  selector: 'pms-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit {

  properties: Property[] = [];

  constructor(private propertyService: PropertyService) { }

  ngOnInit() {
    //this.properties = this.propertyService.getProperties();

    const propertiesObservable = this.propertyService.getProperties();

    propertiesObservable.subscribe((data: Property[]) => {
      this.properties = data;
      console.log('properties: ', this.properties);
    })
  }

}
