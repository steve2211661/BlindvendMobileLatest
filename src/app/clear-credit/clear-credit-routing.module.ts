import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClearCreditPage } from './clear-credit.page';

const routes: Routes = [
  {
    path: '',
    component: ClearCreditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClearCreditPageRoutingModule {}
