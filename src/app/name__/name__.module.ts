import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Name__Page } from './name__.page';
import { Name__PageRoutingModule } from './name__-routing.module';

@NgModule({
  declarations: [Name__Page],
  imports: [CommonModule, FormsModule, IonicModule, Name__PageRoutingModule],
})
export class Name__Module {}
