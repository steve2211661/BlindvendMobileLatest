import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WarantyCheckPageRoutingModule } from './waranty-check-routing.module';

import { WarantyCheckPage } from './waranty-check.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WarantyCheckPageRoutingModule
  ],
  declarations: [WarantyCheckPage]
})
export class WarantyCheckPageModule {}
