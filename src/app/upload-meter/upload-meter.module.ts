import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadMeterPageRoutingModule } from './upload-meter-routing.module';

import { UploadMeterPage } from './upload-meter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UploadMeterPageRoutingModule
  ],
  declarations: [UploadMeterPage]
})
export class UploadMeterPageModule {}
