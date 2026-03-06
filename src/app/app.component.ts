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
  lastUrl: string = '';

  constructor() { }

  ngAfterViewInit() {
    this.parallax.registerAppRoot(this.appRoot.nativeElement);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const fragment = window.location.hash?.substring(1);
        const currentUrl = event.urlAfterRedirects.split('#')[0];
        this.handleFragmentNavigation(fragment, currentUrl);
        this.lastUrl = currentUrl;
      }
    });
  }

  private handleFragmentNavigation(fragment: string, currentUrl: string) {
    if (fragment) {
      setTimeout(() => this.jumpToFragment(fragment), 0);
    } else if (this.lastJump !== null && this.lastUrl === currentUrl) {
      setTimeout(() => this.jumpToLastPosition(), 0);
    } else {
      setTimeout(() => this.scrollToTop(), 0);
    }
  }

  private jumpToFragment(fragment: string) {
    this.lastJump = this.appRoot.nativeElement.scrollTop;
    const target = this.appRoot.nativeElement.querySelector('#' + fragment);
    if (target) this.scrollIntoView(target as HTMLElement);
    else setTimeout(() => this.retryJumpToFragment(fragment), 100);
  }

  private retryJumpToFragment(fragment: string) {
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

  private scrollToTop() {
    this.appRoot.nativeElement.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
