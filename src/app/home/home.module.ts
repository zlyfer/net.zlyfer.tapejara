import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

import { PipesModule } from '@pipe/pipes.module';

import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
// import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HomePageRoutingModule,
    PipesModule,
    FontAwesomeModule,
  ],
  declarations: [HomePage],
})
export class HomeModule {
  constructor(library: FaIconLibrary) {
    // library.addIconPacks(fas);
    library.addIconPacks(far);
    library.addIconPacks(fab);
  }
}
