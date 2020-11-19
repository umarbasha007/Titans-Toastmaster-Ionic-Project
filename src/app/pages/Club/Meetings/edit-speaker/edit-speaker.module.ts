import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditSpeakerPageRoutingModule } from './edit-speaker-routing.module';

import { EditSpeakerPage } from './edit-speaker.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditSpeakerPageRoutingModule
  ],
  declarations: [EditSpeakerPage]
})
export class EditSpeakerPageModule {}
