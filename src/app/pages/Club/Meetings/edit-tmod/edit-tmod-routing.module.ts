import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditTmodPage } from './edit-tmod.page';

const routes: Routes = [
  {
    path: '',
    component: EditTmodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditTmodPageRoutingModule {}
