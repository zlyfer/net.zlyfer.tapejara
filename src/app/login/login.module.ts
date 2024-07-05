import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LoginPage } from './login.page';
import { LoginPageRoutingModule } from './login-routing.module';

@NgModule({
  declarations: [LoginPage],
  imports: [CommonModule, FormsModule, IonicModule, LoginPageRoutingModule],
})
export class LoginModule {}
