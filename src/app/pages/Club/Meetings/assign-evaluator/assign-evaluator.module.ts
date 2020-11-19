import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssignEvaluatorPageRoutingModule } from './assign-evaluator-routing.module';

import { AssignEvaluatorPage } from './assign-evaluator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssignEvaluatorPageRoutingModule
  ],
  declarations: [AssignEvaluatorPage]
})
export class AssignEvaluatorPageModule {}
