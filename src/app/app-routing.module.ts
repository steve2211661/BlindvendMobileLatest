import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'clear-credit',
    loadChildren: () => import('./clear-credit/clear-credit.module').then( m => m.ClearCreditPageModule)
  },
  {
    path: 'credit',
    loadChildren: () => import('./credit/credit.module').then( m => m.CreditPageModule)
  },
  {
    path: 'clear-tamper',
    loadChildren: () => import('./clear-tamper/clear-tamper.module').then( m => m.ClearTamperPageModule)
  },
  {
    path: 'load-limit',
    loadChildren: () => import('./load-limit/load-limit.module').then( m => m.LoadLimitPageModule)
  },
  {
    path: 'key-change',
    loadChildren: () => import('./key-change/key-change.module').then( m => m.KeyChangePageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'whatsapp-contact',
    loadChildren: () => import('./whatsapp-contact/whatsapp-contact.module').then( m => m.WhatsappContactPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'tid',
    loadChildren: () => import('./tid/tid.module').then( m => m.TidPageModule)
  },
  {
    path: 'upload-meter',
    loadChildren: () => import('./upload-meter/upload-meter.module').then( m => m.UploadMeterPageModule)
  },
  {
    path: 'upload-meter-region',
    loadChildren: () => import('./upload-meter-region/upload-meter-region.module').then( m => m.UploadMeterRegionPageModule)
  },
  {
    path: 'select-region',
    loadChildren: () => import('./select-region/select-region.module').then( m => m.SelectRegionPageModule)
  },
  {
    path: 'last-token',
    loadChildren: () => import('./last-token/last-token.module').then( m => m.LastTokenPageModule)
  },
  {
    path: 'waranty-check',
    loadChildren: () => import('./waranty-check/waranty-check.module').then( m => m.WarantyCheckPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
