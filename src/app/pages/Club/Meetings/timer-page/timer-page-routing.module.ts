import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimerPagePage } from './timer-page.page';

const routes: Routes = [
  {
    path: '',
    component: TimerPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimerPagePageRoutingModule {}
