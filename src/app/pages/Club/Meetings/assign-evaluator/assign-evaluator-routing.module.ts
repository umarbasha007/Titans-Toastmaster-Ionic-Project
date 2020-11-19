import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignEvaluatorPage } from './assign-evaluator.page';

const routes: Routes = [
  {
    path: '',
    component: AssignEvaluatorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignEvaluatorPageRoutingModule {}
