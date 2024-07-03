import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zfilesize',
})
export class zFileSizePipe implements PipeTransform {
  transform(size: number): string {
    if (size <= 0) return '0 B';

    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(size) / Math.log(k));

    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
