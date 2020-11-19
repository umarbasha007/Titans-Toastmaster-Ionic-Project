import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TableTopicsAdminPage } from './table-topics-admin.page';

const routes: Routes = [
  {
    path: '',
    component: TableTopicsAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TableTopicsAdminPageRoutingModule {}
