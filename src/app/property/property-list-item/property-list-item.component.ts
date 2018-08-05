import { Component, OnInit, Input } from '@angular/core';

import { Property } from '../shared/property.model';

@Component({
  selector: 'pms-property-list-item',
  templateUrl: './property-list-item.component.html',
  styleUrls: ['./property-list-item.component.scss']
})
export class PropertyListItemComponent implements OnInit {

  @Input('property') property: Property;

  constructor() { }

  ngOnInit() {
  }

}
