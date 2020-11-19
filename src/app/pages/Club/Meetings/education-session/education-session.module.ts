import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EducationSessionPageRoutingModule } from './education-session-routing.module';

import { EducationSessionPage } from './education-session.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EducationSessionPageRoutingModule
  ],
  declarations: [EducationSessionPage]
})
export class EducationSessionPageModule {}
