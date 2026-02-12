import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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

  constructor() { }

  ngAfterViewInit() {
    this.parallax.registerAppRoot(this.appRoot.nativeElement);
  }
}
