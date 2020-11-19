import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnterEducationSessionPageRoutingModule } from './enter-education-session-routing.module';

import { EnterEducationSessionPage } from './enter-education-session.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnterEducationSessionPageRoutingModule
  ],
  declarations: [EnterEducationSessionPage]
})
export class EnterEducationSessionPageModule {}
