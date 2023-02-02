import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myFilesize',
})
export class MyFilesizePipe implements PipeTransform {
  transform(octets: number, decimal: number = 0, lang: string = 'f'): string {
    const division: number = Math.pow(10, decimal);

    if (octets < 1024) {
      return octets + ' octects';
    } else if (octets < 1024 * 1024) {
      return (
        Math.round((octets / 1024 + Number.EPSILON) * division) / division +
        (lang == 'e' ? ' KB' : ' Ko')
      );
    } else if (octets < 1024 * 1024 * 1024) {
      return (
        Math.round((octets / (1024 * 1024) + Number.EPSILON) * division) /
          division +
        (lang == 'e' ? ' MB' : ' Mo')
      );
    }

    return (
      Math.round((octets / (1024 * 1024 * 1024) + Number.EPSILON) * division) /
        division +
      (lang == 'e' ? ' GB' : ' Go')
    );
  }
}
