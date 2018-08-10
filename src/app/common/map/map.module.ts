import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { CamelizePipe } from 'ngx-pipes';

import { keys } from '../../../config/dev';
import { MapComponent } from './map.component';
import { MapService } from './map.service';

@NgModule({
  declarations: [
    MapComponent
  ],
  exports: [
    MapComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: keys.google_api
    }),
    CommonModule
  ],
  providers:[
    MapService,
    CamelizePipe
  ]
})
export class MapModule { }
