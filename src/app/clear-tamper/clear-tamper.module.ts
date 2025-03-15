import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { ClearTamperPageRoutingModule } from './clear-tamper-routing.module';

import { ClearTamperPage } from './clear-tamper.page';
import { SMS } from '@ionic-native/sms/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ClearTamperPageRoutingModule
  ],
  providers:[SMS],
  declarations: [ClearTamperPage]
})
export class ClearTamperPageModule {}
