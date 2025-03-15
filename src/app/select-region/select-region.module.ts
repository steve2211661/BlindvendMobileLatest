import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectRegionPageRoutingModule } from './select-region-routing.module';

import { SelectRegionPage } from './select-region.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectRegionPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [SelectRegionPage]
})
export class SelectRegionPageModule {}
