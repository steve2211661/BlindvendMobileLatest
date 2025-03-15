import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadLimitPage } from './load-limit.page';

const routes: Routes = [
  {
    path: '',
    component: LoadLimitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoadLimitPageRoutingModule {}
