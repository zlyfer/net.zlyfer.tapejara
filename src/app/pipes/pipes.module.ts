import { NgModule } from '@angular/core';
import { zDatePipe } from './zdate.pipe';
import { zFileSizePipe } from './zfilesize.pipe';

@NgModule({
  declarations: [zDatePipe, zFileSizePipe],
  imports: [],
  exports: [zDatePipe, zFileSizePipe],
})
export class PipesModule {}
