import { Component, inject, signal } from '@angular/core';
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

  burgerMenuClosed = signal(true);

  toggleBurgerMenu() {
    this.burgerMenuClosed.update(value => !value);
  }

}
