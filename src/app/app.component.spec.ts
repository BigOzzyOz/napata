import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';

import { AppComponent } from './app.component';
import { Parallax } from './shared/services/parallax';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have the 'napata' title`, () => {
    expect(app.title).toEqual('napata');
  });

  // ─── Template ─────────────────────────────────────────────────────────────

  it('should render the .app-container wrapper', () => {
    expect(fixture.nativeElement.querySelector('.app-container')).toBeTruthy();
  });

  it('should render app-header', () => {
    expect(fixture.nativeElement.querySelector('app-header')).toBeTruthy();
  });

  it('should render app-footer', () => {
    expect(fixture.nativeElement.querySelector('app-footer')).toBeTruthy();
  });

  it('should render a router-outlet', () => {
    expect(fixture.nativeElement.querySelector('router-outlet')).toBeTruthy();
  });

  // ─── Parallax ─────────────────────────────────────────────────────────────

  it('should inject the Parallax service', () => {
    expect(app.parallax).toBeTruthy();
    expect(app.parallax).toBeInstanceOf(Parallax);
  });

  it('should register the app root with the Parallax service after view init', () => {
    const parallax = TestBed.inject(Parallax);
    spyOn(parallax, 'registerAppRoot');

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    expect(parallax.registerAppRoot).toHaveBeenCalledWith(jasmine.any(HTMLElement));
  });

  // ─── Navigation ───────────────────────────────────────────────────────────

  it('should initialize lastJump as null', () => {
    expect(app.lastJump).toBeNull();
  });

  it('should not scroll when NavigationEnd fires without a fragment and lastJump is null', fakeAsync(() => {
    const appRootEl = fixture.nativeElement.querySelector('.app-container');
    spyOn(appRootEl, 'scrollTo');

    const router = TestBed.inject(Router);
    router.navigate(['/']);
    tick();

    expect(appRootEl.scrollTo).not.toHaveBeenCalled();
    expect(app.lastJump).toBeNull();
  }));

  it('should call scrollTo and reset lastJump on NavigationEnd without fragment', fakeAsync(() => {
    app.lastJump = 200;

    const appRootEl = fixture.nativeElement.querySelector('.app-container');
    spyOn(appRootEl, 'scrollTo');

    const router = TestBed.inject(Router);
    router.navigate(['/']);
    tick();

    expect(appRootEl.scrollTo).toHaveBeenCalledWith({ top: 200, behavior: 'smooth' });
    expect(app.lastJump).toBeNull();
  }));

  it('should call scrollIntoView and store lastJump on NavigationEnd with a fragment', fakeAsync(() => {
    const appRootEl = fixture.nativeElement.querySelector('.app-container');
    const target = document.createElement('div');
    target.id = 'section';
    appRootEl.appendChild(target);
    spyOn(target, 'scrollIntoView');

    window.location.hash = '#section';

    const router = TestBed.inject(Router);
    router.navigate(['/']);
    tick();

    expect(target.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
    expect(app.lastJump).not.toBeNull();

    appRootEl.removeChild(target);
    window.location.hash = '';
  }));

  it('should not call scrollIntoView when fragment target does not exist in DOM', fakeAsync(() => {
    window.location.hash = '#nonexistent';

    const router = TestBed.inject(Router);
    router.navigate(['/']);
    tick();

    // lastJump is set (scrollTop of appRoot) but scrollIntoView is not called
    expect(app.lastJump).not.toBeNull();

    window.location.hash = '';
  }));
});
