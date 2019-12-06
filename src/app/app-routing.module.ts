import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'edit-user',
    loadChildren: () => import('./edit-user/edit-user.module').then( m => m.EditUserPageModule)
  },
  {
    path: 'transaction-detail',
    loadChildren: () => import('./transaction-detail/transaction-detail.module').then( m => m.TransactionDetailPageModule)
  },  {
    path: 'stats',
    loadChildren: () => import('./stats/stats.module').then( m => m.StatsPageModule)
  },
  {
    path: 'get-payment-qr',
    loadChildren: () => import('./get-payment-qr/get-payment-qr.module').then( m => m.GetPaymentQrPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
