import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SettingsPage } from './settings.page';
import { SettingsPageRoutingModule } from './settings-routing.module';

@NgModule({
  declarations: [SettingsPage],
  imports: [CommonModule, FormsModule, IonicModule, SettingsPageRoutingModule],
})
export class SettingsModule {}
