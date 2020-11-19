import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { IonicModule } from '@ionic/angular';

import { TimerPagePageRoutingModule } from './timer-page-routing.module';

import { TimerPagePage } from './timer-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, ChartsModule,
    TimerPagePageRoutingModule
  ],
  declarations: [TimerPagePage]
})
export class TimerPagePageModule {}
