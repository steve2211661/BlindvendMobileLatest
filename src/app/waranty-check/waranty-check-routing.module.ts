import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WarantyCheckPage } from './waranty-check.page';

const routes: Routes = [
  {
    path: '',
    component: WarantyCheckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WarantyCheckPageRoutingModule {}
