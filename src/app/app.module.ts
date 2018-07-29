import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { PropertyComponent } from './property/property.component';
import { PropertyListComponent } from './property/property-list/property-list.component';
import { PropertyListItemComponent } from './property/property-list-item/property-list-item.component';

const routes = [
  { path: '', component: PropertyComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PropertyComponent,
    PropertyListComponent,
    PropertyListItemComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
