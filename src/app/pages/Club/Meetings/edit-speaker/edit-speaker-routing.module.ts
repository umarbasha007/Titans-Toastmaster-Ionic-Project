import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditSpeakerPage } from './edit-speaker.page';

const routes: Routes = [
  {
    path: '',
    component: EditSpeakerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditSpeakerPageRoutingModule {}
