import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadMeterRegionPage } from './upload-meter-region.page';

const routes: Routes = [
  {
    path: '',
    component: UploadMeterRegionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadMeterRegionPageRoutingModule {}
