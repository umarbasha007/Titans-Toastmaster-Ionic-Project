import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [
  {
    path: 'menu',
    component: DashboardPage,
  }
]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    DashboardPageRoutingModule,
    RouterModule.forChild(routes)

  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
