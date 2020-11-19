import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EducationSessionPage } from './education-session.page';

const routes: Routes = [
  {
    path: '',
    component: EducationSessionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EducationSessionPageRoutingModule {}
