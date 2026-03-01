import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../../../environments/environment';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
})
export class ContactForm {
  private http = inject(HttpClient);

  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl('', [Validators.required, Validators.minLength(2)]),
    message: new FormControl('', [Validators.required, Validators.minLength(10)]),
    privacyAccepted: new FormControl(false, Validators.requiredTrue)
  });

  get name(): FormControl {
    return this.contactForm.get('name') as FormControl;
  }

  get firstName(): FormControl {
    return this.contactForm.get('firstName') as FormControl;
  }

  get email(): FormControl {
    return this.contactForm.get('email') as FormControl;
  }

  get subject(): FormControl {
    return this.contactForm.get('subject') as FormControl;
  }

  get message(): FormControl {
    return this.contactForm.get('message') as FormControl;
  }

  get privacyAccepted(): FormControl {
    return this.contactForm.get('privacyAccepted') as FormControl;
  }

  get isRestValid(): boolean {
    return this.name.valid && this.firstName.valid && this.email.valid && this.subject.valid && this.message.valid;
  }

  get isSomethingDirty(): boolean {
    return this.name.dirty || this.firstName.dirty || this.email.dirty || this.subject.dirty || this.message.dirty;
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      const url = environment.phpUrl;

      this.http.post(url, formData).subscribe({
        next: (response) => {
          console.log('Daten wurden übergeben', response);
          this.contactForm.reset();
        },
        error: (error) => {
          console.error('Es gab ein Problem bei der Übertragung', error);
        }
      });
    }
  }


}
