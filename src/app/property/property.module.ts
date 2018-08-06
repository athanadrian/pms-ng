import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgPipesModule } from 'ngx-pipes';

import { PropertyComponent } from './property.component';
import { PropertyListComponent } from './property-list/property-list.component';
import { PropertyListItemComponent } from './property-list-item/property-list-item.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';


import { PropertyService } from './shared/property.service';

const routes = [
    {
        path: 'properties', component: PropertyComponent,
        children: [
            { path: '', component: PropertyListComponent },
            { path: ':propertyId', component: PropertyDetailComponent }
        ]
    }
];

@NgModule({
    declarations: [
        PropertyComponent,
        PropertyListComponent,
        PropertyListItemComponent,
        PropertyDetailComponent
    ],
    imports: [
        RouterModule.forRoot(routes),
        CommonModule,
        HttpClientModule,
        NgPipesModule
    ],
    exports: [
    ],
    providers: [
        PropertyService
    ]
})


export class PropertyModule { }
