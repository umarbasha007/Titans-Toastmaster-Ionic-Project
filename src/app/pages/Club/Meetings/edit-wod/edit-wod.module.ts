import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditWodPageRoutingModule } from './edit-wod-routing.module';

import { EditWodPage } from './edit-wod.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditWodPageRoutingModule
  ],
  declarations: [EditWodPage]
})
export class EditWodPageModule {}
