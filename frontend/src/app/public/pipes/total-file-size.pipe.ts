import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'totalFileSize',
})
export class TotalFileSizePipe implements PipeTransform {
  transform(fileList: any[]): number {
    let total = 0;
    for (let file of fileList) {
      total += file.fileSize;
    }
    return total;
  }
}
