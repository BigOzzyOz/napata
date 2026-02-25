import { Component, ElementRef, Host, HostListener, inject, signal } from '@angular/core';
import { RouterLinkActive, RouterLink } from "@angular/router";
import { Parallax } from '../../services/parallax';

@Component({
  selector: 'app-header',
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  parallax = inject(Parallax);
  element = inject(ElementRef)
  burgerMenuClosed = signal(true);

  toggleBurgerMenu() {
    this.burgerMenuClosed.update(value => !value);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.element.nativeElement.contains(event.target)) {
      this.burgerMenuClosed.set(true);
    }
  }

}
