import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  formContact!: FormGroup;
  isSubmitted: boolean = false;

  constructor(private router: Router, private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.formContact = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        newPassword: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=\D*\d)(?=[^a-z]*[a-z])(?=.*[$@$!%*?&])(?=[^A-Z]*[A-Z]).{8,30}$/
            ),
            Validators.minLength(10),
          ],
        ],
        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=\D*\d)(?=[^a-z]*[a-z])(?=.*[$@$!%*?&])(?=[^A-Z]*[A-Z]).{8,30}$/
            ),
            Validators.minLength(10),
          ],
        ],
        object: [
          "J'ai un probleme",
          [Validators.required, Validators.maxLength(10)],
        ],

        message: [
          '',
          [
            Validators.required,
            Validators.minLength(70),
            Validators.maxLength(121),
          ],
        ],
      },
      {
        validator: this.ConfirmedValidator('newPassword', 'confirmPassword'),
      }
    );
  }
  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors['confirmedValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  onSubmit(): void {
    if (this.formContact.valid) {
      alert('is valid');
      this.router.navigateByUrl('home');
    }
  }
}
