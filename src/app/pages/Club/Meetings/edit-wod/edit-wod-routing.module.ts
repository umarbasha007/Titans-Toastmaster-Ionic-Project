import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditWodPage } from './edit-wod.page';

const routes: Routes = [
  {
    path: '',
    component: EditWodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditWodPageRoutingModule {}
