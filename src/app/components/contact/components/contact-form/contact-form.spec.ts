import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { FormControl } from '@angular/forms';

import { ContactForm } from './contact-form';
import { environment } from '../../../../../environments/environment';

describe('ContactForm', () => {
  let component: ContactForm;
  let fixture: ComponentFixture<ContactForm>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactForm],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactForm);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ─── Form initialization ───────────────────────────────────────────────────

  describe('Form initialization', () => {
    it('should initialize all fields as empty', () => {
      expect(component.contactForm.get('name')?.value).toBe('');
      expect(component.contactForm.get('firstName')?.value).toBe('');
      expect(component.contactForm.get('email')?.value).toBe('');
      expect(component.contactForm.get('subject')?.value).toBe('');
      expect(component.contactForm.get('message')?.value).toBe('');
      expect(component.contactForm.get('privacyAccepted')?.value).toBe(false);
    });

    it('should be invalid when empty', () => {
      expect(component.contactForm.valid).toBeFalse();
    });
  });

  // ─── Getters ───────────────────────────────────────────────────────────────

  describe('FormControl getters', () => {
    it('should return the name FormControl', () => {
      expect(component.name).toBe(component.contactForm.get('name') as FormControl);
    });

    it('should return the firstName FormControl', () => {
      expect(component.firstName).toBe(component.contactForm.get('firstName') as FormControl);
    });

    it('should return the email FormControl', () => {
      expect(component.email).toBe(component.contactForm.get('email') as FormControl);
    });

    it('should return the subject FormControl', () => {
      expect(component.subject).toBe(component.contactForm.get('subject') as FormControl);
    });

    it('should return the message FormControl', () => {
      expect(component.message).toBe(component.contactForm.get('message') as FormControl);
    });

    it('should return the privacyAccepted FormControl', () => {
      expect(component.privacyAccepted).toBe(component.contactForm.get('privacyAccepted') as FormControl);
    });
  });

  // ─── Validation ────────────────────────────────────────────────────────────

  describe('Validation: name', () => {
    it('should be invalid when empty', () => {
      component.name.setValue('');
      expect(component.name.hasError('required')).toBeTrue();
    });

    it('should be invalid when shorter than 3 characters', () => {
      component.name.setValue('AB');
      expect(component.name.hasError('minlength')).toBeTrue();
    });

    it('should be valid with 3 or more characters', () => {
      component.name.setValue('Mueller');
      expect(component.name.valid).toBeTrue();
    });
  });

  describe('Validation: firstName', () => {
    it('should be invalid when empty', () => {
      component.firstName.setValue('');
      expect(component.firstName.hasError('required')).toBeTrue();
    });

    it('should be invalid when shorter than 3 characters', () => {
      component.firstName.setValue('AB');
      expect(component.firstName.hasError('minlength')).toBeTrue();
    });

    it('should be valid with 3 or more characters', () => {
      component.firstName.setValue('Anna');
      expect(component.firstName.valid).toBeTrue();
    });
  });

  describe('Validation: email', () => {
    it('should be invalid when empty', () => {
      component.email.setValue('');
      expect(component.email.hasError('required')).toBeTrue();
    });

    it('should be invalid with wrong format', () => {
      component.email.setValue('not-an-email');
      expect(component.email.hasError('email')).toBeTrue();
    });

    it('should be valid with a correct email address', () => {
      component.email.setValue('anna@example.com');
      expect(component.email.valid).toBeTrue();
    });
  });

  describe('Validation: subject', () => {
    it('should be invalid when empty', () => {
      component.subject.setValue('');
      expect(component.subject.hasError('required')).toBeTrue();
    });

    it('should be invalid when shorter than 2 characters', () => {
      component.subject.setValue('A');
      expect(component.subject.hasError('minlength')).toBeTrue();
    });

    it('should be valid with 2 or more characters', () => {
      component.subject.setValue('Anfrage');
      expect(component.subject.valid).toBeTrue();
    });
  });

  describe('Validation: message', () => {
    it('should be invalid when empty', () => {
      component.message.setValue('');
      expect(component.message.hasError('required')).toBeTrue();
    });

    it('should be invalid when shorter than 10 characters', () => {
      component.message.setValue('Kurz');
      expect(component.message.hasError('minlength')).toBeTrue();
    });

    it('should be valid with 10 or more characters', () => {
      component.message.setValue('Dies ist eine Testnachricht');
      expect(component.message.valid).toBeTrue();
    });
  });

  describe('Validation: privacyAccepted', () => {
    it('should be invalid when false', () => {
      component.privacyAccepted.setValue(false);
      expect(component.privacyAccepted.valid).toBeFalse();
    });

    it('should be valid when true', () => {
      component.privacyAccepted.setValue(true);
      expect(component.privacyAccepted.valid).toBeTrue();
    });
  });

  it('should be valid when all fields are correctly filled', () => {
    component.contactForm.setValue({
      name: 'Mueller',
      firstName: 'Anna',
      email: 'anna@example.com',
      subject: 'Testbetreff',
      message: 'Dies ist eine ausreichend lange Nachricht',
      privacyAccepted: true
    });
    expect(component.contactForm.valid).toBeTrue();
  });

  // ─── isRestValid ───────────────────────────────────────────────────────────

  describe('isRestValid getter', () => {
    it('should return false when the form is empty', () => {
      expect(component.isRestValid).toBeFalse();
    });

    it('should return true when all non-privacy fields are valid', () => {
      component.name.setValue('Mueller');
      component.firstName.setValue('Anna');
      component.email.setValue('anna@example.com');
      component.subject.setValue('Testbetreff');
      component.message.setValue('Dies ist eine ausreichend lange Nachricht');
      expect(component.isRestValid).toBeTrue();
    });

    it('should return false when only some fields are valid', () => {
      component.name.setValue('Mueller');
      component.firstName.setValue('Anna');
      expect(component.isRestValid).toBeFalse();
    });
  });

  // ─── isSomethingDirty ──────────────────────────────────────────────────────

  describe('isSomethingDirty getter', () => {
    it('should return false initially', () => {
      expect(component.isSomethingDirty).toBeFalse();
    });

    it('should return true when name is marked dirty', () => {
      component.name.markAsDirty();
      expect(component.isSomethingDirty).toBeTrue();
    });

    it('should return true when email is marked dirty', () => {
      component.email.markAsDirty();
      expect(component.isSomethingDirty).toBeTrue();
    });

    it('should return true when subject is marked dirty', () => {
      component.subject.markAsDirty();
      expect(component.isSomethingDirty).toBeTrue();
    });

    it('should return true when message is marked dirty', () => {
      component.message.markAsDirty();
      expect(component.isSomethingDirty).toBeTrue();
    });
  });

  // ─── onSubmit ─────────────────────────────────────────────────────────────

  describe('onSubmit', () => {
    const validFormData = {
      name: 'Mueller',
      firstName: 'Anna',
      email: 'anna@example.com',
      subject: 'Testbetreff',
      message: 'Dies ist eine ausreichend lange Nachricht',
      privacyAccepted: true
    };

    it('should not send an HTTP request when the form is invalid', () => {
      component.onSubmit();
      httpMock.expectNone(environment.phpUrl);
    });

    it('should send an HTTP POST to the configured URL when valid', () => {
      component.contactForm.setValue(validFormData);
      component.onSubmit();

      const req = httpMock.expectOne(environment.phpUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(validFormData);
      req.flush({ success: true });
    });

    it('should reset the form after a successful submission', () => {
      component.contactForm.setValue(validFormData);
      component.onSubmit();

      const req = httpMock.expectOne(environment.phpUrl);
      req.flush({ success: true });

      expect(component.contactForm.pristine).toBeTrue();
      expect(component.contactForm.get('name')?.value).toBeNull();
    });

    it('should log an error on HTTP failure', () => {
      spyOn(console, 'error');
      component.contactForm.setValue(validFormData);
      component.onSubmit();

      const req = httpMock.expectOne(environment.phpUrl);
      req.error(new ProgressEvent('Network error'));

      expect(console.error).toHaveBeenCalledWith(
        'Es gab ein Problem bei der Übertragung',
        jasmine.any(Object)
      );
    });
  });

  // ─── Template ─────────────────────────────────────────────────────────────

  describe('Template', () => {
    it('should render the form element', () => {
      expect(fixture.nativeElement.querySelector('form')).toBeTruthy();
    });

    it('should disable the submit button when the form is invalid', () => {
      const button: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
      expect(button.disabled).toBeTrue();
    });

    it('should enable the submit button when the form is valid', () => {
      component.contactForm.setValue({
        name: 'Mueller',
        firstName: 'Anna',
        email: 'anna@example.com',
        subject: 'Testbetreff',
        message: 'Dies ist eine ausreichend lange Nachricht',
        privacyAccepted: true
      });
      fixture.detectChanges();

      const button: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
      expect(button.disabled).toBeFalse();
    });

    it('should render a link to the privacy page', () => {
      const link = fixture.nativeElement.querySelector('a[routerLink="/privacy"]');
      expect(link).toBeTruthy();
      expect(link.textContent.trim()).toContain('Datenschutzbestimmungen');
    });

    it('should render all form fields', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('#sure-name')).toBeTruthy();
      expect(compiled.querySelector('#first-name')).toBeTruthy();
      expect(compiled.querySelector('#email')).toBeTruthy();
      expect(compiled.querySelector('#subject')).toBeTruthy();
      expect(compiled.querySelector('#message')).toBeTruthy();
      expect(compiled.querySelector('#privacyAccepted')).toBeTruthy();
    });

    it('should show a name required error when name is dirty and empty', () => {
      component.name.setValue('');
      component.name.markAsDirty();
      fixture.detectChanges();

      const errorEl = fixture.nativeElement.querySelector('.form-error');
      expect(errorEl.textContent).toContain('Bitte gib deinen Namen an');
    });

    it('should show a name minlength error when name is too short', () => {
      component.name.setValue('AB');
      component.name.markAsDirty();
      fixture.detectChanges();

      const errorEl = fixture.nativeElement.querySelector('.form-error');
      expect(errorEl.textContent).toContain('mindestens 3 Zeichen');
    });

    it('should show a privacy error when all other fields are valid but privacy not accepted', () => {
      component.name.setValue('Mueller');
      component.firstName.setValue('Anna');
      component.email.setValue('anna@example.com');
      component.subject.setValue('Testbetreff');
      component.message.setValue('Dies ist eine ausreichend lange Nachricht');
      component.contactForm.markAsDirty();
      fixture.detectChanges();

      const errorEl = fixture.nativeElement.querySelector('.form-error');
      expect(errorEl.textContent).toContain('Datenschutzbestimmungen');
    });
  });
});
