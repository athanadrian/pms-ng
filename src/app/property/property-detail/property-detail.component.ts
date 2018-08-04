import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { PropertyService } from './../shared/property.service';

import { Property } from '../shared/property.model';

@Component({
  selector: 'pms-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit {

  urlId: string;
  property: Property;

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService) { }

  ngOnInit() {
    this.route.params
      .subscribe((params) => {
        console.log(params);
        this.getProperty(params['propertyId']);
      })
  }

  getProperty(propertyId: string) {
    this.propertyService.getPropertyById(propertyId)
      .subscribe((property: Property) => {
        this.property = property;
      })
  }

}
