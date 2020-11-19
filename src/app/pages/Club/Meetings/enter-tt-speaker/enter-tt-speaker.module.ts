import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnterTtSpeakerPageRoutingModule } from './enter-tt-speaker-routing.module';

import { EnterTtSpeakerPage } from './enter-tt-speaker.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnterTtSpeakerPageRoutingModule
  ],
  declarations: [EnterTtSpeakerPage]
})
export class EnterTtSpeakerPageModule {}
