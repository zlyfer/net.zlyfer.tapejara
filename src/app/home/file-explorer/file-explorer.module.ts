import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FileExplorerPage } from './file-explorer.page';
import { FileExplorerPageRoutingModule } from './file-explorer-routing.module';
import { PipesModule } from '@pipe/pipes.module';
import { ZSpinnerComponent } from '@component/zspinner/zspinner.component';

@NgModule({
  declarations: [FileExplorerPage, ZSpinnerComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FontAwesomeModule,
    FileExplorerPageRoutingModule,
    PipesModule,
  ],
})
export class FileExplorerModule {}
