import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ClearCreditPageRoutingModule } from './clear-credit-routing.module';
import { ClearCreditPage } from './clear-credit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ClearCreditPageRoutingModule
  ],
  declarations: [ClearCreditPage]
})
export class ClearCreditPageModule {}
