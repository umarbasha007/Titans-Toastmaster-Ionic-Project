import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditTmodPageRoutingModule } from './edit-tmod-routing.module';

import { EditTmodPage } from './edit-tmod.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditTmodPageRoutingModule
  ],
  declarations: [EditTmodPage]
})
export class EditTmodPageModule {}
