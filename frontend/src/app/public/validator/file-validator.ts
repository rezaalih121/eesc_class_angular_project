import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function fileValidator(availableExtention: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const availableExtentions = availableExtention;

    if (control.value) {
      const extention = control.value.split('.').pop();

      if (!availableExtentions.includes(extention)) {
        return { invalidExtention: { extention: extention } };
      }
    } else return { fileRequired: 'fileRequired' };

    return null;
  };
}
