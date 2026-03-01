import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactHero } from './contact-hero';

describe('ContactHero', () => {
  let component: ContactHero;
  let fixture: ComponentFixture<ContactHero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactHero]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactHero);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a .contact-hero section', () => {
    const section = fixture.nativeElement.querySelector('.contact-hero');
    expect(section).toBeTruthy();
  });

  it('should display "Kontakt" as heading', () => {
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1).toBeTruthy();
    expect(h1.textContent.trim()).toBe('Kontakt');
  });

  it('should display the tagline paragraph', () => {
    const p = fixture.nativeElement.querySelector('p');
    expect(p).toBeTruthy();
    expect(p.textContent).toContain('You can make a Difference Today');
    expect(p.textContent).toContain('believing things can change');
  });
});
