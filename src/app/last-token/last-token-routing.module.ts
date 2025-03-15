import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LastTokenPage } from './last-token.page';

const routes: Routes = [
  {
    path: '',
    component: LastTokenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LastTokenPageRoutingModule {}
