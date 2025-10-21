import { Injectable, NgZone, inject, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Parallax {
  offset = signal(0);

  private zone = inject(NgZone);

  constructor() {
    this.zone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.onScroll, { passive: true });
    });
  }

  private onScroll = () => {
    const offsetValue = window.pageYOffset * 0.5;
    this.zone.run(() => {
      this.offset.set(offsetValue);
    });
  };

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  }
}