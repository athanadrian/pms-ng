import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgPipesModule } from 'ngx-pipes';
import { Daterangepicker } from 'ng2-daterangepicker';

import { MapModule } from '../common/map/map.module';

import { PropertyComponent } from './property.component';
import { PropertyListComponent } from './property-list/property-list.component';
import { PropertyListItemComponent } from './property-list-item/property-list-item.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';

import { PropertyService } from './shared/property.service';
import { AuthGuard } from './../auth/shared/auth.guard';
import { PropertyDetailBookingComponent } from './property-detail/property-detail-booking/property-detail-booking.component';

const routes = [
    {
        path: 'properties', component: PropertyComponent,
        children: [
            { path: '', component: PropertyListComponent },
            { path: ':propertyId', component: PropertyDetailComponent, canActivate: [AuthGuard] }
        ]
    }
];

@NgModule({
    declarations: [
        PropertyComponent,
        PropertyListComponent,
        PropertyListItemComponent,
        PropertyDetailComponent,
        PropertyDetailBookingComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        HttpClientModule,
        NgPipesModule,
        MapModule,
        Daterangepicker
    ],
    exports: [
    ],
    providers: [
        PropertyService,
        AuthGuard
    ]
})


export class PropertyModule { }
