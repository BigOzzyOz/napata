import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Header } from "./shared/components/header/header";
import { Footer } from './shared/components/footer/footer';
import { Parallax } from './shared/services/parallax';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'napata';

  @ViewChild('appRoot', { static: true }) appRoot!: ElementRef;

  parallax = inject(Parallax);
  private router = inject(Router);

  lastJump: number | null = null;

  constructor() { }

  ngAfterViewInit() {
    this.parallax.registerAppRoot(this.appRoot.nativeElement);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const fragment = window.location.hash?.substring(1);
        if (fragment) this.jumpToFragment(fragment)
        else if (this.lastJump !== null) this.jumpToLastPosition();
      }
    });
  }

  private jumpToFragment(fragment: string) {
    this.lastJump = this.appRoot.nativeElement.scrollTop;
    const target = this.appRoot.nativeElement.querySelector('#' + fragment);
    if (target) this.scrollIntoView(target as HTMLElement);
  }

  private scrollIntoView(target: HTMLElement) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  private jumpToLastPosition() {
    this.appRoot.nativeElement.scrollTo({ top: this.lastJump, behavior: 'smooth' });
    this.lastJump = null;
  }
}
