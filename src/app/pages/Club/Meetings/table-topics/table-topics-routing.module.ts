import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TableTopicsPage } from './table-topics.page';

const routes: Routes = [
  {
    path: '',
    component: TableTopicsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TableTopicsPageRoutingModule {}
