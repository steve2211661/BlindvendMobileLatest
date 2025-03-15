import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadMeterRegionPageRoutingModule } from './upload-meter-region-routing.module';

import { UploadMeterRegionPage } from './upload-meter-region.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    UploadMeterRegionPageRoutingModule
  ],
  declarations: [UploadMeterRegionPage]
})
export class UploadMeterRegionPageModule {}
