import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WhatsappContactPageRoutingModule } from './whatsapp-contact-routing.module';

import { WhatsappContactPage } from './whatsapp-contact.page';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WhatsappContactPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [WhatsappContactPage]
})
export class WhatsappContactPageModule {}
