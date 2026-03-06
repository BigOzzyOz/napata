import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';

import { AppComponent } from './app.component';
import { Parallax } from './shared/services/parallax';
import { routes } from './app.routes';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter(routes)]
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

  it('should initialize lastUrl as empty string', () => {
    expect(app.lastUrl).toBe('');
  });

  it('should scroll to top when navigating to a new page without fragment', fakeAsync(() => {
    const appRootEl = fixture.nativeElement.querySelector('.app-container');
    spyOn(appRootEl, 'scrollTo');

    const router = TestBed.inject(Router);
    router.navigate(['/']);
    tick(10); // setTimeout mit 0

    expect(appRootEl.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  }));

  it('should scroll to last position when navigating back on same page', fakeAsync(() => {
    app.lastJump = 200;
    app.lastUrl = '/';

    const appRootEl = fixture.nativeElement.querySelector('.app-container');
    Object.defineProperty(appRootEl, 'scrollTop', { value: 200, writable: true });
    spyOn(appRootEl, 'scrollTo');

    // Test the method directly instead of routing
    app['handleFragmentNavigation']('', '/');
    tick(10);

    expect(appRootEl.scrollTo).toHaveBeenCalledWith({ top: 200, behavior: 'smooth' });
    expect(app.lastJump).toBeNull(); // Reset after use
  }));

  it('should scroll to top when navigating to different page even with lastJump set', fakeAsync(() => {
    app.lastJump = 200;
    app.lastUrl = '/';

    const appRootEl = fixture.nativeElement.querySelector('.app-container');
    spyOn(appRootEl, 'scrollTo');

    // Test the method directly
    app['handleFragmentNavigation']('', '/about-us');
    tick(10);

    expect(appRootEl.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
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
    tick(10);

    expect(target.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
    expect(app.lastJump).not.toBeNull();

    appRootEl.removeChild(target);
    window.location.hash = '';
  }));

  it('should retry scrollIntoView when fragment target does not exist initially', fakeAsync(() => {
    const appRootEl = fixture.nativeElement.querySelector('.app-container');
    window.location.hash = '#delayed-section';

    const router = TestBed.inject(Router);
    router.navigate(['/']);
    tick(10); // Initial attempt

    // Target doesn't exist yet
    expect(app.lastJump).not.toBeNull();

    // Add target after initial attempt
    const target = document.createElement('div');
    target.id = 'delayed-section';
    appRootEl.appendChild(target);
    spyOn(target, 'scrollIntoView');

    tick(100); // Retry delay

    expect(target.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });

    appRootEl.removeChild(target);
    window.location.hash = '';
  }));

  it('should update lastUrl after navigation', fakeAsync(() => {
    const router = TestBed.inject(Router);

    expect(app.lastUrl).toBe('');

    // Use an existing route
    router.navigate(['/about-us']);
    tick(10);

    expect(app.lastUrl).toBe('/about-us');
  }));

  it('should handle fragment navigation correctly via handleFragmentNavigation', fakeAsync(() => {
    const appRootEl = fixture.nativeElement.querySelector('.app-container');
    const target = document.createElement('div');
    target.id = 'test-fragment';
    appRootEl.appendChild(target);

    spyOn<any>(app, 'jumpToFragment').and.callThrough();
    spyOn(target, 'scrollIntoView');

    app['handleFragmentNavigation']('test-fragment', '/page');
    tick(10);

    expect(app['jumpToFragment']).toHaveBeenCalledWith('test-fragment');
    expect(target.scrollIntoView).toHaveBeenCalled();

    appRootEl.removeChild(target);
  }));

  it('should call scrollToTop when no fragment and different URL', fakeAsync(() => {
    app.lastUrl = '/old-url';
    const appRootEl = fixture.nativeElement.querySelector('.app-container');
    spyOn(appRootEl, 'scrollTo');

    app['handleFragmentNavigation']('', '/new-url');
    tick(10);

    expect(appRootEl.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  }));

  it('should call jumpToLastPosition when no fragment and same URL with lastJump', fakeAsync(() => {
    app.lastUrl = '/same-url';
    app.lastJump = 300;
    const appRootEl = fixture.nativeElement.querySelector('.app-container');
    spyOn(appRootEl, 'scrollTo');

    app['handleFragmentNavigation']('', '/same-url');
    tick(10);

    expect(appRootEl.scrollTo).toHaveBeenCalledWith({ top: 300, behavior: 'smooth' });
    expect(app.lastJump).toBeNull();
  }));
});
