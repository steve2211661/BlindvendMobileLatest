import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClearTamperPage } from './clear-tamper.page';

const routes: Routes = [
  {
    path: '',
    component: ClearTamperPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClearTamperPageRoutingModule {}
