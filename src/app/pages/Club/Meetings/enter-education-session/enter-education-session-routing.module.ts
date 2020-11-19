import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnterEducationSessionPage } from './enter-education-session.page';

const routes: Routes = [
  {
    path: '',
    component: EnterEducationSessionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnterEducationSessionPageRoutingModule {}
