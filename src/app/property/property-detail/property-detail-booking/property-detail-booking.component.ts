import { Component, OnInit, Input } from "@angular/core";

import { Property } from "./../../shared/property.model";

@Component({
  selector: "pms-property-detail-booking",
  templateUrl: "./property-detail-booking.component.html",
  styleUrls: ["./property-detail-booking.component.scss"]
})
export class PropertyDetailBookingComponent implements OnInit {
  constructor() {}

  @Input() dailyPrice: number;
  @Input() monthlyPrice: number;
  daterange: any = {};

  ngOnInit() {}

  options: any = {
    locale: { format: "DD-MM-YYYY" },
    alwaysShowCalendars: false,
    opens:"left"
  };

  selectedDate(value: any, datepicker?: any) {

    // any object can be passed to the selected event and it will be passed back here
    datepicker.start = value.start;
    datepicker.end = value.end;

    // or manupulat your own internal property
    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = value.label;
  }
}
