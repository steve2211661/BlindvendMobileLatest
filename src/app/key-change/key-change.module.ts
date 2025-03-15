import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KeyChangePageRoutingModule } from './key-change-routing.module';

import { KeyChangePage } from './key-change.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    KeyChangePageRoutingModule
  ],
  declarations: [KeyChangePage]
})
export class KeyChangePageModule {}
