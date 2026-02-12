import { Component, inject } from '@angular/core';
import { Parallax } from '../../../../shared/services/parallax';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  parallax = inject(Parallax);

}
