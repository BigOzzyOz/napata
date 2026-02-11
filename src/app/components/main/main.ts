import { Component } from '@angular/core';
import { Hero } from "./components/hero/hero";
import { FourElements } from "./components/four-elements/four-elements";
import { Transformation } from "./components/transformation/transformation";
import { Quote } from "./components/quote/quote";
import { ToProgramm } from "./components/to-programm/to-programm";
import { Impressions } from "./components/impressions/impressions";
import { ToContact } from "./components/to-contact/to-contact";

@Component({
  selector: 'app-main',
  imports: [Hero, FourElements, Transformation, Quote, ToProgramm, Impressions, ToContact],
  templateUrl: './main.html',
  styleUrl: './main.scss'
})
export class Main {

}
