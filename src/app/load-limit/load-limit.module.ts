import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoadLimitPageRoutingModule } from './load-limit-routing.module';

import { LoadLimitPage } from './load-limit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LoadLimitPageRoutingModule
  ],
  declarations: [LoadLimitPage]
})
export class LoadLimitPageModule {}
