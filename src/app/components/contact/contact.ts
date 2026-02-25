import { Component } from '@angular/core';
import { ContactHero } from "./components/contact-hero/contact-hero";
import { ContactOptions } from "./components/contact-options/contact-options";
import { ContactForm } from "./components/contact-form/contact-form";

@Component({
  selector: 'app-contact',
  imports: [ContactHero, ContactOptions, ContactForm],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {

}
