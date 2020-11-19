import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TableTopicsPageRoutingModule } from './table-topics-routing.module';

import { TableTopicsPage } from './table-topics.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TableTopicsPageRoutingModule
  ],
  declarations: [TableTopicsPage]
})
export class TableTopicsPageModule {}
