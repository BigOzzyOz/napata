import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Header } from './header';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ─── Burger menu state ────────────────────────────────────────────────────

  it('should start with burger menu closed', () => {
    expect(component.burgerMenuClosed()).toBeTrue();
  });

  it('should open the burger menu on toggleBurgerMenu()', () => {
    component.toggleBurgerMenu();
    expect(component.burgerMenuClosed()).toBeFalse();
  });

  it('should close the burger menu again on second toggleBurgerMenu()', () => {
    component.toggleBurgerMenu();
    component.toggleBurgerMenu();
    expect(component.burgerMenuClosed()).toBeTrue();
  });

  // ─── onDocumentClick ──────────────────────────────────────────────────────

  it('should close burger menu when clicking outside the header', () => {
    component.toggleBurgerMenu();
    expect(component.burgerMenuClosed()).toBeFalse();

    const outsideEl = document.createElement('div');
    document.body.appendChild(outsideEl);
    outsideEl.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    document.body.removeChild(outsideEl);

    expect(component.burgerMenuClosed()).toBeTrue();
  });

  it('should not close burger menu when clicking inside the header', () => {
    component.toggleBurgerMenu();
    expect(component.burgerMenuClosed()).toBeFalse();

    const headerEl: HTMLElement = fixture.nativeElement.querySelector('header');
    headerEl.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(component.burgerMenuClosed()).toBeFalse();
  });

  // ─── Template ─────────────────────────────────────────────────────────────

  it('should render the header element', () => {
    expect(fixture.nativeElement.querySelector('header')).toBeTruthy();
  });

  it('should render the logo image', () => {
    const logo = fixture.nativeElement.querySelector('img.header-logo');
    expect(logo).toBeTruthy();
    expect(logo.getAttribute('alt')).toBe('Logo Napata');
  });

  it('should render the navigation', () => {
    expect(fixture.nativeElement.querySelector('nav')).toBeTruthy();
  });

  it('should render four navigation links', () => {
    const links = fixture.nativeElement.querySelectorAll('nav ul li a');
    expect(links.length).toBe(4);
  });

  it('should have a Home link pointing to "/"', () => {
    const link = fixture.nativeElement.querySelector('a[routerLink="/"]');
    expect(link).toBeTruthy();
    expect(link.textContent.trim()).toBe('Home');
  });

  it('should have an "Über uns" link', () => {
    const link = fixture.nativeElement.querySelector('a[routerLink="/about-us"]');
    expect(link).toBeTruthy();
    expect(link.textContent.trim()).toBe('Über uns');
  });

  it('should have a "Programm" link', () => {
    const link = fixture.nativeElement.querySelector('a[routerLink="/program"]');
    expect(link).toBeTruthy();
    expect(link.textContent.trim()).toBe('Programm');
  });

  it('should have a "Kontakt" link', () => {
    const link = fixture.nativeElement.querySelector('a[routerLink="/contact"]');
    expect(link).toBeTruthy();
    expect(link.textContent.trim()).toBe('Kontakt');
  });

  it('should show burger button with aria-label "Menü öffnen" when closed', () => {
    const btn = fixture.nativeElement.querySelector('button.nav-burger-container');
    expect(btn.getAttribute('aria-label')).toBe('Menü öffnen');
  });

  it('should update aria-label to "Menü schließen" when burger is open', () => {
    component.toggleBurgerMenu();
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('button.nav-burger-container');
    expect(btn.getAttribute('aria-label')).toBe('Menü schließen');
  });

  it('should add nav-links__open class when burger menu is open', () => {
    component.toggleBurgerMenu();
    fixture.detectChanges();
    const ul = fixture.nativeElement.querySelector('ul.nav-links');
    expect(ul.classList.contains('nav-links__open')).toBeTrue();
  });

  it('should close burger menu when a nav link is clicked', () => {
    component.toggleBurgerMenu();
    fixture.detectChanges();
    expect(component.burgerMenuClosed()).toBeFalse();

    const homeLink = fixture.nativeElement.querySelector('a[routerLink="/"]');
    homeLink.click();

    expect(component.burgerMenuClosed()).toBeTrue();
  });
});
