import { TestBed } from '@angular/core/testing';

import { Parallax } from './parallax';

describe('Parallax', () => {
  let service: Parallax;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Parallax);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // ─── offset signal ────────────────────────────────────────────────────────

  it('should initialize offset at 0', () => {
    expect(service.offset()).toBe(0);
  });

  // ─── registerAppRoot ──────────────────────────────────────────────────────

  it('should register the app root element and add a scroll listener', () => {
    const el = document.createElement('div');
    spyOn(el, 'addEventListener');

    service.registerAppRoot(el);

    expect(el.addEventListener).toHaveBeenCalledWith('scroll', jasmine.any(Function), { passive: true });
  });

  // ─── scroll behavior ──────────────────────────────────────────────────────

  it('should update offset to half of scrollTop on scroll', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    service.registerAppRoot(el);

    Object.defineProperty(el, 'scrollTop', { value: 200, configurable: true });
    el.dispatchEvent(new Event('scroll'));

    expect(service.offset()).toBe(100);
    document.body.removeChild(el);
  });

  it('should set offset to 0 when scrollTop is 0', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    service.registerAppRoot(el);

    Object.defineProperty(el, 'scrollTop', { value: 0, configurable: true });
    el.dispatchEvent(new Event('scroll'));

    expect(service.offset()).toBe(0);
    document.body.removeChild(el);
  });

  it('should keep offset at 0 when no app root is registered', () => {
    // offset should remain 0 without any registerAppRoot call
    expect(service.offset()).toBe(0);
  });

  it('should set offset to 0 when onScroll fires but appRoot is null', () => {
    // Covers the ternary else-branch: this.appRoot ? ... : 0
    (service as any).onScroll();
    expect(service.offset()).toBe(0);
  });
});
