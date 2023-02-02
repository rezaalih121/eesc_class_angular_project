import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FileInterface } from 'src/model/file-model';

@Component({
  selector: 'app-file-selector',
  templateUrl: './file-selector.component.html',
  styleUrls: ['./file-selector.component.scss'],
})
export class FileSelectorComponent {
  fileToUpload: FileInterface[] = [];

  @Input()
  multiple: boolean = false;

  @Input()
  parentFormGroup: FormGroup | any;

  @Input()
  fileFormControlName: FormControl | any;

  public onFIleSelected(e: any): void {
    for (let file of e.target.files) {
      this.fileToUpload.push({
        fileObj: file,
        fileName: file.name,
        fileSize: file.size,
        fileDate: file.lastModified,
      });
    }
  }
}
