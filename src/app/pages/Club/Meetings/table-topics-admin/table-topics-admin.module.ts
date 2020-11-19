import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TableTopicsAdminPageRoutingModule } from './table-topics-admin-routing.module';

import { TableTopicsAdminPage } from './table-topics-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TableTopicsAdminPageRoutingModule
  ],
  declarations: [TableTopicsAdminPage]
})
export class TableTopicsAdminPageModule {}
