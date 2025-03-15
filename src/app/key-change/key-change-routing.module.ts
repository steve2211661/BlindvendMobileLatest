import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KeyChangePage } from './key-change.page';

const routes: Routes = [
  {
    path: '',
    component: KeyChangePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KeyChangePageRoutingModule {}
