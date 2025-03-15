import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TidPageRoutingModule } from './tid-routing.module';

import { TidPage } from './tid.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TidPageRoutingModule
  ],
  declarations: [TidPage]
})
export class TidPageModule {}
