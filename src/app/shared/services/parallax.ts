import { Injectable, NgZone, inject, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Parallax {
  offset = signal(0);
  private appRoot: HTMLElement | null = null;
  private zone = inject(NgZone);

  constructor() {
  }

  registerAppRoot(element: HTMLElement) {
    this.appRoot = element;
    this.zone.runOutsideAngular(() => {
      element.addEventListener('scroll', this.onScroll, { passive: true });
    });
  }

  private onScroll = () => {
    const offsetValue = this.appRoot ? this.appRoot.scrollTop * 0.5 : 0;
    this.zone.run(() => {
      this.offset.set(offsetValue);
      console.log('Scroll offset:', offsetValue);
      console.log('Current offset signal value:', this.offset());
    });
  };


}