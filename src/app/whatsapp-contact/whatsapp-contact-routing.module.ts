import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WhatsappContactPage } from './whatsapp-contact.page';

const routes: Routes = [
  {
    path: '',
    component: WhatsappContactPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WhatsappContactPageRoutingModule {}
