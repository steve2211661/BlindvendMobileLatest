import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LastTokenPageRoutingModule } from './last-token-routing.module';

import { LastTokenPage } from './last-token.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LastTokenPageRoutingModule
  ],
  declarations: [LastTokenPage]
})
export class LastTokenPageModule {}
