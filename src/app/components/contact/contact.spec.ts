import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { Contact } from './contact';

describe('Contact', () => {
  let component: Contact;
  let fixture: ComponentFixture<Contact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contact],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Contact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the main #contact element', () => {
    const main = fixture.nativeElement.querySelector('#contact');
    expect(main).toBeTruthy();
  });

  it('should render app-contact-hero', () => {
    expect(fixture.nativeElement.querySelector('app-contact-hero')).toBeTruthy();
  });

  it('should render app-contact-form', () => {
    expect(fixture.nativeElement.querySelector('app-contact-form')).toBeTruthy();
  });

  it('should render the .contact-info section', () => {
    expect(fixture.nativeElement.querySelector('.contact-info')).toBeTruthy();
  });

  it('should render exactly three app-contact-options', () => {
    const options = fixture.nativeElement.querySelectorAll('app-contact-options');
    expect(options.length).toBe(3);
  });
});
