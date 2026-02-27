import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-contact-options',
  imports: [],
  templateUrl: './contact-options.html',
  styleUrl: './contact-options.scss',
})
export class ContactOptions {
  @Input() type: "email" | "phone" | "region" = "email";
}
