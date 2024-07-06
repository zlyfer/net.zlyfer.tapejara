import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ConsolePage } from './console.page';
import { ConsolePageRoutingModule } from './console-routing.module';

@NgModule({
  declarations: [ConsolePage],
  imports: [CommonModule, FormsModule, IonicModule, ConsolePageRoutingModule],
})
export class ConsoleModule {}
