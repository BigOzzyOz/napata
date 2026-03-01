import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactOptions } from './contact-options';

describe('ContactOptions', () => {
  let component: ContactOptions;
  let fixture: ComponentFixture<ContactOptions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactOptions]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactOptions);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should default type to "email"', () => {
    expect(component.type).toBe('email');
  });

  describe('type: email', () => {
    beforeEach(() => {
      component.type = 'email';
      fixture.detectChanges();
    });

    it('should render the email contact option', () => {
      const el = fixture.nativeElement.querySelector('.contact-option.email');
      expect(el).toBeTruthy();
    });

    it('should display a mailto link', () => {
      const link = fixture.nativeElement.querySelector('a[href^="mailto:"]');
      expect(link).toBeTruthy();
      expect(link.textContent.trim()).toContain('info@napata.de');
    });

    it('should not render phone or region options', () => {
      expect(fixture.nativeElement.querySelector('.contact-option.phone')).toBeFalsy();
      expect(fixture.nativeElement.querySelector('.contact-option.region')).toBeFalsy();
    });

    it('should render an SVG icon', () => {
      const svg = fixture.nativeElement.querySelector('.contact-option__icon svg');
      expect(svg).toBeTruthy();
    });
  });

  describe('type: phone', () => {
    beforeEach(() => {
      component.type = 'phone';
      fixture.detectChanges();
    });

    it('should render the phone contact option', () => {
      const el = fixture.nativeElement.querySelector('.contact-option.phone');
      expect(el).toBeTruthy();
    });

    it('should display a tel link', () => {
      const link = fixture.nativeElement.querySelector('a[href^="tel:"]');
      expect(link).toBeTruthy();
      expect(link.textContent.trim()).toContain('+49155/10812076');
    });

    it('should not render email or region options', () => {
      expect(fixture.nativeElement.querySelector('.contact-option.email')).toBeFalsy();
      expect(fixture.nativeElement.querySelector('.contact-option.region')).toBeFalsy();
    });

    it('should render an SVG icon', () => {
      const svg = fixture.nativeElement.querySelector('.contact-option__icon svg');
      expect(svg).toBeTruthy();
    });
  });

  describe('type: region', () => {
    beforeEach(() => {
      component.type = 'region';
      fixture.detectChanges();
    });

    it('should render the region contact option', () => {
      const el = fixture.nativeElement.querySelector('.contact-option.region');
      expect(el).toBeTruthy();
    });

    it('should display the region name', () => {
      const p = fixture.nativeElement.querySelector('.contact-option__details p');
      expect(p).toBeTruthy();
      expect(p.textContent.trim()).toBe('Rhein-Neckar Region');
    });

    it('should not render email or phone options', () => {
      expect(fixture.nativeElement.querySelector('.contact-option.email')).toBeFalsy();
      expect(fixture.nativeElement.querySelector('.contact-option.phone')).toBeFalsy();
    });

    it('should render an SVG icon', () => {
      const svg = fixture.nativeElement.querySelector('.contact-option__icon svg');
      expect(svg).toBeTruthy();
    });
  });

  it('should render a glassmorphism container', () => {
    component.type = 'email';
    fixture.detectChanges();
    const container = fixture.nativeElement.querySelector('.contact-option__glassmorphism');
    expect(container).toBeTruthy();
  });
});
